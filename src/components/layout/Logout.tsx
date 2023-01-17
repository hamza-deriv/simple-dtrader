import "../../styles/signin.css";
import { api } from "../../utils/common.js";
import { userEvents } from "../../utils/eventListener.js";

const Logout = (props) => {
  const logOut = () => {
    api.send({
      logout: 1,
    });
    userEvents.emit("EAuthorize");
  };

  return (
    <button className='button' onClick={logOut}>
      <span>Log out</span>
    </button>
  );
};

export default Logout;
