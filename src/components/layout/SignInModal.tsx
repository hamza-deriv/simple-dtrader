import { useState, useRef } from "react";
import { userEvents } from "../../utils/eventListener.js";
import { connection, api } from "../../utils/common.js";
import Modal from "../atomicComponnents/Modal";
import "../../styles/signinmodal.css";

const SignInModal = (props) => {
  const [authError, setAuthError] = useState(false);
  const [isAPIValid, setisAPIValid] = useState(true);
  const APITockenRef = useRef();

  const closeCard = () => {
    userEvents.emit("ECloseClicked");
  };

  const authorizeResponse = async (res) => {
    const data = JSON.parse(res.data);

    if (data.error !== undefined) {
      setAuthError(true);
      console.log("Error : ", data.error?.message);
      //connection.removeEventListener("message", activeResponse, false);
      return;
      //await api.disconnect();
    }

    if (data.msg_type === "authorize") {
      closeCard();
      userEvents.emit("EAuthorize", data);
    }
  };

  const getActiveSymbols = (userTocken) => {
    connection.addEventListener("message", authorizeResponse);
    //This is my personal API tocken, you can use it for demo: QSw9m6F8QhPWf3Z (real acc without money) or PHMs7GYEsGpkaWC (demo with money)
    api.send({
      authorize: userTocken,
      req_id: 1,
    });
  };

  const confirmHandler = (event) => {
    event.preventDefault();

    const userAPIToken = APITockenRef.current.value;

    if (userAPIToken.trim() === "") {
      setisAPIValid(false);
      return;
    }

    getActiveSymbols(userAPIToken);
  };

  const nameControlClasses = `${'control'} ${
    isAPIValid ? "" : 'invalid'
  }`;

  const apiChange = () => {
    if (isAPIValid) {
      return;
    }
    setisAPIValid(true);
  };

  let content = (
    <>
      <div className='control'>
        <label htmlFor="name">Email</label>
        <input type="text" id="email" placeholder="Currently unavailable" />
      </div>
      <div className='control'>
        <label htmlFor="street">Password</label>
        <input type="text" id="password" placeholder="Currently unavailable" />
      </div>
      <p>Or</p>
      <div className={nameControlClasses}>
        <label htmlFor="street">API token</label>
        <input
          type="text"
          id="apiToken"
          ref={APITockenRef}
          onChange={apiChange}
        />
      </div>
      <div className='actions'>
        <button className='button' type="button" onClick={closeCard}>
          Cancel
        </button>
        <button className='button'>Log in</button>
      </div>
    </>
  );

  if (authError) {
    return (
      <Modal>
        <div className='control'>
          <p> Opps, something went wrong!</p>
          <p> Please, check you API token</p>
        </div>
        <div className='actions'>
          <button className='button' type="button" onClick={closeCard}>
            Cancel
          </button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal>
      <p>Please, fill in the form below</p>
      <form className='form' onSubmit={confirmHandler}>
        {content}
      </form>
    </Modal>
  );
};

export default SignInModal;
