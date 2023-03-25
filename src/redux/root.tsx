import { Action, AnyAction, configureStore } from "@reduxjs/toolkit";
import { ACCOUNT_ACTIONS } from "./account/actions";
import { accountSlice } from "./account/reducer";
import modalReducer from './modal/reducer'

export const store = configureStore({
    reducer: {
        account: accountSlice.reducer,
        modal: modalReducer
    }
})

export type GetRootState = () => RootState;

interface FixedDispatch<A extends Action = AnyAction> {
    <T extends A>(action: T | ReduxActionRet): Promise<T> | T;
  }

export type MyDispatch = FixedDispatch<Action<ACCOUNT_ACTIONS>>;

export type ReduxActionRet = (dispatch: MyDispatch, getState: GetRootState) => void;

type ReduxActionType = (cb: (dispatch: MyDispatch,  rootState: RootState, getState: () => RootState) => void | Promise<void>) => ReduxActionRet;

export const reduxAction: ReduxActionType = cb => async (dispatch, getState) => {
    const rootState = getState()
    await cb(dispatch, rootState, getState);
}

export type RootState = ReturnType<typeof store.getState>