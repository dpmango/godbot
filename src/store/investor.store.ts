import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '@core';
import { IInvesting } from '@core/interface/Investor';

export const getInvesting = createAsyncThunk('investor/investorData', async () => {
  const { data, message } = await api('get_investing/', {});

  return { data, message };
});

export interface IInvestorObj {
  message?: string;
  data?: IInvesting[];
}

export interface IInvestorData {
  loading: boolean | null;
  graphs: IInvestorObj;
}

const initialState: IInvestorData = {
  loading: null,
  graphs: {},
};

export const investorState = createSlice({
  name: 'investor',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getInvesting.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getInvesting.fulfilled, (state, action) => {
      state.loading = false;
      state.graphs = action.payload;
    });
  },
});

export const {} = investorState.actions;

export default investorState.reducer;
