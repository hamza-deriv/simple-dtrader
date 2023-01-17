import ReactDOM from "react-dom";
import "../../styles/modal.css";
import { userEvents } from "../../utils/eventListener.js";

const Backdrop = () => {
  const closeCart = () => {
    userEvents.emit("ECloseClicked");
  };

  return <div className='backdrop' onClick={closeCart} />;
};

const ModalOverlay = (props) => {
  return (
    <div className='modal'>
      <div className='content'>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = () => {
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
