import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import dayjs from 'dayjs';

import { api } from '@core';
import { IUserDto, IPartnerDto } from '@core/interface/User';
import { timeDiff } from '@utils';

export interface IUser {
  loading: boolean | null;
  tariffActive: boolean;
  isProUser: boolean;
  userData: IUserDto | null;
  partner: IPartnerDto | null;
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

export const getPartnership = createAsyncThunk('user/getPartnership', async () => {
  const { data } = await api('get_partnership/', {});

  return data;
});

const initialState: IUser = {
  loading: null,
  tariffActive: false,
  isProUser: false,
  userData: null,
  partner: null,
};

export const userState = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    resetUser(state, action: PayloadAction) {
      Cookies.remove('auth');

      state.loading = false;
      state.tariffActive = false;
      state.isProUser = false;
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrentUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action: PayloadAction<IUserDto>) => {
      state.loading = false;

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

    builder.addCase(getPartnership.fulfilled, (state, action: PayloadAction<IPartnerDto>) => {
      state.loading = false;

      if (action.payload) {
        state.partner = action.payload;
      }
    });
  },
});

export const { resetUser } = userState.actions;

export default userState.reducer;
