import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '@core';
import { IForecastTick } from '@/core/interface/Forecast';

export const getChart = createAsyncThunk('chart/chartData', async (url: string) => {
  const { data } = await api('get_graph/200', {});
  return data;
});

interface IChartData {
  loading: string;
  currentCoin: string;
  data: { [key: string]: IForecastTick[] };
}

const initialState: IChartData = {
  loading: 'pending',
  currentCoin: window.location.search.slice(6, 9) || 'BTC',
  data: {},
};

export const forecastState = createSlice({
  name: 'forecast',
  initialState,
  reducers: {
    setStateCoin(state, action: PayloadAction<string>) {
      state.currentCoin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getChart.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getChart.fulfilled, (state, action) => {
      state.loading = 'fulfilled';
      state.data = action.payload;
    });
  },
});

export const { setStateCoin } = forecastState.actions;

export default forecastState.reducer;
