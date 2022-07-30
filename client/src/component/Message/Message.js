import React from "react";
import "./Message.css";

const Message = ({ user, message, cls }) => {
  if (user) {
    return <div className={`messageBox ${cls}`}>{` ${user}: ${message}`}</div>;
  } else {
    return <div className={`messageBox ${cls}`}>{` You: ${message}`}</div>;
  }
};

export default Message;
