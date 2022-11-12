import React, { useState } from "react";

const ChatFooter = ({ socket }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem("userName")) {
      console.log(message);
      socket.emit("message", {
        text: message,
        name: localStorage.getItem("userName"),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage("");
  };

  return (
    <div className="chat__footer">
      <input
        type="text"
        placeholder="입력해주세요"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      ></input>
      <button onClick={handleSendMessage}>전송</button>
    </div>
  );
};

export default ChatFooter;
