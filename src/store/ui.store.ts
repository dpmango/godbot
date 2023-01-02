import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface iUiStore {
  teletypeReady: boolean;
  videoModal: {
    opened: boolean;
    id: string;
    channel: 'youtube' | 'vimeo' | 'youku' | 'custom' | undefined;
  };
}

const initialState: iUiStore = {
  teletypeReady: false,
  videoModal: {
    opened: false,
    id: '',
    channel: 'youtube',
  },
};

export const uiState = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTeletypeReady(state, action: PayloadAction<boolean>) {
      state.teletypeReady = action.payload;
    },
    setVideoModal(state, action: PayloadAction<any>) {
      state.videoModal = { ...state.videoModal, ...action.payload };
    },
  },
});

export const { setTeletypeReady, setVideoModal } = uiState.actions;

export default uiState.reducer;
