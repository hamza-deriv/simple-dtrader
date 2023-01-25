import { useEffect, useState, useContext } from "react";
import { userEvents } from "../../utils/eventListener";
import Logout from "./Logout";
import SignInButton from "./SignInButton";
import UserContext from "../../stores/user-context";
import "../../styles/header.css";

const Header = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const userContext = useContext(UserContext)
  const [userBalance, setUserBalance] = useState(null);
  const [userCurrency, setUserCurrency] = useState(null);
  const [userName, setUserName] = useState("");

  const authorizationHandler = (data:any = null) => {
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
    userEvents.addListener("Authorize", authorizationHandler);
    return () => {
      userEvents.removeListener("Authorize", authorizationHandler);
    };
  }, []);


  return (
    <>
      <header className='header'>
        <h1>Simple Trader</h1>
        {
          !userContext.isAuthorized && 
            (
              <SignInButton title="Sign In"/>
            )
        }
        {userContext.isAuthorized && (
            <>
              <p>Welcome, {userName ? userName : 'John Doe'} !</p>
              <p>
                {userBalance} {userCurrency}
              </p>
              <Logout title="Log Out"/>
            </>
          )
        }
      </header>

      <div className="separator" />

    </>
  );
};

export default Header;
