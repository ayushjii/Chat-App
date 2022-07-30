import React from "react";
import './Message.css'


const Message = ({message}) => {
   return(
    <div className="messageBox left">
        {message}
    </div>
   );
}

export default Message;