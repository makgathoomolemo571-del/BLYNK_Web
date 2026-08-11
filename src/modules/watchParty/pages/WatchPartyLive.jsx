import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import watchPartyApi from "../services/watchParty.api";

const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL;

export default function WatchPartyLive() {
  const { id } = useParams();
console.log("URL:", window.location.pathname);
console.log("Route id:", id);
  const navigate = useNavigate();

  const socketRef = useRef(null);

  const videoRef = useRef(null);

  const [loading, setLoading] = useState(true);

  const [party, setParty] = useState(null);

  const [participants, setParticipants] =
    useState([]);

  const [viewerCount, setViewerCount] =
    useState(0);

  const [messages, setMessages] =
    useState([]);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

 useEffect(() => {
    let stream;

    const startCamera = async () => {
        try {
            stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            });

            if (!videoRef.current) return;

            videoRef.current.srcObject = stream;

            await videoRef.current.play().catch(() => {});
        } catch (err) {
            console.error("Camera error:", err);

            if (
                err.name === "NotAllowedError" ||
                err.name === "PermissionDeniedError"
            ) {
                alert("Camera permission denied.");
            }
        }
    };

    startCamera();

    return () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
    };
}, []);

useEffect(() => {
    loadParty();

    return () => {
        if (socketRef.current) {
            socketRef.current.emit("watchparty_leave", id);
            socketRef.current.disconnect();
        }
    };
}, [id]);

  async function loadParty() {

    try {

      const party =
    await watchPartyApi.getWatchParty(id);

setParty(party);

setViewerCount(party.viewerCount);

      connectSocket();

      setLoading(false);

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Unable to load watch party."
      );

      setLoading(false);

    }

  }

  function connectSocket() {

    socketRef.current =
      io(SOCKET_URL, {

        transports: ["websocket"],

        withCredentials: true

      });

    socketRef.current.emit(
      "watchparty_join",
      id
    );

    socketRef.current.on(
      "viewer_count",
      count => {

        setViewerCount(count);

      }
    );

    socketRef.current.on(
      "participants",
      users => {

        setParticipants(users);

      }
    );

    socketRef.current.on(
      "chat_message",
      data => {

        setMessages(prev => [
          ...prev,
          data
        ]);

      }
    );

    socketRef.current.on(
      "party_ended",
      () => {

        navigate("/watch-parties");

      }
    );

  }

  function sendMessage(e) {

    e.preventDefault();

    if (!message.trim()) return;

    socketRef.current.emit(
      "chat_message",
      {
        watchPartyId: id,
        message
      }
    );

    setMessage("");

  }

  
   

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="flex h-screen items-center justify-center text-red-600">
        {error}
      </div>
    );

  return (

    <div className="grid grid-cols-12 h-screen bg-black">

      <div className="col-span-9 flex flex-col">

        <div className="flex items-center justify-between bg-zinc-900 text-white p-4">

          <div>

            <h1 className="text-xl font-bold">
              {party.title}
            </h1>

            <p className="text-sm opacity-70">
              {party.description}
            </p>

          </div>

          <div className="text-sm">

            👁 {viewerCount}

          </div>

        </div>

        <div className="flex-1 bg-black">

         <video
    ref={videoRef}
    autoPlay
    playsInline
    muted
    className="w-full h-full object-cover"
/>

        </div>

      </div>

      <div className="col-span-3 bg-zinc-950 border-l border-zinc-800 flex flex-col">

        <div className="p-4 border-b border-zinc-800">

          <h2 className="font-semibold text-white">

            Participants

          </h2>

          <p className="text-sm text-zinc-400">

            {participants.length}

          </p>

        </div>

        <div className="flex-1 overflow-y-auto">

          {participants.map(user => (

            <div
              key={user._id}
              className="px-4 py-2 border-b border-zinc-900 text-white"
            >

              {user.username}

            </div>

          ))}

        </div>

        <div className="border-t border-zinc-800">

          <div className="h-72 overflow-y-auto p-3">

            {messages.map((msg,index)=>(

              <div
                key={index}
                className="mb-2"
              >

                <span className="font-semibold text-blue-400">

                  {msg.username}

                </span>

                <span className="text-white ml-2">

                  {msg.message}

                </span>

              </div>

            ))}

          </div>

          <form
            onSubmit={sendMessage}
            className="flex"
          >

            <input

              value={message}

              onChange={e =>
                setMessage(
                  e.target.value
                )
              }

              placeholder="Message..."

              className="flex-1 bg-zinc-900 text-white px-3 py-3 outline-none"

            />

            <button
              className="bg-blue-600 px-5 text-white"
            >

              Send

            </button>

          </form>

        </div>

      </div>

    </div>

  );

}