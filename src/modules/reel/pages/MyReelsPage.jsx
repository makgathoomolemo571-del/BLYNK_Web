import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReels } from "../store/reelSlice";
import ReelCard from "../components/ReelCard";

const MyReelsPage = () => {
  const dispatch = useDispatch();

  const { reels, loading, error } = useSelector(
    (state) => state.reel
  );

  const [refreshing, setRefreshing] = useState(false);

  const loadReels = useCallback(async () => {
    setRefreshing(true);
    await dispatch(fetchReels());
    setRefreshing(false);
  }, [dispatch]);

  useEffect(() => {
    loadReels();
  }, [loadReels]);

  if (loading && !refreshing) {
    return (
      <div className="p-4 text-center text-gray-500">
        Loading reels...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-black text-white p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">My Reels</h1>

        <button
          onClick={loadReels}
          className="px-3 py-1 text-sm bg-white text-black rounded"
        >
          Refresh
        </button>
      </div>

      {reels?.length === 0 ? (
        <div className="text-center text-gray-400 mt-10">
          No reels uploaded yet
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {reels.map(reel => (
            <ReelCard key={reel.id} reel={reel} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReelsPage;