import React, { useState, useRef } from "react";
import { userEvents } from "../../utils/eventListener";
import { connection, api } from "../../utils/common.js";
import Modal from "../atomicComponnents/Modal";
import "../../styles/signinmodal.css";

const SignInModal = (props) => {
  const [authError, setAuthError] = useState(false);
  const [isAPIValid, setisAPIValid] = useState(true);
  const APITokenRef = useRef<HTMLInputElement>(null);

  const closeCard = () => {
    userEvents.emit("ECloseClicked");
  };

  const authorizeResponse = async (res:any) => {
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

  const getActiveSymbols = (userToken:string) => {
    connection.addEventListener("message", authorizeResponse);
    //This is my personal API tocken, you can use it for demo: eAfSynF3bEUwDif (demo acc with money) or MsKyCJHGNc6ve2a (real without money)
    api.send({
      authorize: userToken,
      req_id: 1,
    });
  };

  const confirmHandler = (event:React.FormEvent) => {
    event.preventDefault();

    if (!APITokenRef.current) {
      return;
    }
    const userAPIToken: string | null = APITokenRef.current.value;

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
      {/* <div className='control'>
        <label htmlFor="name">Email</label>
        <input type="text" id="email" placeholder="Currently unavailable" disabled/>
      </div>
      <div className='control'>
        <label htmlFor="street">Password</label>
        <input type="text" id="password" placeholder="Currently unavailable" disabled/>
      </div>
      <p>Or</p> */}
      <div className={nameControlClasses}>
        <label htmlFor="street">API token</label>
        <input
          type="text"
          id="apiToken"
          placeholder="API Token"
          ref={APITokenRef}
          onChange={apiChange}
        />
      </div>
      <div className='actions'>
        <button className='button' type="button" onClick={closeCard}>
          Cancel
        </button>
        <button className='button'>Authenticate</button>
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
      <p>Log in To Continue</p>
      <p>Get Authenticated Token from <a href="https://www.binary.com/en/user/security/api_tokenws">here</a></p>
      <form className='form' onSubmit={confirmHandler}>
        {content}
      </form>
    </Modal>
  );
};

export default SignInModal;
