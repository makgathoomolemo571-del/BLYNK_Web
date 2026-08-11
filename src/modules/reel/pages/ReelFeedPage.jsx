import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReels } from "../store/reelSlice";
import ReelPlayer from "../components/ReelPlayer";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Film, Info } from "lucide-react";
import { likeReel, unlikeReel } from "../store/reelSlice";
import ReelCard from "../components/ReelCard";

const ReelFeedPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    reels,
    loading,
    error,
    activeReelIndex
  } = useSelector((state) => state.reel);

  useEffect(() => {
    dispatch(fetchReels());
  }, [dispatch]);
console.log(reels);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black text-white">
        Loading reels...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black text-red-500">
        Failed to load reels
      </div>
    );
  }

  return (
  <div className="w-full h-screen bg-black text-white">

    {/* Top Navigation */}
    <div className="sticky top-0 z-50 bg-black/90 backdrop-blur border-b border-gray-800">

      <div className="flex items-center justify-center gap-4 py-3">

        <button
          onClick={() => navigate("/create-reel")}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-pink-600 hover:bg-pink-700 transition"
        >
          <Plus size={18} />
          Create
        </button>

        <button
          onClick={() => navigate("/my-reels")}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800 hover:bg-gray-700 transition"
        >
          <Film size={18} />
          My Reels
        </button>

        <button
          onClick={() => {
            if (!reels.length) return;

            const id = reels[activeReelIndex]?._id || reels[activeReelIndex]?.id;

            navigate(`/reels/${id}`);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800 hover:bg-gray-700 transition"
        >
          <Info size={18} />
          Details
        </button>

      </div>

    </div>

    {/* Feed */}
    <div className="relative w-full h-[calc(100vh-65px)] overflow-hidden">

      {reels?.map((reel, index) => (

        <div
          key={reel._id || reel.id}
          className={`absolute inset-0 transition-opacity duration-300 ${
            index === activeReelIndex
              ? "opacity-100 z-10"
              : "opacity-0 z-0"
          }`}
        >

          <div className="relative w-full h-full">

    <ReelPlayer
    reel={reel}
    autoPlay={index===activeReelIndex}
/>

<ReelCard reel={reel} />

</div>

        </div>

      ))}

    </div>

  </div>
);
};

export default ReelFeedPage;