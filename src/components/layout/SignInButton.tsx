import "../../styles/signin.css";
import { userEvents } from "../../utils/eventListener";

const SignInButton = (props) => {
  const openCard = () => {
    userEvents.emit("EOpenClicked");
  };

  return (
    <button className='button' onClick={openCard}>
      <span>Sign in</span>
    </button>
  );
};

export default SignInButton;
