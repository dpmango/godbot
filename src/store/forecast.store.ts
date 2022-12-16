import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '@core';
import { buildParams, PerformanceLog, timeToTz } from '@utils';
import { IGraphTickDto, ICoinDto } from '@/core/interface/Forecast';
import { RootState } from '@core';

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
    let paginationParams = buildParams({ page: page, paginated_by: per });
    const {
      forecastState: { currentCoin, currentTime },
    } = getState() as RootState;

    // prevent double requests
    const { data, metadata } = await api(`get_graph/${currentCoin}/${currentTime}/`, {
      params: paginationParams,
    });

    return {
      data,
      metadata,
      meta: paginationParams,
    };
  }
);

interface IForecastState {
  loading: string;
  currentCoin: string;
  currentTime: string;
  coins: {
    [key: string]: ICoinDto;
  } | null;
  data: IGraphTickDto[];
  dataNav: {
    max: number;
    requested: number[];
  };
}

const initialState: IForecastState = {
  loading: 'pending',
  currentCoin: '',
  currentTime: '',
  coins: null,
  data: [],
  dataNav: {
    max: 100,
    requested: [],
  },
};

export const forecastState = createSlice({
  name: 'forecast',
  initialState,
  reducers: {
    setStateCoin(state, action: PayloadAction<string>) {
      state.currentCoin = action.payload;
      state.currentTime = '';
      state.data = [];
      state.dataNav.requested = [];
    },
    setStateTime(state, action: PayloadAction<string>) {
      state.currentTime = action.payload;
      state.data = [];
      state.dataNav.requested = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCoins.fulfilled, (state, action) => {
      if (action.payload) {
        state.coins = { ...action.payload.currencies };
      }
    });
    builder.addCase(getChart.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getChart.fulfilled, (state, action) => {
      state.loading = 'fulfilled';
      if (action.payload.data) {
        const { data, meta, metadata } = action.payload;

        if (metadata.currency !== state.currentCoin || metadata.interval !== state.currentTime) {
          return;
        }

        const PERF_TIME = performance.now();
        const dataTzFix = data
          .map((x: IGraphTickDto) => ({
            ...x,
            timestamp: timeToTz(x.timestamp),
          }))
          .filter((x: IGraphTickDto) => x.timestamp);

        state.data = [
          ...new Map([...dataTzFix, ...state.data].map((x) => [x['timestamp'], x])).values(),
        ].sort((a, b) => a.timestamp - b.timestamp);
        PerformanceLog(PERF_TIME, 'coinDataMapped - timeToTz + sort');

        const requestedPages = [...state.dataNav.requested, +meta.page];
        state.dataNav = {
          max: metadata?.pages_count,
          requested: requestedPages.filter((x, idx) => requestedPages.indexOf(x) === idx),
        };
      }
    });
  },
});

export const { setStateCoin, setStateTime } = forecastState.actions;

export default forecastState.reducer;
