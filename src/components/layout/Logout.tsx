import "../../styles/signin.css";
import { ws_connection } from "../../utils/common.js";
import { userEvents } from "../../utils/eventListener";

type TLogoutProps = {
  title:string
}

const Logout = (props:TLogoutProps) => {
  const logOut = () => {
    ws_connection.send({
      logout: 1,
    });
    userEvents.emit("Authorize");
  };

  return (
    <button className='button' onClick={logOut}>
      <span>{props.title}</span>
    </button>
  );
};

export default Logout;
