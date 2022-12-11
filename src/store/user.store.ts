import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import dayjs from 'dayjs';

import { api } from '@core';
import { IUserDto } from '@core/interface/User';
import { timeDiff } from '@utils';

export interface IUserState {
  name: string;
  tariff: string;
  subscription_date: Date;
  allowed_functions: string[];
  tutorial_complete: boolean;
}

export interface IUserLogin {
  login: string;
  password: string;
}

export interface IUser {
  loading: string;
  tariffActive: boolean;
  isProUser: boolean;
  userData: IUserDto | null;
}

export const getCurrentUser = createAsyncThunk('user/getCurrentUser', async () => {
  const { data } = await api('auth/user/', {});

  return data;
});

export const setTutorialComplete = createAsyncThunk(
  'user/getCurrentUser',
  async (flag: boolean) => {
    const { data } = await api('tutorial/tutorial_complete/', {
      method: 'POST',
      body: { tutorial_complete: flag },
    });

    return data;
  }
);

const initialState: IUser = {
  loading: 'none',
  tariffActive: false,
  isProUser: false,
  userData: null,
};

export const userState = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    resetUser(state, action: PayloadAction) {
      Cookies.remove('auth');

      state.loading = 'none';
      state.tariffActive = false;
      state.isProUser = false;
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrentUser.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action: PayloadAction<IUserDto>) => {
      state.loading = 'fulfilled';

      if (action.payload) {
        state.userData = {
          // @ts-ignore
          allowed_functions: [],
          ...action.payload,
        };

        if (action.payload?.expire_date) {
          const date = dayjs(action.payload?.expire_date).unix();

          state.tariffActive = timeDiff(date * 1000) > 0;
        }

        state.isProUser = action.payload?.tariff === 'PRO Trader';
      }
    });
    builder.addCase(getCurrentUser.rejected, (state) => {
      state.loading = 'rejected';
    });
  },
});

export const { resetUser } = userState.actions;

export default userState.reducer;
