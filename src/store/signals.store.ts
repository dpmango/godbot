import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '@core';
import { ISignal, ISignalMetaDto } from '@interface/Signal';
import { buildParams } from '@utils';
import { RootState } from '@core';

interface ISignalsRequest {
  page?: number;
  per?: number;
}

export const getSignals = createAsyncThunk(
  'recomendation/recomendationData',
  async ({ page, per }: ISignalsRequest, { getState }) => {
    const {
      signalState: { filter, metadata: storeMetadata },
    } = getState() as RootState;

    let paginationParams = buildParams({
      status: filter,
      page: page || storeMetadata?.current_page,
      paginated_by: per,
    });

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
  filter: string;
  data: ISignal[] | null;
  metadata: ISignalMetaDto | null;
}

const initialState: ISignalState = {
  loading: null,
  filter: '',
  data: null,
  metadata: null,
};

export const signalState = createSlice({
  name: 'signals',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<string>) {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSignals.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSignals.fulfilled, (state, action) => {
      state.loading = false;

      if (action.payload) {
        state.data = action.payload.data || [];
        state.metadata = action.payload.metadata || null;
      }
    });
  },
});

export const { setFilter } = signalState.actions;

export default signalState.reducer;
