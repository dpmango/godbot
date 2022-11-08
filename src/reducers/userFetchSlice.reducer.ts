import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { parse } from "date-fns";
import { timeDifference } from "../scripts/scripts";

export interface IUserState {
   message: string
   data: {
    name: string
    tariff: string
    subscription_date: string
    allowed_functions: string[]
   }
}

export interface IUserLogin {
  login: string;
  password: string;
}

interface IUser {
  loading: string;
  timeDiff: number 
  userData: IUserState | null;
}

export const getCurrentUser = createAsyncThunk(
  "user/getCurrentUser",
  async () => {
    const data = await fetch(`${process.env.REACT_APP_API_URL}auth/user/`);
    const resp = await data.json();
    return resp;
  }
);

// export const getCurrentUser = createAsyncThunk(
//   "user/getCurrentUser",
//   async () => {
//     const data = await fetch("/user");

//     const resp = await data.json();
//     return resp;
//   }
// );

const initialState: IUser = {
  loading: "none",
  timeDiff: 0,
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
        const userDate = action.payload?.data?.subscription_date.slice(0,10).split('-').join('.')
        
        const date = parse(userDate as string, "yyyy.MM.dd", new Date());
        console.log(date);
        state.timeDiff = timeDifference(date)
      }
    );
    builder.addCase(getCurrentUser.rejected, (state) => {
      state.loading = "rejected";
    });
  },
});

export const {} = userState.actions;

export default userState.reducer;
