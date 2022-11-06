import { configureStore } from "@reduxjs/toolkit";
import userState from "./userFetchSlice.reducer";
import chartState from "./chartDataSlice.reducer";
import recState from "./recDataSlice.reducer";
import modalState from "./modalSlice.reducer";

export const store = configureStore({
  reducer: {
    userState,
    chartState,
    recState,
    modalState,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
