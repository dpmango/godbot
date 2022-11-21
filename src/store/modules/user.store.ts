import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { parse } from 'date-fns';

import { api } from '@core';
import { timeDifference } from '@utils';

export interface IUserState {
  name: string;
  tariff: string;
  subscription_date: string;
  allowed_functions: string[];
}

export interface IUserLogin {
  login: string;
  password: string;
}

export interface IUser {
  loading: string;
  timeDiff: boolean;
  userData: IUserState | null;
}

export const getCurrentUser = createAsyncThunk('user/getCurrentUser', async () => {
  const { data } = await api('auth/user/', {});

  return data;
});

const initialState: IUser = {
  loading: 'none',
  timeDiff: false,
  userData: null,
};

export const userState = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCurrentUser.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action: PayloadAction<IUserState>) => {
      state.loading = 'fulfilled';
      state.userData = { ...action.payload };

      if (action.payload?.subscription_date) {
        const userDate = action.payload?.subscription_date.slice(0, 10).split('-').join('.');
        const date = parse(userDate as string, 'yyyy.MM.dd', new Date());

        state.timeDiff = timeDifference(date) < 0;
      }
    });
    builder.addCase(getCurrentUser.rejected, (state) => {
      state.loading = 'rejected';
    });
  },
});

export const {} = userState.actions;

export default userState.reducer;
