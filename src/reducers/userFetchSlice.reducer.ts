import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IUserState {
  login: string;
  password: string;
  name: string;
  city: string;
  rank: string;
  email: string;
  subscription_date: string
  bank_value: string;
  id: string;
}

export interface IUserLogin {
  login: string;
  password: string;
}

interface IUser {
  loading: string;
  userData: IUserState | null;
}

export const getCurrentUser = createAsyncThunk(
  "user/getCurrentUser",
  async (body: IUserLogin) => {
    const data = await fetch("/user", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resp = await data.json();
    return resp;
  }
);

const initialState: IUser = {
  loading: "none",
  userData: null,
};

export const userState = createSlice({
  name: "counter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCurrentUser.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(
      getCurrentUser.fulfilled,
      (state, action: PayloadAction<IUserState>) => {
        state.loading = "fulfilled";
        state.userData = { ...action.payload };
      }
    );
    builder.addCase(getCurrentUser.rejected, (state) => {
      state.loading = "rejected";
    });
  },
});

export const {} = userState.actions;

export default userState.reducer;
