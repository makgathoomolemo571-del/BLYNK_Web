// src/modules/messages/components/EmptyConversation.jsx

import { MessageCircle, Users, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EmptyConversation() {

  const navigate = useNavigate();

  return (

    <div className="flex flex-col items-center justify-center h-full bg-white dark:bg-zinc-950 px-8">

      <div className="w-28 h-28 rounded-full bg-blue-100 dark:bg-zinc-900 flex items-center justify-center mb-6">

        <MessageCircle
          size={52}
          className="text-blue-600"
        />

      </div>

      <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">

        No Conversation Selected

      </h2>

      <p className="mt-4 max-w-md text-center text-zinc-500">

        Select an existing conversation from the sidebar or start a new chat with a creator, business or friend.

      </p>

      <div className="flex gap-4 mt-10">

        <button
          onClick={() => navigate("/social")}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition"
        >

          <Search size={18} />

          Find People

        </button>

        <button
          onClick={() => navigate("/creator")}
          className="flex items-center gap-2 px-6 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
        >

          <Users size={18} />

          Find Creators

        </button>

      </div>

    </div>

  );

}