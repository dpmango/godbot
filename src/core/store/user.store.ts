import { INotificationDto, IPartnerDto, IUserDto } from '@interface/User';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import Cookies from 'js-cookie';

export interface IUser {
  loading: boolean | null;
  tariffActive: boolean;
  isProUser: boolean;
  userData: IUserDto | null;
  partner: IPartnerDto | null;
  notifications: INotificationDto[] | [];
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

export const getNotifications = createAsyncThunk('user/getNotifications', async () => {
  const { data } = await api('get_notifications/', {});

  return data;
});

const initialState: IUser = {
  loading: null,
  tariffActive: false,
  isProUser: false,
  userData: null,
  partner: null,
  notifications: [],
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

    builder.addCase(
      getNotifications.fulfilled,
      (state, action: PayloadAction<INotificationDto[]>) => {
        state.loading = false;

        if (action.payload) {
          state.notifications = action.payload;
        }
      }
    );
  },
});

export const { resetUser } = userState.actions;

export default userState.reducer;
