import React, { useCallback, useEffect, useState } from "react";
import debounce from "../utils/debounce.js";
import { useRecoilState, useSetRecoilState } from "recoil";
import conversationListAtom from "../atom/conversationListAtom.js";
import { selectedConversationAtom } from "../atom/selectedConversation.js";

const SearchUser = ({ isOpen, setIsOpen }) => {
  let [conversationList, setConversationList] =
    useRecoilState(conversationListAtom);
  const setSelectedConversation = useSetRecoilState(selectedConversationAtom);
  const [searchedUser, setSearchedUser] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async (name) => {
    if (!name) {
      setFilteredUsers([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:8000/api/message/user?name=${name}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      // console.log(data);
      setFilteredUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMessageClick = async (user) => {
    const res = await fetch(
      "http://localhost:8000/api/message/createConversation",
      {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipientId:user._id
        }),
      }
    );
    const data = await res.json();
    console.log(data,conversationList);
    conversationList = conversationList.filter((item)=>{
      return data.conversation._id!=item._id
    })
    setConversationList([data.conversation, ...conversationList]);
    setIsOpen(false);
    setSelectedConversation({
      conversationId: data.conversation._id,
      userId: data.conversation.participants[0]._id,
      username: user.username,
      userProfilePic: user.profilePic,
    });
  };

  const debouncedFetchUsers = useCallback(debounce(fetchUsers, 300), []);

  useEffect(() => {
    debouncedFetchUsers(searchedUser);
  }, [searchedUser, debouncedFetchUsers]);

  if (!isOpen) return null;
  return (
    <div className="fixed z-10 inset-0 bg-blue-200 bg-opacity-70 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-blue-800">Search Users</h2>
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(false);
            }}
            className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
          >
            Close
          </button>
        </div>
        <input
          type="text"
          placeholder="Search users..."
          value={searchedUser}
          onChange={(e) => setSearchedUser(e.target.value)}
          className="border-2 border-blue-300 p-2 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <ul className="max-h-60 overflow-y-auto">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <li
                key={user._id}
                className="flex justify-between p-2 border-b border-blue-100 hover:bg-blue-50 transition-colors duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className="border rounded-full w-10">
                    <img src={user.profilePic} alt="img" />
                  </div>
                  <div>{user.username}</div>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleMessageClick(user);
                  }}
                  className="border-2 rounded-xl px-2 py-1 border-blue-500 bg-blue-100 hover:bg-blue-200 text-blue-950"
                >
                  message
                </button>
              </li>
            ))
          ) : (
            <li className="p-2 text-blue-700">No users found.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SearchUser;
