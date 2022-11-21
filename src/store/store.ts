import { configureStore } from '@reduxjs/toolkit';
import userState from './modules/user.store';
import chartState from './modules/chart.store';
import signalState from './modules/signals.store';
import modalState from './modules/modal.store';
import investorState from './modules/investor.store';

export const store = configureStore({
  reducer: {
    userState,
    chartState,
    signalState,
    modalState,
    investorState,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
