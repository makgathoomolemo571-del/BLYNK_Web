// modules/profile/pages/FollowingPage.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFollowing } from "../../social/store/socialActions";
import FollowingCard from "../../social/components/FollowingCard";

const FollowingPage = () => {
  const dispatch = useDispatch();

  const { following, loading } = useSelector(
    (state) => state.social
  );

  useEffect(() => {
    dispatch(fetchFollowing());
  }, [dispatch]);

  if (loading) return <div>Loading following...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">
        Following
      </h1>

      <div className="space-y-3">
        {following?.map((user) => (
          <FollowingCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default FollowingPage;