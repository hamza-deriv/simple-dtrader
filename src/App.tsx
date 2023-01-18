import { useState, useEffect } from 'react';
import SignInModal from './components/layout/SignInModal';
import Homepage from './components/pages/Homepage';
import Header from './components/layout/Header';
import UserProvider from './stores/user-provider';
import './App.css';
// @ts-ignore
import { userEvents } from "./utils/eventListener";

function App() {
  const [showSignInModal, setShowSignIn] = useState<boolean>(false);

  const closeSignInModal = () => {
    setShowSignIn(false);
  };
  const openSignInModal = () => {
    setShowSignIn(true);
  };

  useEffect(() => {
    userEvents.addListener("CloseSignInModal", closeSignInModal);
    userEvents.addListener("OpenSignInModal", openSignInModal);
    return () => {
      userEvents.removeListener("CloseSignInModal", closeSignInModal);
      userEvents.removeListener("OpenSignInModal", openSignInModal);
    };
  }, []);

  return (
    <>
    <UserProvider>
      {showSignInModal && <SignInModal />}
      <Header />
      <Homepage />
    </UserProvider>
    
    </>
  );
}

export default App;
