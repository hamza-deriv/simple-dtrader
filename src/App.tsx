import { useState, useRef, useEffect } from 'react'
import Navbar from './components/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const ws = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=1089');

  const apiCall = {
    ticks: "R_100",
    // subscribe: { channel: "order_book_btcusd" },
  };
  ws.onopen = (event) => {
    ws.send(JSON.stringify({ticks:'R_100'}));
  };

  ws.onmessage = function(msg) {
    var data = JSON.parse(msg.data);
    console.log('ticks update: %o', data);
 };

  return (
    // <div className="App">
      <div>
      <Navbar />
      <div className="container">
        <article>
          <h1>What is Lorem Ipsum? </h1>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry...
        </article>
      </div>
    </div>
    // </div>
  )
}

export default App
