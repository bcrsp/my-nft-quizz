import { createReducer, createSlice } from "@reduxjs/toolkit";
import { setAccountIdAction } from "./actions";

//Type definition
export interface AccountState {
  accountId: string;
}

//Initial state
const initialState = {
  accountId: "",
} as AccountState;

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccountId(state, action) {
      console.log("action setAccountID")
      state.accountId = action.payload.accountId;
    },
  },
});

export const { setAccountId } = accountSlice.actions;
export default accountSlice.reducer;
