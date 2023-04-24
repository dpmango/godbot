import { configureStore } from '@reduxjs/toolkit';
import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';

import forecastState from '@/store/forecast.store';
import investorState from '@/store/investor.store';
import signalState from '@/store/signals.store';
import uiState from '@/store/ui.store';
import userState from '@/store/user.store';

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
