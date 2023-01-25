import "../../styles/signin.css";
import { userEvents } from "../../utils/eventListener";

type TSignInProps = {
  title:string
}

const SignInButton = (props:TSignInProps) => {
  const openCard = () => {
    userEvents.emit("OpenSignInModal");
  };

  return (
    <button className='button' onClick={openCard}>
      <span>{props.title}</span>
    </button>
  );
};

export default SignInButton;
