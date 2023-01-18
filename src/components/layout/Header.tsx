import { useEffect, useState, useContext } from "react";
import { userEvents } from "../../utils/eventListener";
import Logout from "./Logout";
import SignInButton from "./SignInButton";
// import chart from "../../assets/chart.png";
import "../../styles/header.css";
import UserContext from "../../store/user-context";

const Header = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const userContext = useContext(UserContext)
  const [userBalance, setUserBalance] = useState(null);
  const [userCurrency, setUserCurrency] = useState(null);
  const [userName, setUserName] = useState(null);

  const EAuthorizeHandler = (data:any = null) => {
    console.log(data);
    if (!data) {
      setIsAuthorized(false);
      userContext.changeIsAuthorized(false);
      return;
    }
    setIsAuthorized(true);
    userContext.addUserData(data);
    userContext.changeIsAuthorized(true);
    setUserName(data.authorize.fullname);
    setUserBalance(data.authorize.balance);
    setUserCurrency(data.authorize.currency);
  };

  useEffect(() => {
    userEvents.addListener("EAuthorize", EAuthorizeHandler);
    return () => {
      userEvents.removeListener("EAuthorize", EAuthorizeHandler);
    };
  }, []);

  return (
    <>
      <header className='header'>
        <h1>Simple Trader</h1>
        {!userContext.isAuthorized && <SignInBtn />}
        {userContext.isAuthorized && (
          <>
            <p>Hi, {userName} !</p>
            <p>
              {userBalance} {userCurrency}
            </p>
            <Logout />
          </>
        )}
      </header>
      <div className="separator">
      </div>
    </>
  );
};

export default Header;
