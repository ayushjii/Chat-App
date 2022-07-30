import React, { useEffect, useState } from "react";
import { user } from "../Join/Join";
import socketIo from "socket.io-client";
import "./Chat.css";
import { IoSendSharp } from "react-icons/io5";
import Message from '../Message/Message'
import ReactScrollToBottom from 'react-scroll-to-bottom';
import {ImCross} from 'react-icons/im';

let socket;

const ENDPOINT = "http://localhost:4500/";

const Chat = () => {
  const [id, setid] = useState("");
  const [messages, setMessage] = useState([])

  const send = () => {
    const message = document.getElementById('chatInput').value;
    socket.emit('message', { message, id });
    document.getElementById("chatInput").value = "";
  };

  useEffect(() => {
     socket = socketIo(ENDPOINT, { transports: ["websocket"] });

    socket.on("connect", () => {
      // alert("connected");
      setid(socket.id);
    });
    console.log(socket);
    socket.emit("joined", { user });

    socket.on("welcome", (data) => {
      setMessage([...messages,data]);
      console.log(data.user, data.message);
    });

    socket.on("userJoined", (data) => {
      setMessage([...messages,data]);
      console.log(data.user, data.message);
    });

    socket.on("leave", (data) => {
      setMessage([...messages,data]);
      console.log(data.user, data.message);
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    }
  }, []);

  useEffect(() => {
    socket.on('sendMessage', (data)=>{
      setMessage([...messages,data]);
    console.log(data.user,data.message,data.id)
    })
    return () => {
      socket.off();
    }
  }, [messages]);

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
          <h1>Chatter Box</h1>
         <a href="/"> {<ImCross size={20} className="closebtn" color="#fff" />} </a>
        </div>
        <ReactScrollToBottom className="chatBox">
           {messages.map((item, i)=> 
           <Message 
           message={item.message} 
           user={item.id===id? '' : item.user}
           cls={item.id===id? 'right' : 'left'}
           />)}
        </ReactScrollToBottom>
        <div className="inputBox">
          <input type="text" id="chatInput" />
          <button onClick={send} className="sendbtn">
            {<IoSendSharp size={35} className="icon" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
