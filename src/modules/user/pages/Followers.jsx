import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useFollowers from "../hooks/useFollowers";

import UserCard from "../components/UserCard";

const Followers = () => {
  const navigate = useNavigate();

  const {
    followers,
    loading,
    error,
    loadFollowers,
  } = useFollowers();

  useEffect(() => {
    loadFollowers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-gray-500 text-lg">
          Loading followers...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-red-500">
          {error}
        </span>
      </div>
    );
  }

  if (!followers.length) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-gray-500">
          No followers yet.
        </span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-6">

      <h1 className="text-2xl font-bold mb-6">
        Followers
      </h1>

      <div className="grid gap-4">

        {followers.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onClick={() =>
              navigate(`/profile/${user.id}`)
            }
          />
        ))}

      </div>

    </div>
  );
};

export default Followers;