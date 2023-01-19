import ReactDOM from "react-dom";
import { userEvents } from "../../utils/eventListener";
import "../../styles/modal.css";

const CTABackdrop = () => {
  const closeHandler = () => {
    userEvents.emit("CloseButtonCTA");
  };

  return <div className='backdrop-cta' onClick={closeHandler} />;
};

const CTAModalOverlay:React.FC<{children: React.ReactNode}> = (props) => {
  return (
    <div className='modal-cta'>
      <div className='content-modal-cta'>{props.children}</div>
    </div>
  );
};

// New div for Modal Popups
const portalElement = document.getElementById("overlay-div-modal") as HTMLElement;

const CTAModal:React.FC<{children: React.ReactNode}> = (props) => {
  return (
    <>
      {ReactDOM.createPortal(<CTABackdrop />, portalElement)}
      {ReactDOM.createPortal(
        <CTAModalOverlay>{props.children}</CTAModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default CTAModal;
