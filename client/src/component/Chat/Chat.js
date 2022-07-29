import React, { useEffect } from "react";
import { user } from "../Join/Join";
import socketIO from 'socket.io-client';
import './Chat.css'
import {IoSendSharp} from 'react-icons/io5'
const ENDPOINT = "http://localhost:4500/";

const Chat = () => {
    
  
  useEffect(() => {
    const socket = socketIO(ENDPOINT , { transports: ['websocket']} );
    socket.on('connect', () => {
            // alert("connected");
        })
   console.log(socket)
        socket.emit('joined', {user})

        socket.on('welcome',(data)=>{
          console.log(data.user, data.message)
        } )
 
        socket.on('userJoined', (data)=>{
          console.log(data.user, data.message);
        })

        socket.on('leave', (data)=>{
          console.log(data.user, data.message)
        })

        return () => {
        socket.emit(`disconnect`)
        socket.off();
        }
    }, [])

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header"></div>
        <div className="chatBox"></div>
        <div className="inputBox">
          <input type="text" id="chatInput" />
          <button className="sendbtn">{<IoSendSharp size={35}  className="icon"/>}</button>
        </div>
        {user}
      </div>
    </div>
  );
};

export default Chat;
