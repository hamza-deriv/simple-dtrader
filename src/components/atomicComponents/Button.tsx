import { userEvents } from "../../utils/eventListener";
import "../../styles/button.css";

type TButton = {
    title: string,
    className: string
}
const Button = (props:TButton) => {

const openTrade = () => {
    userEvents.emit("OpenSignInModal");
    };
    return (
        <>
        <button className={props.className} onClick={openTrade}>
        <span>{props.title}</span>
        </button>
        </>
    
    )
    
};

export default Button;