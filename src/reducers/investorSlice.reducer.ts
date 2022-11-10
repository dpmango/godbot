import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

export const getInvestorData = createAsyncThunk(
  "investor/investorData",
  async () => {
    // const data = await fetch(`${process.env.REACT_APP_API_URL}get_investing/`);
    const data = await fetch(`./invest.json`);
    const resp = await data.json();
    return resp;
  }
);

export interface Idata {
  currency: string;
  currency_icon: string;
  graph_path: string;
  datetime: string;
}

export interface IInvestorObj {
  message?: string;
  data?: Idata[];
}

export interface IInvestorData {
  loading: string;
  graphs: IInvestorObj;
}

const initialState: IInvestorData = {
  loading: "pending",
  graphs: {},
};

export const investorState = createSlice({
  name: "investor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getInvestorData.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getInvestorData.fulfilled, (state, action) => {
      state.loading = "fulfilled";
      state.graphs = action.payload;
    });
  },
});

export const {} = investorState.actions;

export default investorState.reducer;
