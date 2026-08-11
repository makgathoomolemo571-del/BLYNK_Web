import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStories } from "../store/storySlice";
import StoryCard from "../components/StoryCard";
import { useNavigate } from "react-router-dom";
import storyAPI from "../services/story.api";
import { Plus } from "lucide-react";

const StoryFeedPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { stories, loading, error } = useSelector((state) => state.story);

  // Change this if your user is stored elsewhere
  const user = useSelector((state) => state.auth?.user);

  useEffect(() => {
    dispatch(fetchStories());
  }, [dispatch]);

  const handleView = async(id)=>{
    await storyAPI.viewStory(id);

    dispatch(fetchStories());
};

  const handleReact = async (id) => {
    try {
      // This function must exist in story.api.js
      await storyAPI.reactStory(id);

dispatch(fetchStories());
    } catch (err) {
      console.error(err);
    }
  };

  const handleReply=(id)=>{

    navigate(`/stories/${id}/reply`);

};

  const handleOpen = (id) => {
    console.log("NAVIGATING TO:", id);

    navigate(`/stories/${id}`);
};

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-10 text-gray-500">
        Loading stories...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex justify-center items-center py-10 text-red-500">
        {error}
      </div>
    );
  }
console.log(stories);
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-zinc-900 dark:text-white">
          Stories
        </h1>

        <button
          onClick={() => navigate("/stories/create")}
          className="flex items-center gap-2 px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 transition"
        >
          <Plus size={18} />
          Create Story
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {stories?.length > 0 ? (
          stories
            .filter(Boolean)
            .map((story) => (
              <StoryCard
                key={story.id || story._id}
                story={story}
                currentUserId={user?._id || user?.id}
                onView={handleView}
                onReact={handleReact}
                onReply={handleReply}
                onOpen={handleOpen}
              />
            ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No stories available
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryFeedPage;