import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '@core';
import { ISignal, ISignalMetaDto } from '@interface/Signal';
import { buildParams } from '@utils';
import dayjs from 'dayjs';

interface ISignalsRequest {
  page?: number;
  per?: number;
  status?: string;
}

export const getSignals = createAsyncThunk(
  'recomendation/recomendationData',
  async ({ page = 1, per, status }: ISignalsRequest) => {
    let paginationParams = buildParams({ status: status, page: page, paginated_by: per });

    const { data, metadata } = await api('get_signals/', {
      params: paginationParams,
    });

    return {
      data,
      metadata,
    };
  }
);

interface ISignalState {
  loading: boolean | null;
  data: ISignal[] | null;
  metadata: ISignalMetaDto | null;
}

const initialState: ISignalState = {
  loading: null,
  data: null,
  metadata: null,
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

      if (action.payload) {
        state.data = action.payload.data
          ? action.payload.data.sort(
              (a: ISignal, b: ISignal) => dayjs(b.date).unix() - dayjs(a.date).unix()
            )
          : [];

        state.metadata = action.payload.metadata || null;
      }
    });
  },
});

export const {} = signalState.actions;

export default signalState.reducer;
