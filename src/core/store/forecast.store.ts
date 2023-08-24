import type { RootState } from '@core/store';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UTCTimestamp } from 'lightweight-charts';

import {
  ICoinDto,
  IGraphHistoryDto,
  IGraphKeyedDto,
  IGraphTickDto,
} from '@/core/interface/Forecast';
//import { stat } from 'fs';

export const getCoins = createAsyncThunk('chart/coinData', async () => {
  const { data } = await api('get_currencies/', {});
  return data;
});

interface IGraphRequest {
  page?: number;
  per?: number;
}

export const getChart = createAsyncThunk(
  'chart/chartData',
  async ({ page = 1, per }: IGraphRequest, { getState }) => {
    const paginationParams = buildParams({ page, paginated_by: per });
    const {
      forecastState: { currentCoin, currentTime },
    } = getState() as RootState;

    // prevent double requests
    const res = await api(`get_graph/${currentCoin}/${currentTime}/`, {
      params: paginationParams,
    });
    const data = res.data.actual_data;
    const history = res.data.historical_data;

    return {
      data,
      history,
      metadata: res.metadata,
      meta: paginationParams,
    };
  }
);

interface ISimulator {
  enabled: boolean;
  data: IGraphTickDto[];
}

interface IForecastState {
  requestId: string;
  loading: boolean | null;
  currentCoin: string;
  currentTime: string;
  coins: {
    [key: string]: ICoinDto;
  } | null;
  data: IGraphTickDto[];
  dataHistory: IGraphKeyedDto;
  dataNav: {
    max: number;
    points: number;
    requested: number[];
  };
  prolongation: {
    blockFromTimestamp: number | null;
    required: number;
  };
  simulator: ISimulator;
}

const initialState: IForecastState = {
  requestId: '',
  loading: null,
  currentCoin: '',
  currentTime: '',
  coins: null,
  data: [],
  dataHistory: {},
  dataNav: {
    max: 100,
    points: 0,
    requested: [],
  },
  prolongation: {
    blockFromTimestamp: null,
    required: 0,
  },
  simulator: {
    enabled: false,
    data: [],
  },
};

export const forecastState = createSlice({
  name: 'forecast',
  initialState,
  reducers: {
    setStateDataForce(state, action) {
      state.data = action.payload;
    },
    flushDataState(state) {
      console.log('flush data state');
      state.data = [];
      state.dataNav = { max: 100, points: 0, requested: [] };
    },
    setStateCoin(state, action: PayloadAction<string>) {
      state.currentCoin = action.payload;
      state.currentTime = '';
      state.data = [];
      state.dataNav.requested = [];
      state.dataNav.points = 0;
      state.prolongation.blockFromTimestamp = null;
      state.prolongation.required = 0;
    },
    setStateTime(state, action: PayloadAction<string>) {
      state.requestId = '';
      state.currentTime = action.payload;
      state.data = [];
      state.dataNav.requested = [];
      state.dataNav.points = 0;
      state.prolongation.blockFromTimestamp = null;
      state.prolongation.required = 0;
    },
    setSimulator(state, action: PayloadAction<Partial<ISimulator>>) {
      state.simulator = { ...state.simulator, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCoins.fulfilled, (state, action) => {
      if (action.payload) {
        state.coins = { ...action.payload.currencies };
      }
    });
    builder.addCase(getChart.pending, (state, action) => {
      state.loading = true;
      state.requestId = action.meta.requestId;
    });
    builder.addCase(getChart.fulfilled, (state, action) => {
      state.loading = false;
      /*
       Проверка, что пока выполнялся реквест, пользователь не поменял график
       Чтобы данные с прошлого графика не пришли на другой график 
      */
      // const isSameRequest = action.meta.requestId === state.requestId;

      if (action.payload.data) {
        const { data, meta, history, metadata } = action.payload;

        if (metadata.currency !== state.currentCoin || metadata.interval !== state.currentTime) {
          return;
        }

        // Fix Time zone for all timestamp
        const PERF_TIME = performance.now();
        const dataTzFix = data
          .map((x: IGraphTickDto) => ({
            ...x,
            timestamp: timeToTz(x.timestamp),
          }))
          .filter((x: IGraphTickDto) => x.timestamp);

        // Sort all points by timestamp
        state.data = [
          ...new Map([...state.data, ...dataTzFix].map((x) => [x['timestamp'], x])).values(),
        ].sort((a, b) => a.timestamp - b.timestamp);
        PerformanceLog(PERF_TIME, 'coinDataMapped - timeToTz + sort');

        const requestedPages = [...state.dataNav.requested, +meta.page];
        state.dataNav = {
          max: metadata?.pages_count,
          points: state?.data?.length || 0,
          requested: requestedPages.filter((x, idx) => requestedPages.indexOf(x) === idx),
        };

        // Mock next 20 points for blocking user view with popup
        const isUserBlockedToView =
          state.prolongation.required === 0 && metadata.prolongation_required > 0;

        state.prolongation.required = metadata.prolongation_required;
        if (isUserBlockedToView) {
          const first = state.data[state.data.length - 1];
          const second = state.data[state.data.length - 2];

          const getNotNullValue = (point: IGraphTickDto) => {
            const {
              forecast_low,
              forecast_trend,
              forecast_high,
              real_close,
              real_high,
              real_low,
              real_open,
            } = point;

            return (
              forecast_low ||
              forecast_trend ||
              forecast_high ||
              real_close ||
              real_high ||
              real_low ||
              real_open ||
              0
            );
          };

          const randomPointsSize = 20; // metadata?.prolongation_required
          state.prolongation = {
            blockFromTimestamp: first.timestamp,
            required: randomPointsSize,
          };

          const timestampDiff = Math.abs(first.timestamp - second.timestamp) as UTCTimestamp;
          let currentTimestamp = first.timestamp as number;
          const lastValue = getNotNullValue(first);

          // Adding new mock points
          for (let i = 0; i < randomPointsSize; i++) {
            currentTimestamp += timestampDiff;

            // generate invisible line for blocked part of the chart
            state.data.push({
              timestamp: currentTimestamp as UTCTimestamp,
              invisible_line: lastValue,
            } as IGraphTickDto);
          }
          state.dataNav.points += randomPointsSize;
        }

        // Установка исторических данных прогноза
        if (Object.keys(history).length) {
          const histroyCovertedDto = {} as IGraphKeyedDto;

          Object.keys(history).forEach((id: string) => {
            const dataTzFix = history[id]
              .map((x: IGraphHistoryDto) => ({
                ...x,
                timestamp: timeToTz(x.timestamp),
              }))
              .filter((x: IGraphHistoryDto) => x.timestamp)
              .sort(
                (a: IGraphHistoryDto, b: IGraphHistoryDto) => a.timestamp - b.timestamp
              ) as IGraphHistoryDto[];

            histroyCovertedDto[id] = dataTzFix;
          });

          state.dataHistory = histroyCovertedDto;
        }
      }
    });
  },
});

export const { setStateDataForce, flushDataState, setStateCoin, setStateTime, setSimulator } =
  forecastState.actions;

export default forecastState.reducer;
