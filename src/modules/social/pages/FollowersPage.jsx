// modules/social/pages/FollowersPage.jsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getFollowers } from "../store/socialActions";
import {
  selectFollowers,
  selectFollowersLoading,
  selectFollowersError
} from "../store/socialSelectors";

import FollowerCard from "../components/FollowerCard";

const FollowersPage = () => {

  const dispatch = useDispatch();

  const followers =
    useSelector(selectFollowers);

  const loading =
    useSelector(selectFollowersLoading);

  const error =
    useSelector(selectFollowersError);

  useEffect(() => {

    dispatch(
      getFollowers()
    );

  }, [dispatch]);

  if (loading) {

    return (
      <div className="flex justify-center items-center h-96 text-lg">
        Loading followers...
      </div>
    );

  }

  if (error) {

    return (
      <div className="flex justify-center items-center h-96 text-red-500">
        {error}
      </div>
    );

  }

  return (

    <div className="max-w-5xl mx-auto py-6">

      <h1 className="text-3xl font-bold mb-6">
        Followers
      </h1>

      {

        followers.length === 0 ? (

          <div className="text-center text-gray-500">

            No followers found.

          </div>

        ) : (

          <div className="grid gap-4">

            {

              followers.map((user) => (
  <FollowerCard
    key={user._id}
    user={user}
  />
))

            }

          </div>

        )

      }

    </div>

  );

};

export default FollowersPage;