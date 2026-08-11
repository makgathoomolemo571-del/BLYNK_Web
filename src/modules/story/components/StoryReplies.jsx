import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaPaperPlane } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";

const StoryReplies = ({
  storyId,
  replies = [],
  onSendReply,
  currentUser,
}) => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!text.trim()) return;

    setLoading(true);
    try {
      await onSendReply(
    storyId,
    text
);
      setText("");
    } finally {
      setLoading(false);
    }
  };
console.log(replies[0]);
  return (
    <div className="flex flex-col h-full w-full bg-black/80 text-white">
      <div className="flex-1 overflow-y-auto">

    {replies.length === 0 ? (

        <div className="text-center text-gray-400 mt-10">
            No replies yet
        </div>

    ) : (

        replies.map((reply) => (

            <div
                key={reply._id || reply.id}
                className="flex items-start gap-3 p-3 border-b border-zinc-800"
            >

                <img
                    src={reply.user?.profilePicture}
                    alt={reply.user?.username}
                    className="w-10 h-10 rounded-full object-cover"
                />

                <div className="flex-1">

                    <div className="flex items-center gap-2">

                        <span className="font-semibold">
                            {reply.user?.username}
                        </span>

                        <span className="text-xs text-gray-400">
                            {formatDistanceToNow(
                                new Date(reply.createdAt),
                                { addSuffix: true }
                            )}
                        </span>

                    </div>

                    <p className="text-gray-200">
                        {reply.text}
                    </p>

                </div>

                <button
                    onClick={() => navigate(`/messages/:conversationId`)}
                    className="px-3 py-1 rounded-full bg-blue-600 hover:bg-blue-700 text-xs"
                >
                    Message
                </button>

            </div>

        ))

    )}

</div>

      <div className="p-3 border-t border-white/10 flex gap-2 items-center">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Reply to story..."
          className="flex-1 bg-white/10 text-white text-sm px-3 py-2 rounded-full outline-none"
        />

        <button
          onClick={handleSend}
          disabled={loading}
          className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

StoryReplies.propTypes = {
  storyId: PropTypes.string.isRequired,
  replies: PropTypes.array,
  onSendReply: PropTypes.func.isRequired,
  currentUser: PropTypes.object,
};

export default StoryReplies;