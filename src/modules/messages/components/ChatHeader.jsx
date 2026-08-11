// src/modules/messages/components/ChatHeader.jsx

import {
  ArrowLeft,
  Phone,
  Video,
  Search,
  MoreVertical,
  Archive,
  Bell,
  BellOff,
  Pin,
  PinOff,
  Trash2,
  UserPlus,
  Users
} from "lucide-react";

export default function ChatHeader({
  conversation,
  currentUser,
  onBack,
  onAudioCall,
  onVideoCall,
  onSearch,
  onArchive,
  onUnarchive,
  onMute,
  onUnmute,
  onPin,
  onUnpin,
  onDelete,
  onAddParticipant,
  loading = false
}) {

  if (!conversation) return null;

  const isGroup =
    conversation.type === "group";

  const muted =
    conversation.isMuted;

  const pinned =
    conversation.isPinned;

  const archived =
    conversation.isArchived;

  return (

    <header className="flex items-center justify-between border-b bg-white dark:bg-zinc-950 px-5 py-3">

      <div className="flex items-center gap-4">

        <button
          onClick={onBack}
          className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          <ArrowLeft size={20}/>
        </button>

        <img
          src={
            conversation.avatar ||
            "/images/avatar.png"
          }
          alt=""
          className="w-12 h-12 rounded-full object-cover"
        />

        <div>

          <h2 className="font-bold text-lg">

            {conversation.name}

          </h2>

          <p className="text-sm text-zinc-500">

            {isGroup
              ? `${conversation.participants?.length || 0} members`
              : conversation.online
                ? "Online"
                : "Offline"}

          </p>

        </div>

      </div>

      <div className="flex items-center gap-2">

        <button
          onClick={onSearch}
          className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          <Search size={20}/>
        </button>

        <button
          onClick={onAudioCall}
          className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          <Phone size={20}/>
        </button>

        <button
          onClick={onVideoCall}
          className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          <Video size={20}/>
        </button>

        {isGroup && (

          <button
            onClick={onAddParticipant}
            className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <UserPlus size={20}/>
          </button>

        )}

        <div className="dropdown dropdown-end">

          <label
            tabIndex={0}
            className="btn btn-ghost btn-sm"
          >
            <MoreVertical size={20}/>
          </label>

          <ul
            tabIndex={0}
            className="dropdown-content z-50 menu p-2 shadow bg-white dark:bg-zinc-900 rounded-xl w-60"
          >

            <li>

              <button
                onClick={
                  archived
                    ? onUnarchive
                    : onArchive
                }
                disabled={loading}
              >

                <Archive size={16}/>

                {archived
                  ? "Unarchive"
                  : "Archive"}

              </button>

            </li>

            <li>

              <button
                onClick={
                  muted
                    ? onUnmute
                    : onMute
                }
                disabled={loading}
              >

                {muted
                  ? <Bell size={16}/>
                  : <BellOff size={16}/>}

                {muted
                  ? "Unmute"
                  : "Mute"}

              </button>

            </li>

            <li>

              <button
                onClick={
                  pinned
                    ? onUnpin
                    : onPin
                }
                disabled={loading}
              >

                {pinned
                  ? <PinOff size={16}/>
                  : <Pin size={16}/>}

                {pinned
                  ? "Unpin"
                  : "Pin"}

              </button>

            </li>

            {isGroup && (

              <li>

                <button>

                  <Users size={16}/>

                  Participants

                </button>

              </li>

            )}

            <li className="text-red-600">

              <button
                onClick={onDelete}
                disabled={loading}
              >

                <Trash2 size={16}/>

                Delete Conversation

              </button>

            </li>

          </ul>

        </div>

      </div>

    </header>

  );

}