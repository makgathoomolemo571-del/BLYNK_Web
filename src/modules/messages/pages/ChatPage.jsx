// src/modules/messages/pages/ChatPage.jsx

import { useEffect, useState } from "react";
import conversationApi from "../services/conversation.api";
import messageApi from "../services/message.api";

import { useParams } from "react-router-dom";

export default function ChatPage() {

  const [loading, setLoading] = useState(true);
const { conversationId } = useParams();
  const [conversations, setConversations] = useState([]);

  const [selectedConversation, setSelectedConversation] =
    useState(null);

  const [messages, setMessages] = useState([]);

  const [text, setText] = useState("");

  useEffect(() => {
    loadConversations();
  }, []);

  async function loadConversations() {

  try {

    const res =
      await conversationApi.getMine();

    const list =
      res.data || res || [];

    setConversations(list);

    if (list.length > 0) {
      openConversation(list[0]);
    }

  } catch(err) {

    console.error(err);

  } finally {

    setLoading(false);

  }

}


  async function openConversation(conversation) {

    setSelectedConversation(conversation);

    try {

      const res =
        await messageApi.getConversationMessages(
          conversation._id
        );

      setMessages(
        res.data || res
      );

    } catch (err) {

      console.error(err);

    }

  }

  async function sendMessage(e) {

    e.preventDefault();

    if (!text.trim()) return;

    try {

      const res =
        await messageApi.create({

          conversationId:
            selectedConversation._id,

          text

        });

      setMessages(prev => [
        ...prev,
        res.data || res
      ]);

      setText("");

    } catch (err) {

      console.error(err);

    }

  }

  if (loading) {

    return (
      <div className="p-10">
        Loading...
      </div>
    );

  }

  return (

    <div className="grid grid-cols-12 h-screen">

      {/* LEFT */}

      <div className="col-span-3 border-r overflow-y-auto">

        <div className="p-4 text-xl font-bold">

          Conversations

        </div>

        {conversations.map(c => (

          <button

            key={c._id}

            onClick={() =>
              openConversation(c)
            }

            className={`w-full text-left p-4 border-b hover:bg-zinc-100 ${
              selectedConversation?._id === c._id
                ? "bg-zinc-200"
                : ""
            }`}

          >

            <div className="font-semibold">

             {c.title || "Conversation"}

            </div>

            <div className="text-xs text-zinc-500">

              {c.lastMessage?.text}

            </div>

          </button>

        ))}

      </div>

      {/* RIGHT */}

      <div className="col-span-9 flex flex-col">

        <div className="p-4 border-b font-bold">

          {selectedConversation?.title}

        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-3">

          {messages.map(msg => (

            <div
              key={msg._id}
              className="bg-zinc-100 rounded-xl p-3"
            >

              <div className="text-xs text-zinc-500">

                {msg.sender?.username}

              </div>

              <div>

                {msg.text}

              </div>

            </div>

          ))}

        </div>

        <form
          onSubmit={sendMessage}
          className="border-t p-4 flex gap-3"
        >

          <input

            value={text}

            onChange={e =>
              setText(e.target.value)
            }

            className="flex-1 border rounded-xl px-4 py-3"

            placeholder="Type message..."

          />

          <button
            className="bg-blue-600 text-white rounded-xl px-6"
          >

            Send

          </button>

        </form>

      </div>

    </div>

  );

}