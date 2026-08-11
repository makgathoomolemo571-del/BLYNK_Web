// src/modules/messages/components/MessageBubble.jsx

import {
  FaReply,
  FaSmile,
  FaCheck,
  FaCheckDouble,
  FaThumbtack,
  FaStar
} from "react-icons/fa";

import dayjs from "dayjs";

export default function MessageBubble({

  message,

  currentUser,

  onReply,

  onReact,

  onPin,

  onStar

}) {

  const mine =
    message.sender?._id === currentUser?._id ||
    message.sender === currentUser?._id;

  return (

    <div
      className={`flex mb-3 ${
        mine
          ? "justify-end"
          : "justify-start"
      }`}
    >

      <div
        className={`
          max-w-[75%]
          rounded-2xl
          px-4
          py-3
          shadow-sm
          ${
            mine
              ? "bg-blue-600 text-white"
              : "bg-white dark:bg-zinc-800"
          }
        `}
      >

        {!mine && (

          <div className="font-semibold text-sm mb-1">

            {message.sender?.displayName ||
             message.sender?.username}

          </div>

        )}

        {message.replyTo && (

          <div
            className="
            mb-2
            rounded-lg
            border-l-4
            border-blue-500
            bg-black/10
            p-2
          "
          >

            <div className="text-xs opacity-70">

              Replying to

            </div>

            <div className="text-sm truncate">

              {message.replyTo.content}

            </div>

          </div>

        )}

        <div className="break-words">

          {message.content}

        </div>

        {message.attachments?.length > 0 && (

          <div className="mt-3 space-y-2">

            {message.attachments.map(file=>(

              <a

                key={file._id}

                href={file.url}

                target="_blank"

                rel="noreferrer"

                className="block underline"

              >

                {file.originalName}

              </a>

            ))}

          </div>

        )}

        {message.reactions?.length > 0 && (

          <div className="flex gap-2 flex-wrap mt-3">

            {message.reactions.map((reaction,index)=>(

              <span

                key={index}

                className="
                bg-black/10
                rounded-full
                px-2
                py-1
                text-xs
              "

              >

                {reaction.emoji}

              </span>

            ))}

          </div>

        )}

        <div
          className="
          flex
          items-center
          justify-between
          mt-3
          text-xs
          opacity-70
        "
        >

          <div>

            {dayjs(message.createdAt)
              .format("HH:mm")}

            {message.edited && (
              <> • edited</>
            )}

          </div>

          <div className="flex items-center gap-2">

            {message.pinned && (
              <FaThumbtack />
            )}

            {message.starred && (
              <FaStar />
            )}

            {mine && (

              message.read
              ? <FaCheckDouble />
              : <FaCheck />

            )}

          </div>

        </div>

        <div
          className="
          flex
          gap-3
          mt-3
          text-sm
        "
        >

          <button
            onClick={() =>
              onReply(message)
            }
          >
            <FaReply />
          </button>

          <button
            onClick={() =>
              onReact(message)
            }
          >
            <FaSmile />
          </button>

          <button
            onClick={() =>
              onPin(message)
            }
          >
            <FaThumbtack />
          </button>

          <button
            onClick={() =>
              onStar(message)
            }
          >
            <FaStar />
          </button>

        </div>

      </div>

    </div>

  );

}