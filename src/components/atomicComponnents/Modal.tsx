import ReactDOM from "react-dom";
import { userEvents } from "../../utils/eventListener.js";
import "../../styles/modal.css";

const Backdrop = () => {
  const closeHandler = () => {
    userEvents.emit("ECloseClicked");
  };

  return <div className='backdrop' onClick={closeHandler} />;
};

const ModalOverlay = (props:any) => {
  return (
    <div className='modal'>
      <div className='content'>{props.children}</div>
    </div>
  );
};

// New div for Modal Popups
const portalElement = document.getElementById("overlay-div");

const Modal = (props:any) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
