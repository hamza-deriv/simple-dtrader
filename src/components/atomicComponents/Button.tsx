import { userEvents } from "../../utils/eventListener";
import "../../styles/button.css";

type TButton = {
    title: string,
    // title2: string
}
const Button = (props:TButton) => {

const openCard = () => {
    userEvents.emit("OpenSignInModal");
    };
    return (
        <>
        <button className='button-atomic' onClick={openCard}>
        <span>{props.title}</span>
        </button>
        </>
    
    )
    
};

export default Button;