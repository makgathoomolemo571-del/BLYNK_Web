import { useEffect, useRef, useState } from "react";
import { Send, Users } from "lucide-react";
import { io } from "socket.io-client";

import api from "../../../config/api";

const socket = io(import.meta.env.VITE_SOCKET_URL, {
    autoConnect: false,
    transports: ["websocket"]
});

export default function WatchPartyChat({

    watchPartyId,
    currentUser

}) {

    const [messages, setMessages] = useState([]);

    const [message, setMessage] = useState("");

    const [onlineUsers, setOnlineUsers] = useState(0);

    const bottomRef = useRef(null);

    useEffect(() => {

        socket.auth = {

            token: localStorage.getItem("accessToken")

        };

        socket.connect();

        socket.emit("watchparty:join", {

            watchPartyId

        });

        loadMessages();

        socket.on("watchparty:message", (msg) => {

            setMessages((prev) => [...prev, msg]);

        });

        socket.on("watchparty:viewers", (count) => {

            setOnlineUsers(count);

        });

        return () => {

            socket.emit("watchparty:leave", {

                watchPartyId

            });

            socket.disconnect();

        };

    }, [watchPartyId]);

    useEffect(() => {

        bottomRef.current?.scrollIntoView({

            behavior: "smooth"

        });

    }, [messages]);

    async function loadMessages() {

        try {

            const { data } = await api.get(

                `/watchparties/${watchPartyId}`

            );

            setMessages(

                data.chat || []

            );

        }

        catch (err) {

            console.error(err);

        }

    }

    async function sendMessage(e) {

        e.preventDefault();

        if (!message.trim()) return;

        const payload = {

            watchPartyId,

            message

        };

        socket.emit(

            "watchparty:message",

            payload

        );

        setMessage("");

    }

    return (

        <div className="flex flex-col h-full rounded-xl border bg-white dark:bg-zinc-900">

            <div className="flex items-center justify-between p-4 border-b">

                <h2 className="font-semibold">

                    Live Chat

                </h2>

                <div className="flex items-center gap-2 text-sm">

                    <Users size={16} />

                    {onlineUsers}

                </div>

            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">

                {

                    messages.map((msg) => (

                        <div

                            key={msg._id}

                            className={`flex ${msg.user?._id === currentUser?.id

                                ? "justify-end"

                                : "justify-start"

                                }`}

                        >

                            <div

                                className={`max-w-xs rounded-xl px-4 py-2 ${msg.user?._id === currentUser?.id

                                    ? "bg-blue-600 text-white"

                                    : "bg-zinc-200 dark:bg-zinc-800"

                                    }`}

                            >

                                <div className="text-xs font-semibold mb-1">

                                    {

                                        msg.user?.username

                                    }

                                </div>

                                <div>

                                    {msg.message}

                                </div>

                                <div className="text-[10px] opacity-60 mt-1">

                                    {

                                        new Date(

                                            msg.createdAt

                                        ).toLocaleTimeString()

                                    }

                                </div>

                            </div>

                        </div>

                    ))

                }

                <div ref={bottomRef} />

            </div>

            <form

                onSubmit={sendMessage}

                className="flex items-center gap-2 border-t p-3"

            >

                <input

                    type="text"

                    value={message}

                    onChange={(e) =>

                        setMessage(e.target.value)

                    }

                    placeholder="Type message..."

                    className="flex-1 rounded-lg border px-4 py-2 outline-none dark:bg-zinc-950"

                />

                <button

                    type="submit"

                    className="rounded-lg bg-blue-600 p-3 text-white hover:bg-blue-700"

                >

                    <Send size={18} />

                </button>

            </form>

        </div>

    );

}