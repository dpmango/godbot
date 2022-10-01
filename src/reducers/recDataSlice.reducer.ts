import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getRecData = createAsyncThunk(
  "recomendation/recomendationData",
  async (url: string) => {
    const data = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ key: "31sda$sd#231wfdsS*31)9s" }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resp = await data.json();
    return resp;
  }
);

interface IRecObj {
  signal: string;
  name: string;
  shortname: string;
  order_benefit?: string
  icon: string;
  order_type: string;
  order_status: string;
  enter_cost: string[];
  exit_cost: string[];
  stop_los: string;
  risk: number;
}

interface IRecState {
  loading: string;
  data: IRecObj[];
}

const initialState: IRecState = {
  loading: "pending",
  data: [],
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
