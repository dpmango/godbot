import { useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import type { TypedUseSelectorHook } from 'react-redux';

import userState from '@store/user.store';
import forecastState from '@store/forecast.store';
import signalState from '@store/signals.store';
import investorState from '@store/investor.store';
import uiState from '@store/ui.store';

export const store = configureStore({
  reducer: {
    userState,
    forecastState,
    signalState,
    investorState,
    uiState,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
