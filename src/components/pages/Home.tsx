import { ButtonMUI } from "../UI/atoms/Button";
import "./styles/home.css";
import type * as CSS from "csstype";
import { useNavigate } from "react-router-dom";
import { deepPurple } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { getAccountId } from "../../redux/account/selectors";
import { useEffect } from "react";
import { callSetAccountId } from "../../redux/account/actions";

const titleStyles: CSS.Properties = {
  textTransform: "capitalize",
  fontSize: "4em",
};

const highlightStyles: CSS.Properties = {
  color: deepPurple["700"],
  textShadow: "inset 0 0 15px aqua, 0 0 15px aqua",
};

export const Home = () => {
  const navigate = useNavigate();
  const accountId = useSelector(getAccountId);
  const dispatch = useDispatch();
  
  const renderButton = () => {
    if (accountId) {
      return (
        <ButtonMUI
          variant="contained"
          onClick={() => {
            navigate("/quizz");
          }}
        >
          Go to Quizz
        </ButtonMUI>
      );
    } else {
      return (
        <ButtonMUI
          variant="contained"
          onClick={() => {
            dispatch(callSetAccountId() as any)
          }}
        >
          Connect your wallet
        </ButtonMUI>
      );
    }
  };
  return (
    <div className="container-center">
      <div>
        <h1 style={titleStyles}>
          Welcome to BCRESPO <span style={highlightStyles}>NFT</span>
        </h1>
        <h2>
          Test your knowledge, if you pass the quizz you will can mint a NFT'S
        </h2>
        {renderButton()}
      </div>
    </div>
  );
};
