import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '@core';
import { buildParams } from '@utils';
import { IGraphTickDto, ICoinDto } from '@/core/interface/Forecast';

export const getCoins = createAsyncThunk('chart/coinData', async () => {
  const { data } = await api('get_currencies/', {});
  return data;
});

interface IGraphRequest {
  coin: string;
  time: string;
  page?: number;
  per?: number;
}

export const getChart = createAsyncThunk(
  'chart/chartData',
  async ({ coin, time, page = 1, per }: IGraphRequest) => {
    let paginationParams = buildParams({ page: page, paginated_by: per });

    // prevent double requests
    const { data } = await api(`get_graph/${coin}/${time}/`, {
      params: paginationParams,
    });

    return {
      data,
      meta: paginationParams,
    };
  }
);

interface IChartData {
  loading: string;
  currentCoin: string;
  currentTime: string;
  coins: {
    [key: string]: ICoinDto;
  } | null;
  data: IGraphTickDto[];
  dataNav: {
    requested: number[];
  };
}

const initialState: IChartData = {
  loading: 'pending',
  currentCoin: '',
  currentTime: '',
  coins: null,
  data: [],
  dataNav: {
    requested: [],
  },
};

export const forecastState = createSlice({
  name: 'forecast',
  initialState,
  reducers: {
    setStateCoin(state, action: PayloadAction<string>) {
      state.currentCoin = action.payload;
      state.dataNav.requested = [];
    },
    setStateTime(state, action: PayloadAction<string>) {
      state.currentTime = action.payload;
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
        const { data, meta } = action.payload;

        state.data = [...data, ...state.data];

        state.dataNav = {
          requested: [...state.dataNav.requested, +meta.page],
        };
      }
    });
  },
});

export const { setStateCoin, setStateTime } = forecastState.actions;

export default forecastState.reducer;
