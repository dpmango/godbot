import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getChartData = createAsyncThunk(
  "chart/chartData",
  async (url: string) => {
    const data = await fetch(`/chart?${url}`, {
      method: "POST",
      body: JSON.stringify({key: 'BTC'}),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resp = await data.json();
    return resp;
  }
);

export interface IChartObj {
  title: unknown;
  name: string;
  data: number[];
}

interface IChartData {
  loading: string;
  data: IChartObj[];
}

const initialState: IChartData = {
  loading: "pending",
  data: [],
};

export const chartState = createSlice({
  name: "chart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getChartData.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getChartData.fulfilled, (state, action) => {
      state.loading = "fulfilled";
      state.data = action.payload;
    });
  },
});

export const {} = chartState.actions;

export default chartState.reducer;
