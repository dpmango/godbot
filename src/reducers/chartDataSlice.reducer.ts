import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useNavigate, useParams } from "react-router-dom";

export const getChartData = createAsyncThunk(
  "chart/chartData",
  async (url: string) => {
    const data = await fetch(`${process.env.REACT_APP_API_URL}get_graph/`);
    // const data = await fetch(`./graph.json`);
    const resp = await data.json();
    return resp;
  }
);

export interface IChartObj {
  title?: unknown;
  name?: string;
  data?: any;
}

interface IChartData {
  loading: string;
  currentCoin: string;
  data: IChartObj;
}

const initialState: IChartData = {
  loading: "pending",
  currentCoin: window.location.search.slice(6, 9) || "BTC",
  data: {},
};

export const chartState = createSlice({
  name: "chart",
  initialState,
  reducers: {
    setStateCoin(state, action: PayloadAction<string>) {
      state.currentCoin = action.payload;
    },
  },
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

export const { setStateCoin } = chartState.actions;

export default chartState.reducer;
