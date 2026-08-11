// src/modules/messages/components/EmojiPicker.jsx

import { useEffect, useRef, useState } from "react";
import { Smile } from "lucide-react";

const EMOJIS = [
  "😀","😁","😂","🤣","😅","😊","😍","😘","😎","🤩",
  "🤔","😴","😭","😡","🥳","😇","👍","👎","👏","🙌",
  "💪","🙏","👌","✌️","🤝","👀","🔥","❤️","💔","💯",
  "🎉","🎊","🎵","🎶","⚽","🏆","🚀","🌍","🍕","☕",
  "🍔","🥤","🌮","🎮","📱","💻","📸","🎬","🎧","🎤",
  "🐶","🐱","🦁","🐼","🐵","🌹","🌞","🌈","⭐","⚡",
  "💰","💎","🛒","🏡","🏢","🚗","✈️","🚌","🚲","🎁"
];

export default function EmojiPicker({

  onSelect,

  className = ""

}) {

  const [open, setOpen] = useState(false);

  const wrapperRef = useRef(null);

  useEffect(() => {

    function handleClickOutside(e) {

      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target)
      ) {
        setOpen(false);
      }

    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

  }, []);

  function chooseEmoji(emoji) {

    if (onSelect) {

      onSelect(emoji);

    }

    setOpen(false);

  }

  return (

    <div
      ref={wrapperRef}
      className={`relative ${className}`}
    >

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
      >

        <Smile size={22} />

      </button>

      {open && (

        <div className="absolute bottom-12 left-0 w-80 h-64 bg-white dark:bg-zinc-900 border dark:border-zinc-700 rounded-xl shadow-2xl z-50 overflow-hidden">

          <div className="p-3 border-b dark:border-zinc-700 font-semibold">

            Emojis

          </div>

          <div className="grid grid-cols-8 gap-2 p-3 overflow-y-auto h-[210px]">

            {EMOJIS.map((emoji, index) => (

              <button
                key={index}
                type="button"
                onClick={() => chooseEmoji(emoji)}
                className="text-2xl hover:scale-125 transition rounded-lg p-1"
              >

                {emoji}

              </button>

            ))}

          </div>

        </div>

      )}

    </div>

  );

}