import { useState, useEffect } from 'react';
import SignInModal from './components/layout/SignInModal';
import Homepage from './components/pages/Homepage';
import Header from './components/layout/Header';
import UserProvider from './stores/user-provider';
import './App.css';
// @ts-ignore
import { userEvents } from "./utils/eventListener";

function App() {
  const [isCartShown, setIsCartShown] = useState(false);

  const CloseHandler = () => {
    setIsCartShown(false);
  };
  const OpenHandler = () => {
    setIsCartShown(true);
  };

  useEffect(() => {
    userEvents.addListener("ECloseClicked", CloseHandler);
    userEvents.addListener("EOpenClicked", OpenHandler);
    return () => {
      userEvents.removeListener("ECloseClicked", CloseHandler);
      userEvents.removeListener("EOpenClicked", OpenHandler);
    };
  }, []);

  return (
    <>
    <UserProvider>
      {isCartShown && <SignInModal />}
      <Header />
      <Homepage />
    </UserProvider>
    
    </>
  );
}

export default App;
