import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getRecData = createAsyncThunk(
  "recomendation/recomendationData",
  async () => {
    const data = await fetch(`${process.env.REACT_APP_API_URL}get_signals/`);
    // const data = await fetch(`./signals.json`);
    const resp = await data.json();
    return resp;
  }
);

export interface IRecObj {
  date: string;
  currency: string;
  shortname: string;
  stop_loss?: string;
  icon: string;
  direction: string;
  status: string;
  entry_price_range: string[];
  get_exit_range: string[];
  trigger_stop: string;
  risk: number;
}

export interface IRecSignas {
  message?: string;
  data?: IRecObj[];
}

interface IRecState {
  loading: string;
  data: IRecSignas;
}

const initialState: IRecState = {
  loading: "pending",
  data: {},
};

export const recomendationState = createSlice({
  name: "recomendation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRecData.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getRecData.fulfilled, (state, action) => {
      state.loading = "fulfilled";
      state.data = action.payload;
    });
  },
});

export const {} = recomendationState.actions;

export default recomendationState.reducer;
