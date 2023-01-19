// import { userEvents } from "../../utils/eventListener";
import "../../styles/button.css";
// import { useEffect, useState } from "react";
// import CTAModal from "./CTAModal";

type TButton = {
    title: string,
    className: string
}
const Button = (props:TButton) => {

//     const [showModal, setShowModal] = useState<boolean>(false);

    const buttonHandler = () => {
        alert(`Contract ${props.title}`)
    };

// const openHandler = () => {
//     userEvents.emit("OpenButtonCTA");
// };
// const closeHandler = () => {
//     userEvents.emit("OpenButtonCTA");
// };

// useEffect(()=>{
//     userEvents.addListener("OpenButtonCTA", openHandler);
//     userEvents.addListener("CloseButtonCTA", closeHandler);

//     return ()=>{
//     userEvents.removeListener("OpenButtonCTA", openHandler);
//     userEvents.removeListener("CloseButtonCTA", closeHandler);
//     }

// },[])

return (
    <>
    <button className={props.className} onClick={buttonHandler}>
    <span>{props.title}</span>
    </button>
    </>

)
    
};

export default Button;