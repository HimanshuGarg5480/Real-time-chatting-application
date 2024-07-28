import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { selectedConversationAtom } from "../atom/selectedConversation";

const MessageContainer = () => {
  const selectedConversation = useRecoilValue(selectedConversationAtom);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  console.log(selectedConversation);
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      setMessages([...messages, { text: inputValue, sender: "user" }]);
      setInputValue("");
      // Add logic here to send the message to the server or handle the response
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen w-full mx-auto bg-white border rounded-lg shadow-lg">
      {/* Header */}
      <div className="p-4 border-b bg-gray-100">
        <h2 className="text-xl font-semibold text-gray-800">Chat</h2>
      </div>

      {/* Message Display */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex mb-2 ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg shadow ${
                message.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input and Send Button */}
      <div className="p-4 border-t bg-white">
        <div className="flex items-center">
          <input
            type="text"
            className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Type your message..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageContainer;
