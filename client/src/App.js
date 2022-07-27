import socketIO from 'socket.io-client';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';  


const ENDPOINT = 'http://localhost:4500/';
const socket = socketIO(ENDPOINT , { transports: ['websocket']} );

function App() {

  socket.on("connect", ()=> {})

  return (
    <div className="App">
      <h1>HuHuHuHuHuHu</h1>
      
    </div>
  );
}

export default App;
