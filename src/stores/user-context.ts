import React from "react";

const UserContext = React.createContext({
  userData: {},
  isAuthorized: false,
  addUserData: (data) => {},
  changeIsAuthorized: (bool) => {},
});

export default UserContext;