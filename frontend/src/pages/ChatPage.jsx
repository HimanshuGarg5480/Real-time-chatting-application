import React, { useState } from "react";
import ConversationList from "../components/ConversationList";
import SearchUser from "../components/SearchUser";

const ChatPage = () => {
  const [searchUserModel,setSearchUserModel]=useState(true);
  return (
    <div className="">
      <SearchUser isOpen={searchUserModel} setIsOpen={setSearchUserModel}/>
      <ConversationList setIsOpen={setSearchUserModel}/>
    </div>
  );
};

export default ChatPage;
