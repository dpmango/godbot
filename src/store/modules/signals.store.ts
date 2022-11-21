import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '@core';
import { ISignal } from '@interface/Signal';

export const getSignals = createAsyncThunk('recomendation/recomendationData', async () => {
  const { data } = await api('get_signals/', {});

  return data;
});

interface ISignalState {
  loading: string;
  data: ISignal[] | null;
}

const initialState: ISignalState = {
  loading: 'pending',
  data: null,
};

export const signalState = createSlice({
  name: 'recomendation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSignals.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getSignals.fulfilled, (state, action) => {
      state.loading = 'fulfilled';
      state.data = action.payload;
    });
  },
});

export const {} = signalState.actions;

export default signalState.reducer;
