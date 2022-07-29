import React, { useEffect } from "react";
import { user } from "../Join/Join";
import socketIO from 'socket.io-client';
import './Chat.css'
import {IoSendSharp} from 'react-icons/io5'
const ENDPOINT = "http://localhost:4500/";

const Chat = () => {
    
    const socket = socketIO(ENDPOINT , { transports: ['websocket']} );

    useEffect(() => {
        socket.on('connect', () => {
            alert("connected");
        })
        return () => {

        }
    }, [socket])

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header"></div>
        <div className="chatBox"></div>
        <div className="inputBox">
          <input type="text" id="chatInput" />
          <button className="sendbtn">{<IoSendSharp size={35} />}</button>
        </div>
        {user}
      </div>
    </div>
  );
};

export default Chat;
