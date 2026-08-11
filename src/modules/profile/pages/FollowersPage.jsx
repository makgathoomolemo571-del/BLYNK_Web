// modules/profile/pages/FollowersPage.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFollowers } from "../../social/store/socialActions";
import FollowerCard from "../../social/components/FollowerCard";

const FollowersPage = () => {
  const dispatch = useDispatch();

  const { followers, loading } = useSelector(
    (state) => state.social
  );

  useEffect(() => {
    dispatch(fetchFollowers());
  }, [dispatch]);

  if (loading) return <div>Loading followers...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">
        Followers
      </h1>

      <div className="space-y-3">
        {followers?.map((user) => (
          <FollowerCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default FollowersPage;