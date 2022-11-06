import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IModals {
  currentModal: string | null;
}

const initialState: IModals = {
  currentModal: null,
};

export const modalsState = createSlice({
  name: "modals",
  initialState,
  reducers: {
    setModal(state, action: PayloadAction<string | null>) {
      state.currentModal = action.payload;
    },
  },
});

export const { setModal } = modalsState.actions;

export default modalsState.reducer;
