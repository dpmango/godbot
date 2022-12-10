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
  async ({ coin, time, page, per }: IGraphRequest) => {
    let paginationParams = buildParams({ page: page, paginated_by: per });

    const { data } = await api(`get_graph/${coin}/${time}/`, {
      params: paginationParams,
    });
    return data;
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
}

const initialState: IChartData = {
  loading: 'pending',
  currentCoin: '',
  currentTime: '',
  coins: null,
  data: [],
};

export const forecastState = createSlice({
  name: 'forecast',
  initialState,
  reducers: {
    setStateCoin(state, action: PayloadAction<string>) {
      state.currentCoin = action.payload;
    },
    setStateTime(state, action: PayloadAction<string>) {
      state.currentTime = action.payload;
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
      state.data = [...action.payload];
    });
  },
});

export const { setStateCoin, setStateTime } = forecastState.actions;

export default forecastState.reducer;
