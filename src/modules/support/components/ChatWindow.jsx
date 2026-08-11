import { useEffect, useRef, useState } from "react";
import { FiSend, FiPaperclip } from "react-icons/fi";
import { useSelector } from "react-redux";

import supportApi from "../services/support.api";

const ChatWindow = ({ ticket }) => {
  const user = useSelector((state) => state.auth.user);

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const bottomRef = useRef(null);

  const loadMessages = async () => {
    try {
      const { data } =
        await supportApi.getMessages(ticket.id);

      setMessages(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (ticket?.id) {
      loadMessages();
    }
  }, [ticket]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      setSending(true);

      const { data } =
        await supportApi.sendMessage(
          ticket.id,
          {
            message,
          }
        );

      setMessages((prev) => [
        ...prev,
        data,
      ]);

      setMessage("");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex flex-col h-full rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-zinc-900">

      <div className="px-5 py-4 border-b border-zinc-200 dark:border-zinc-800">

        <h2 className="font-semibold text-lg">

          {ticket.ticketNumber}

        </h2>

        <p className="text-sm text-zinc-500">

          {ticket.subject}

        </p>

      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-4">

        {messages.map((msg) => {

          const mine =
            msg.sender === user.id;

          return (

            <div
              key={msg.id}
              className={`flex ${
                mine
                  ? "justify-end"
                  : "justify-start"
              }`}
            >

              <div
                className={`max-w-lg rounded-2xl px-4 py-3 ${
                  mine
                    ? "bg-blue-600 text-white"
                    : "bg-zinc-100 dark:bg-zinc-800"
                }`}
              >

                <div className="text-sm whitespace-pre-wrap">

                  {msg.message}

                </div>

                <div className="mt-2 text-[11px] opacity-70">

                  {new Date(
                    msg.createdAt
                  ).toLocaleString()}

                </div>

              </div>

            </div>

          );

        })}

        <div ref={bottomRef} />

      </div>

      {ticket.status !== "closed" && (
        <div className="border-t border-zinc-200 dark:border-zinc-800 p-4 flex gap-3">

          <button
            type="button"
            className="w-11 h-11 rounded-lg border flex items-center justify-center"
          >
            <FiPaperclip />
          </button>

          <textarea
            rows={1}
            value={message}
            onChange={(e) =>
              setMessage(
                e.target.value
              )
            }
            placeholder="Type your reply..."
            className="flex-1 resize-none rounded-lg border px-4 py-3 outline-none"
          />

          <button
            disabled={sending}
            onClick={sendMessage}
            className="px-5 rounded-lg bg-blue-600 text-white flex items-center gap-2"
          >
            <FiSend />

            {sending
              ? "Sending..."
              : "Send"}
          </button>

        </div>
      )}

    </div>
  );
};

export default ChatWindow;