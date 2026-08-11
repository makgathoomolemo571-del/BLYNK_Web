import React from "react";
import { BellOff } from "lucide-react";

const EmptyNotifications = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6">

      <div className="w-20 h-20 rounded-full bg-blue-50 dark:bg-zinc-800 flex items-center justify-center mb-6">
        <BellOff
          size={42}
          className="text-blue-600 dark:text-blue-400"
        />
      </div>

      <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
        No Notifications
      </h2>

      <p className="mt-2 max-w-md text-center text-sm text-zinc-500 dark:text-zinc-400">
        You're all caught up.
        New likes, comments, follows,
        mentions and system notifications
        will appear here as soon as they arrive.
      </p>

    </div>
  );
};

export default React.memo(EmptyNotifications);