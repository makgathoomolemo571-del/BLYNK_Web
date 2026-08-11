// src/modules/messages/components/AttachmentMenu.jsx

import { useRef } from "react";

import {
  Image,
  Video,
  Music,
  FileText,
  Paperclip
} from "lucide-react";

export default function AttachmentMenu({

  onFileSelect,

  disabled = false

}) {

  const imageRef = useRef(null);

  const videoRef = useRef(null);

  const audioRef = useRef(null);

  const fileRef = useRef(null);

  const choose = ref => {

    if (!disabled)
      ref.current.click();

  };

  const handle = e => {

    const file = e.target.files?.[0];

    if (!file) return;

    onFileSelect(file);

    e.target.value = "";

  };

  return (

    <div className="relative">

      <button
        type="button"
        disabled={disabled}
        className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
      >
        <Paperclip size={20}/>
      </button>

      <div className="absolute bottom-12 left-0 bg-white dark:bg-zinc-900 rounded-xl shadow-xl border dark:border-zinc-800 w-56 overflow-hidden">

        <button
          type="button"
          onClick={() => choose(imageRef)}
          className="flex items-center gap-3 w-full px-4 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          <Image size={18}/>
          Images
        </button>

        <button
          type="button"
          onClick={() => choose(videoRef)}
          className="flex items-center gap-3 w-full px-4 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          <Video size={18}/>
          Videos
        </button>

        <button
          type="button"
          onClick={() => choose(audioRef)}
          className="flex items-center gap-3 w-full px-4 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          <Music size={18}/>
          Audio
        </button>

        <button
          type="button"
          onClick={() => choose(fileRef)}
          className="flex items-center gap-3 w-full px-4 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          <FileText size={18}/>
          Documents
        </button>

      </div>

      <input
        ref={imageRef}
        hidden
        type="file"
        accept="image/*"
        onChange={handle}
      />

      <input
        ref={videoRef}
        hidden
        type="file"
        accept="video/*"
        onChange={handle}
      />

      <input
        ref={audioRef}
        hidden
        type="file"
        accept="audio/*"
        onChange={handle}
      />

      <input
        ref={fileRef}
        hidden
        type="file"
        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.rar,.txt"
        onChange={handle}
      />

    </div>

  );

}