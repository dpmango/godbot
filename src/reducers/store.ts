import { configureStore } from "@reduxjs/toolkit";
import userState from "./userFetchSlice.reducer";
import chartState from "./chartDataSlice.reducer";
import recState from "./recDataSlice.reducer";
import modalState from "./modalSlice.reducer";
import investorState from "./investorSlice.reducer";

export const store = configureStore({
  reducer: {
    userState,
    chartState,
    recState,
    modalState,
    investorState
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
