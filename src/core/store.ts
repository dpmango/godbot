import { configureStore } from '@reduxjs/toolkit';
import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';

import forecastState from '@/core/store/forecast.store';
import investorState from '@/core/store/investor.store';
import signalState from '@/core/store/signals.store';
import uiState from '@/core/store/ui.store';
import userState from '@/core/store/user.store';

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
