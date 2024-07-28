import React, { useState } from "react";
import ConversationList from "../components/ConversationList";
import SearchUser from "../components/SearchUser";
import MessageContainer from "../components/MessageContainer";

const ChatPage = () => {
  const [searchUserModel, setSearchUserModel] = useState(false);
  return (
    <div className="">
      <SearchUser isOpen={searchUserModel} setIsOpen={setSearchUserModel} />
      <div className="flex">
        <ConversationList setIsOpen={setSearchUserModel} />
        <MessageContainer />
      </div>
    </div>
  );
};

export default ChatPage;
