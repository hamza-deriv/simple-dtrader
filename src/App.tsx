import { useState, useRef, useEffect } from 'react'
import Navbar from './components/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Layout } from "./components/Layout"
import { AppRouter } from "./routes/AppRouter"

function App() {
  return (
    // <Layout>
    <>
       <Navbar />
     <AppRouter />
   
    </>
     
    // </Layout>
  )
}

export default App
