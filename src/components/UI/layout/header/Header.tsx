
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link} from "react-router-dom";
import { callSetAccountId } from "../../../../redux/account/actions";
import { getAccountId } from "../../../../redux/account/selectors";
import "./header.css";

export const Header = () => {
  const dispatch = useDispatch();
  const account = useSelector(getAccountId);

  const handlerClickConnectWallet =  () => {
    dispatch(callSetAccountId() as any)
  }
  return (
    <div id="header">
      <div id="logo">
        <Link to="/">        
        <span>BCRESPO</span>
        </Link>
      </div>
      <nav id="nav">
        <ul>          
          <li>
            <NavLink to={"/quizz"}>Quizz</NavLink>
          </li>
          <li><button  id="connectWallet" onClick={ handlerClickConnectWallet} disabled={account ? true : false}>{account ? account : "Connect your wallet"}</button></li>
        </ul>
      </nav>
    </div>
  );
};
