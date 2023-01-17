import "../../styles/signin.css";
import Avatar from 'react-avatar';
import { userEvents } from "../../utils/eventListener";

const SignInBtn = (props) => {
  const openCard = () => {
    userEvents.emit("EOpenClicked");
  };

  return (
    <button className='button' onClick={openCard}>
      <span>Sign in</span>
    </button>
  );
};

export default SignInBtn;
