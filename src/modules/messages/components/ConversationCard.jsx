// src/modules/messages/components/ConversationCard.jsx

import { Link } from "react-router-dom";
import {
  Pin,
  BellOff,
  Archive,
  CheckCheck
} from "lucide-react";

export default function ConversationCard({
  conversation,
  currentUserId
}) {
  if (!conversation) return null;

  const otherParticipants =
    conversation.participants?.filter(
      p => p._id !== currentUserId
    ) || [];

  const displayName =
    conversation.name ||
    otherParticipants
      .map(p => p.displayName || p.username)
      .join(", ");

  const avatar =
    conversation.avatar ||
    otherParticipants[0]?.profilePicture ||
    "/images/avatar.png";

  const lastMessage =
    conversation.lastMessage || {};

  const unread =
    conversation.unreadCount || 0;

  return (
    <Link
      to={`/messages/${conversation._id}`}
      className="
        flex
        items-center
        gap-4
        p-4
        border-b
        hover:bg-zinc-100
        dark:hover:bg-zinc-800
        transition
      "
    >

      <img
        src={avatar}
        alt={displayName}
        className="
          w-14
          h-14
          rounded-full
          object-cover
        "
      />

      <div className="flex-1 min-w-0">

        <div className="flex justify-between">

          <h3
            className="
              font-semibold
              truncate
            "
          >
            {displayName}
          </h3>

          <span
            className="
              text-xs
              text-zinc-500
            "
          >
            {lastMessage.createdAt
              ? new Date(
                  lastMessage.createdAt
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit"
                })
              : ""}
          </span>

        </div>

        <p
          className="
            text-sm
            text-zinc-500
            truncate
          "
        >
          {lastMessage.text ||
            "No messages yet"}
        </p>

      </div>

      <div
        className="
          flex
          flex-col
          items-end
          gap-2
        "
      >

        {conversation.pinned && (
          <Pin
            size={15}
            className="text-blue-600"
          />
        )}

        {conversation.muted && (
          <BellOff
            size={15}
            className="text-zinc-500"
          />
        )}

        {conversation.archived && (
          <Archive
            size={15}
            className="text-zinc-500"
          />
        )}

        {lastMessage.read && (
          <CheckCheck
            size={15}
            className="text-blue-500"
          />
        )}

        {unread > 0 && (

          <span
            className="
              bg-blue-600
              text-white
              text-xs
              rounded-full
              w-6
              h-6
              flex
              items-center
              justify-center
            "
          >
            {unread}
          </span>

        )}

      </div>

    </Link>
  );
}