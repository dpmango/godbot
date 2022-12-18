import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '@core';
import { ISignal } from '@interface/Signal';
import dayjs from 'dayjs';

export const getSignals = createAsyncThunk('recomendation/recomendationData', async () => {
  const { data } = await api('get_signals/', {});

  return data;
});

interface ISignalState {
  loading: boolean | null;
  data: ISignal[] | null;
}

const initialState: ISignalState = {
  loading: null,
  data: null,
};

export const signalState = createSlice({
  name: 'signals',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSignals.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSignals.fulfilled, (state, action) => {
      state.loading = false;

      state.data = action.payload.sort(
        (a: ISignal, b: ISignal) => dayjs(b.date).unix() - dayjs(a.date).unix()
      );
    });
  },
});

export const {} = signalState.actions;

export default signalState.reducer;
