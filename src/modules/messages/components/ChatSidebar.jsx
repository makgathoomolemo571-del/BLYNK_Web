// src/modules/messages/components/ChatSidebar.jsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  fetchConversations,
  setActiveConversation
} from "../store/messagesSlice";

export default function ChatSidebar() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    conversations,
    loading,
    activeConversation
  } = useSelector(
    state => state.messages
  );

  useEffect(() => {

    dispatch(
      fetchConversations()
    );

  }, [dispatch]);

  const openConversation = (conversation) => {

    dispatch(
      setActiveConversation(conversation)
    );

    navigate(
      `/messages/${conversation._id}`
    );

  };

  return (

    <aside className="w-full h-full flex flex-col bg-white border-r">

      <div className="p-5 border-b">

        <h2 className="text-xl font-bold">
          Messages
        </h2>

      </div>

      <div className="flex-1 overflow-y-auto">

        {loading && (

          <div className="p-5 text-center">

            Loading conversations...

          </div>

        )}

        {!loading &&
          conversations.length === 0 && (

          <div className="p-6 text-center text-zinc-500">

            No conversations yet.

          </div>

        )}

        {conversations.map(conversation => {

          const last =
            conversation.lastMessage;

          const other =
            conversation.displayUser ||
            conversation.otherParticipant ||
            {};

          return (

            <button

              key={conversation._id}

              onClick={() =>
                openConversation(
                  conversation
                )
              }

              className={`w-full text-left px-4 py-3 border-b hover:bg-zinc-100 transition

              ${
                activeConversation?._id ===
                conversation._id
                  ? "bg-blue-50"
                  : ""
              }`}

            >

              <div className="flex gap-3">

                <img

                  src={
                    other.profilePicture ||
                    "/default-avatar.png"
                  }

                  alt=""

                  className="w-12 h-12 rounded-full object-cover"

                />

                <div className="flex-1 overflow-hidden">

                  <div className="flex justify-between">

                    <h3 className="font-semibold truncate">

                      {other.displayName ||
                        other.username ||
                        "Conversation"}

                    </h3>

                    <span className="text-xs text-zinc-500">

                      {conversation.updatedAt
                        ? new Date(
                            conversation.updatedAt
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit"
                          })
                        : ""}

                    </span>

                  </div>

                  <p className="text-sm text-zinc-500 truncate">

                    {last?.text ||
                      last?.message ||
                      "No messages"}

                  </p>

                </div>

                {!!conversation.unreadCount && (

                  <div className="min-w-6 h-6 px-2 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">

                    {conversation.unreadCount}

                  </div>

                )}

              </div>

            </button>

          );

        })}

      </div>

    </aside>

  );

}