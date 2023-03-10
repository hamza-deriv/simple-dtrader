import React, { useState, useRef } from "react";
import { userEvents } from "../../utils/eventListener";
import { connection, ws_connection } from "../../utils/common.js";
import Modal from "../atomicComponents/Modal";
import "../../styles/signinmodal.css";

const SignInModal = (props:any) => {
  const [authenticationError, setAuthenticationError] = useState<boolean>(false);
  const [isValidAPI, setIsValidAPI] = useState<boolean>(true);
  const APITokenRef = useRef<HTMLInputElement>(null);

  const closeModal = () => {
    userEvents.emit("CloseSignInModal");
  };

  const authorizeResponse = async (res:any) => {
    const data = JSON.parse(res.data);

    if (data.error !== undefined) {
      setAuthenticationError(true);
      console.log("Error : ", data.error?.message);
      return;
    }

    if (data.msg_type === "authorize") {
      closeModal();
      userEvents.emit("Authorize", data);
    }
  };

  const getActiveSymbols = (userToken:string) => {
    connection.addEventListener("message", authorizeResponse);
    // Demo: eAfSynF3bEUwDif (demo acc with money) or Real: MsKyCJHGNc6ve2a (real without money)
    ws_connection.send({
      authorize: userToken,
      req_id: 1,
    }).catch((error) => {
      console.log(error?.error?.message)
    });
  };

  const submitHandler = (event:React.FormEvent) => {
      event.preventDefault();

      if (!APITokenRef.current) {
        return;
      }
      const userAPIToken: string | null = APITokenRef.current.value;

      if (userAPIToken.trim() === "") {
        setIsValidAPI(false);
        return;
      }

      getActiveSymbols(userAPIToken);
  };

  const changeAPI = () => {
      if (isValidAPI) {
        return;
      }
      setIsValidAPI(true);
  };

  const formControl = `${'control'} ${
    isValidAPI ? "" : 'invalid'
  }`;
  
  let formBody = (
    <>
      <div className={formControl}>
        <label htmlFor="street">API token</label>
        <input
          type="text"
          id="apiToken"
          placeholder="API Token"
          ref={APITokenRef}
          onChange={changeAPI}
        />
      </div>
      <div className='actions'>
        <button className='button' type="button" onClick={closeModal}>
          Cancel
        </button>
        <button className='button'>Authenticate</button>
      </div>
    </>
  );

  if (authenticationError) {
    return (
      <Modal>
        <div className='control'>
          <p className="error-heading"> Opps, something went wrong!</p>
          <p className="error-subheading"> Please, check you API token</p>
        </div>
        <div className='actions'>
          <button className='button' type="button" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal>
      <p>Log in To Continue</p>
      <p>Get Authenticated Token from <a href="https://app.deriv.com/">here</a></p>
      <form className='form' onSubmit={submitHandler}>
        {formBody}
      </form>
    </Modal>
  );
};

export default SignInModal;
