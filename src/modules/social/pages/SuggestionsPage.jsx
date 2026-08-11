// modules/social/pages/SuggestionsPage.jsx
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


import socialApi from "../services/social.api";

const SuggestionsPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState("");

  useEffect(() => {
    loadSuggestions();
  }, []);

  const loadSuggestions = async () => {
    try {
      setLoading(true);

      const { data } = await socialApi.getSuggestions();

      setUsers(Array.isArray(data) ? data : []);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const follow = async (id) => {
    try {
      setProcessing(id);

      await socialApi.follow(id);

      setUsers((prev) =>
        prev.filter((u) => u._id !== id)
      );

    } catch (error) {
      console.error(error);
    } finally {
      setProcessing("");
    }
  };

  const block = async (id) => {
    try {
      setProcessing(id);

      await socialApi.block(id);

      setUsers((prev) =>
        prev.filter((u) => u._id !== id)
      );

    } catch (error) {
      console.error(error);
    } finally {
      setProcessing("");
    }
  };

  const sendFriendRequest = async (id) => {
    try {
      setProcessing(id);

      await socialApi.sendFriendRequest(id);

      setUsers((prev) =>
        prev.map((u) =>
          u._id === id
            ? {
                ...u,
                requestSent: true,
              }
            : u
        )
      );

    } catch (error) {
      console.error(error);
    } finally {
      setProcessing("");
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center">
        Loading suggestions...
      </div>
    );
  }
console.log(users);
  return (
    <div className="max-w-5xl mx-auto p-6">
<div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">

  <button
    onClick={() => navigate("/friends")}
    className="bg-blue-600 text-white rounded-xl py-3 font-semibold"
  >
    Friends
  </button>

  <button
    onClick={() => navigate("/friend-requests")}
    className="bg-green-600 text-white rounded-xl py-3 font-semibold"
  >
    Requests
  </button>

  <button
    onClick={() => navigate("/followers")}
    className="bg-purple-600 text-white rounded-xl py-3 font-semibold"
  >
    Followers
  </button>

  <button
    onClick={() => navigate("/following")}
    className="bg-indigo-600 text-white rounded-xl py-3 font-semibold"
  >
    Following
  </button>

  <button
    onClick={() => navigate("/blocked-users")}
    className="bg-red-600 text-white rounded-xl py-3 font-semibold"
  >
    Blocked
  </button>

</div>
      <h1 className="text-3xl font-bold mb-6">
        Suggested People
      </h1>

      {users.length === 0 && (
        <div className="text-center text-gray-500">
          No suggestions available.
        </div>
      )}

      <div className="grid gap-5">

        {users.map((user) => (

          <div
            key={user._id}
            className="bg-white rounded-xl shadow border p-4 flex justify-between items-center"
          >
    <Link to={`/profile/${user._id || user._id}`}>

       
              <img
                src={
                  user.profilePicture ||
                  "/images/default-avatar.png"
                }
                alt={user.username}
                className="w-16 h-16 rounded-full object-cover"
              />

              <div>

                <h3 className="font-semibold text-lg">
                  {user.username}
                </h3>

                {user.displayName && (
                  <p className="text-gray-500">
                    {user.displayName}
                  </p>
                )}

              </div>

            </Link>

          <div className="flex flex-wrap gap-2">

  {/* FOLLOW */}

  {!user.isFollowing ? (
    <button
      onClick={() => follow(user._id)}
      className="px-4 py-2 rounded bg-blue-600 text-white"
    >
      Follow
    </button>
  ) : (
    <button
      onClick={() => socialApi.unfollow(user.id)}
      className="px-4 py-2 rounded bg-gray-300"
    >
      Following
    </button>
  )}

  {/* FRIEND */}

  {!user.isFriend &&
    !user.requestSent &&
    !user.requestReceived && (

      <button
        onClick={() =>
          sendFriendRequest(user._id)
        }
        className="px-4 py-2 rounded bg-green-600 text-white"
      >
        Add Friend
      </button>

  )}

  {user.requestSent && (

    <button
      onClick={() =>
        socialApi.cancelFriendRequest(user._id)
      }
      className="px-4 py-2 rounded bg-yellow-500 text-white"
    >
      Cancel Request
    </button>

  )}

  {user.requestReceived && (

    <>
      <button
        onClick={() =>
          socialApi.acceptFriendRequest(user.requestId)
        }
        className="px-4 py-2 rounded bg-green-600 text-white"
      >
        Accept
      </button>

      <button
        onClick={() =>
          socialApi.rejectFriendRequest(user.requestId)
        }
        className="px-4 py-2 rounded bg-red-500 text-white"
      >
        Decline
      </button>
    </>

  )}

  {user.isFriend && (

    <button
      onClick={() =>
        socialApi.unfriend(user._id)
      }
      className="px-4 py-2 rounded bg-gray-700 text-white"
    >
      Friends
    </button>

  )}

  {/* BLOCK */}

  {!user.blocked ? (

    <button
      onClick={() => block(user._id)}
      className="px-4 py-2 rounded bg-red-600 text-white"
    >
      Block
    </button>

  ) : (

    <button
      onClick={() =>
        socialApi.unblock(user._id)
      }
      className="px-4 py-2 rounded bg-orange-500 text-white"
    >
      Unblock
    </button>

  )}

</div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default SuggestionsPage;