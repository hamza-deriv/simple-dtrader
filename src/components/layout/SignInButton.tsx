import "../../styles/signin.css";
import { userEvents } from "../../utils/eventListener";

const SignInButton = (props:any) => {
  const openCard = () => {
    userEvents.emit("OpenSignInModal");
  };

  return (
    <button className='button' onClick={openCard}>
      <span>Sign in</span>
    </button>
  );
};

export default SignInButton;
