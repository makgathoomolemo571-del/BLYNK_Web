// src/modules/messages/components/ConversationList.jsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  fetchConversations,
  selectConversation
} from "../store/messageSlice";

export default function ConversationList() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    conversations,
    loading,
    selectedConversation
  } = useSelector(
    state => state.messages
  );

  useEffect(() => {

    dispatch(fetchConversations());

  }, [dispatch]);

  if (loading) {

    return (
      <div className="p-5 text-center">
        Loading conversations...
      </div>
    );

  }

  if (!conversations.length) {

    return (
      <div className="p-6 text-center text-zinc-500">
        No conversations yet.
      </div>
    );

  }

  return (

    <div className="divide-y divide-zinc-200 dark:divide-zinc-800">

      {conversations.map(conversation => {

        const otherUser =
          conversation.otherParticipant ||
          conversation.participants?.find(
            p => !p.isMe
          );

        return (

          <button

            key={conversation._id}

            onClick={() => {

              dispatch(
                selectConversation(
                  conversation
                )
              );

              navigate(
                `/messages/${conversation._id}`
              );

            }}

            className={`

              w-full

              flex

              items-center

              gap-4

              px-4

              py-3

              hover:bg-zinc-100

              dark:hover:bg-zinc-900

              transition

              ${selectedConversation?._id === conversation._id
                ? "bg-zinc-100 dark:bg-zinc-900"
                : ""
              }

            `}

          >

            <img

              src={
                otherUser?.profilePicture ||
                "/images/avatar.png"
              }

              alt="avatar"

              className="w-14 h-14 rounded-full object-cover"

            />

            <div className="flex-1 text-left">

              <div className="flex justify-between items-center">

                <h3 className="font-semibold">

                  {conversation.name ||
                    otherUser?.displayName ||
                    otherUser?.username ||
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

                {conversation.lastMessage?.text ||

                  conversation.lastMessage?.message ||

                  "No messages"}

              </p>

            </div>

            {!!conversation.unreadCount && (

              <div className="bg-blue-600 text-white rounded-full min-w-[24px] h-6 px-2 flex items-center justify-center text-xs">

                {conversation.unreadCount}

              </div>

            )}

          </button>

        );

      })}

    </div>

  );

}