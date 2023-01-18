import UserContext from "./user-context";
import { useReducer } from "react";

const defaultuserState = {
  userData: {},
  isAuthorized: false,
};

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

  return defaultuserState;
};

const UserProvider = (props) => {
  const [userState, dispathUserAction] = useReducer(
    userReducer,
    defaultuserState
  );

  const addUserDataHandler = (data) => {
    dispathUserAction({ type: "ADD", item: data });
  };
  const changeIsAuthorizedHandler = (bool) => {
    dispathUserAction({ type: "ISAUTHORIZE", val: bool });
  };

  const userContext = {
    userData: userState.userData,
    isAuthorized: userState.isAuthorized,
    addUserData: addUserDataHandler,
    changeIsAuthorized: changeIsAuthorizedHandler,
  };

  return (
    <UserContext.Provider value={userContext}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;