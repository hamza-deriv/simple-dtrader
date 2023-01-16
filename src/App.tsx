import { useState, useRef, useEffect } from 'react'
import Navbar from './components/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { AppRouter } from "./routes/AppRouter"
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <>
       {/* <Navbar /> */}
      {/* <AppRouter /> */}
      <LoginPage />
   
    </>
  )
}

export default App
