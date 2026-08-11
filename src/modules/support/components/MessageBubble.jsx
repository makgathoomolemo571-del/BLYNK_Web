import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const MessageBubble = ({
  message,
  isOwn = false,
  sender = "Support",
  createdAt,
  status
}) => {
  return (
    <div
      className={clsx(
        "flex mb-4",
        isOwn ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={clsx(
          "max-w-[75%] rounded-2xl px-4 py-3 shadow",
          isOwn
            ? "bg-blue-600 text-white rounded-br-md"
            : "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white rounded-bl-md"
        )}
      >
        {!isOwn && (
          <p className="text-xs font-semibold mb-1 text-blue-600 dark:text-blue-400">
            {sender}
          </p>
        )}

        <p className="whitespace-pre-wrap break-words text-sm leading-6">
          {message}
        </p>

        <div
          className={clsx(
            "flex items-center justify-between mt-2 gap-3 text-[11px]",
            isOwn
              ? "text-blue-100"
              : "text-zinc-500 dark:text-zinc-400"
          )}
        >
          <span>
            {createdAt &&
              new Date(createdAt).toLocaleString()}
          </span>

          {isOwn && (
            <span className="capitalize">
              {status}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

MessageBubble.propTypes = {
  message: PropTypes.string.isRequired,
  sender: PropTypes.string,
  createdAt: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date)
  ]),
  status: PropTypes.string,
  isOwn: PropTypes.bool
};

export default React.memo(MessageBubble);