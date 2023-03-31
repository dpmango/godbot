import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '@core';
import { IInvesting } from '@core/interface/Investor';

export const getInvesting = createAsyncThunk('investor/investorData', async () => {
  const { data, message } = await api('get_investing/', {});

  const requestDataPromises = data.reduce(
    (accumulate: any, { invest_id, ...rest }: any) =>
      invest_id
        ? [
            ...accumulate,
            api(`get_invest_graph/${invest_id}`, {}).then((res) => ({
              ...res,
              invest_id,
              ...rest,
            })),
          ]
        : accumulate,
    []
  );

  const allData = await Promise.all(requestDataPromises);

  return { data: allData, message };
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
