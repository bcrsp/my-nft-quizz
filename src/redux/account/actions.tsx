import { createAction } from "@reduxjs/toolkit";
import detectEthereumProvider from "@metamask/detect-provider";
import { useDispatch } from "react-redux";
import { reduxAction } from "../root";
//ACTION TYPES
export enum ACCOUNT_ACTIONS {
  SET_ACCOUNT_ID = "account/setAccountId",
}

export const setAccountIdAction = createAction<{ accountId: string }>(
  ACCOUNT_ACTIONS.SET_ACCOUNT_ID
);

export function setAccountId(accountId: string) {
  return setAccountIdAction({
    accountId,
  });
}

export const callSetAccountId = () => {
  return reduxAction(async (dispatch, rootState) => {
    
    detectEthereumProvider()
      .then((provider) => {
        if (!provider) {
          alert("GET Metamaskt!");
        } else {
          window.ethereum
            .request({ method: "eth_requestAccounts" })
            .then((accounts: any) => {
      
              if (accounts.length > 0) {
                dispatch(setAccountId(accounts[0]) as any);
              } else {
                alert("Please, authorize account found");
              }
            })
            .catch((error: any) =>
              console.log("error ethereum request", error)
            );
        }
      })
      .catch((error) => console.log("error", error));
  });
};
