// src/modules/messages/components/TypingIndicator.jsx

import { useEffect, useState } from "react";

export default function TypingIndicator({
  users = [],
  timeout = 3000
}) {

  const [typingUsers, setTypingUsers] = useState(users);

  useEffect(() => {

    setTypingUsers(users);

    if (!users.length) return;

    const timer = setTimeout(() => {
      setTypingUsers([]);
    }, timeout);

    return () => clearTimeout(timer);

  }, [users, timeout]);

  if (!typingUsers.length) return null;

  const names =
    typingUsers.map(user =>
      typeof user === "string"
        ? user
        : user.displayName ||
          user.username ||
          "Someone"
    );

  let text = "";

  if (names.length === 1)
    text = `${names[0]} is typing...`;

  else if (names.length === 2)
    text = `${names[0]} and ${names[1]} are typing...`;

  else
    text = `${names.length} people are typing...`;

  return (

    <div className="flex items-center gap-3 px-4 py-2 text-sm text-zinc-500">

      <div className="flex gap-1">

        <span
          className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"
          style={{ animationDelay: "0ms" }}
        />

        <span
          className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"
          style={{ animationDelay: "180ms" }}
        />

        <span
          className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"
          style={{ animationDelay: "360ms" }}
        />

      </div>

      <span>{text}</span>

    </div>

  );

}