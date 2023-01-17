import { useEffect, useState } from "react";
import { userEvents } from "../../utils/eventListener.js";
import Logout from "./Logout";
import SignIn from "./SignIn";
// import chart from "../../assets/chart.png";
import "../../styles/header.css";

const Header = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [userBalance, setUserBalance] = useState(null);
  const [userCurrency, setUserCurrency] = useState(null);
  const [userName, setUserName] = useState(null);

  const EAuthorizeHandler = (data = null) => {
    console.log(data);
    if (!data) {
      setIsAuthorized(false);
      return;
    }
    setIsAuthorized(true);
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
        {!isAuthorized && <SignIn />}
        {isAuthorized && (
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
