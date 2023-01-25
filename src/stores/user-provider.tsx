import UserContext from "./user-context";
import { useReducer } from "react";

const defaultUserState = {
  userData: {},
  isAuthorized: false,
};


// Dispatching Actions
const userReducer = (state, action) => {
  if (action.type === "ADD") {
    return {
      userData: action.item,
      isAuthorized: state.isAuthorized,
    };
  }
  if (action.type === "ISAUTHORIZE") {
    return {
      userData: state.userData,
      isAuthorized: action.val,
    };
  }

  return defaultUserState;
};


// Setting the Provider Function
const UserProvider = (props:any) => {
  const [userState, dispatchUser] = useReducer(
    userReducer,
    defaultUserState
  );

  const addUserData = (data) => {
    dispatchUser({ type: "ADD", item: data });
  };
  const changeIsAuthorized = (bool) => {
    dispatchUser({ type: "ISAUTHORIZE", val: bool });
  };

  const userContext = {
    userData: userState.userData,
    isAuthorized: userState.isAuthorized,
    addUserData,
    changeIsAuthorized,
  };

  return (
    <UserContext.Provider value={userContext}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;