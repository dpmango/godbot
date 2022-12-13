import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface iUiStore {
  teletypeReady: boolean;
}

const initialState: iUiStore = {
  teletypeReady: false,
};

export const uiState = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTeletypeReady(state, action: PayloadAction<boolean>) {
      state.teletypeReady = action.payload;
    },
  },
});

export const { setTeletypeReady } = uiState.actions;

export default uiState.reducer;
