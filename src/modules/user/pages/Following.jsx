import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useFollowing } from "../hooks";
import UserAvatar from "../../user/components/UserAvatar";

const Following = () => {
  const {
    following,
    loading,
    error,
    fetchFollowing,
  } = useFollowing();

  useEffect(() => {
    fetchFollowing();
  }, [fetchFollowing]);

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <span className="text-gray-500">
          Loading following...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-red-600">
        {error}
      </div>
    );
  }

  if (!following.length) {
    return (
      <div className="text-center py-12 text-gray-500">
        You aren't following anyone yet.
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {following.map((user) => (
        <div
          key={user.id}
          className="flex items-center justify-between bg-white dark:bg-zinc-900 rounded-xl shadow border border-zinc-200 dark:border-zinc-800 p-4"
        >
          <div className="flex items-center gap-4">

            <UserAvatar
              src={user.profilePicture}
              alt={user.username}
              size={60}
            />

            <div>

              <h3 className="font-semibold text-zinc-900 dark:text-white">
                {user.username}
              </h3>

              <p className="text-sm text-zinc-500">
                @{user.username}
              </p>

            </div>

          </div>

          <Link
            to={`/profile/${user.id}`}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm transition"
          >
            View Profile
          </Link>

        </div>
      ))}
    </div>
  );
};

export default Following;