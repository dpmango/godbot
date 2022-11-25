import { configureStore } from '@reduxjs/toolkit';
import userState from './modules/user.store';
import forecastState from './modules/forecast.store';
import signalState from './modules/signals.store';
import modalState from './modules/modal.store';
import investorState from './modules/investor.store';

export const store = configureStore({
  reducer: {
    userState,
    forecastState,
    signalState,
    modalState,
    investorState,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
