import ReactDOM from "react-dom";
import { userEvents } from "../../utils/eventListener";
import "../../styles/modal.css";

const Backdrop = () => {
  const closeHandler = () => {
    userEvents.emit("CloseSignInModal");
  };

  return <div className='backdrop' onClick={closeHandler} />;
};

const ModalOverlay:React.FC<{children: React.ReactNode}> = (props) => {
  return (
    <div className='modal'>
      <div className='content'>{props.children}</div>
    </div>
  );
};

// New div for Modal Popups
const popup = document.getElementById("overlay-div") as HTMLElement;

const Modal:React.FC<{children: React.ReactNode}> = (props) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop />, popup)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        popup
      )}
    </>
  );
};

export default Modal;
