import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import userAtom from "../atom/userAtom.js";
import { useRecoilState, useSetRecoilState } from "recoil";
import conversationListAtom from "../atom/conversationListAtom.js";
import { selectedConversationAtom } from "../atom/selectedConversation.js";

const ConversationList = ({ setIsOpen }) => {
  const [conversationList, setConversationList] =
    useRecoilState(conversationListAtom);
  const setSelectedConversation = useSetRecoilState(selectedConversationAtom);
  const [userData, setUserData] = useRecoilState(userAtom);

  useEffect(() => {
    async function fetchConversations() {
      const res = await fetch(
        "http://localhost:8000/api/message/getconversations",
        {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      // console.log(data.conversations);
      setUserData(data.user);
      setConversationList([...data.conversations]);
    }

    fetchConversations();
  }, []);

  const handleSelectedConversation = (conversation) => {
    setSelectedConversation({
      conversationId: conversation._id,
      userId: conversation.participants[0]._id,
      username: conversation.participants[0].username,
      userProfilePic: conversation.participants[0].profilePic,
    });
  };

  return (
    <div className="max-h-screen p-0">
      <div className="relative h-[100vh] w-[340px] shadow-lg bg-white rounded-lg">
        <header className="pt-6 pb-4 px-5 border-b border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center">
              <a className="inline-flex items-start mr-3" href="#0">
                <img
                  className="rounded-full"
                  src={`${userData.profilePic}`}
                  width="48"
                  height="48"
                  alt="Lauren Marsano"
                />
              </a>
              <div className="pr-1">
                <div className="text-gray-800 hover:text-gray-900">
                  <h2 className="text-xl leading-snug font-bold">
                    {userData.username}
                  </h2>
                  <p>{userData.email}</p>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="pt-3 px-5">
          <h3 className="text-xs font-semibold uppercase text-gray-400 mb-1">
            Chats
          </h3>
          <div className="divide-y divide-gray-200">
            {conversationList?.map((conversations) => {
              return (
                <div
                  onClick={() => {
                    handleSelectedConversation(conversations);
                  }}
                  key={conversations._id}
                  className="w-full text-left py-2 hover:bg-gray-100"
                >
                  <div className="flex items-center">
                    <img
                      className="rounded-full items-start flex-shrink-0 mr-3"
                      src={conversations?.participants[0]?.profilePic}
                      width="32"
                      height="32"
                    />
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">
                        {conversations?.participants[0]?.username}
                      </h4>
                      <div className="text-[13px]">
                        The video chat ended · 2hrs
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(true);
          }}
          className="absolute bottom-5 right-5 inline-flex items-center text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 rounded-full text-center px-3 py-2 shadow-lg focus:outline-none focus-visible:ring-2"
        >
          <svg
            className="w-3 h-3 fill-current text-indigo-300 flex-shrink-0 mr-2"
            viewBox="0 0 12 12"
          >
            <path d="M11.866.146a.5.5 0 0 0-.437-.139c-.26.044-6.393 1.1-8.2 2.913a4.145 4.145 0 0 0-.617 5.062L.305 10.293a1 1 0 1 0 1.414 1.414L7.426 6l-2 3.923c.242.048.487.074.733.077a4.122 4.122 0 0 0 2.933-1.215c1.81-1.809 2.87-7.94 2.913-8.2a.5.5 0 0 0-.139-.439Z" />
          </svg>
          <span>New Chat</span>
        </button>
      </div>
    </div>
  );
};

export default ConversationList;
