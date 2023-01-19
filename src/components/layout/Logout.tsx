import "../../styles/signin.css";
import { ws_connection } from "../../utils/common.js";
import { userEvents } from "../../utils/eventListener";

const Logout = (props:any) => {
  const logOut = () => {
    ws_connection.send({
      logout: 1,
    });
    userEvents.emit("Authorize");
  };

  return (
    <button className='button' onClick={logOut}>
      <span>Log out</span>
    </button>
  );
};

export default Logout;
