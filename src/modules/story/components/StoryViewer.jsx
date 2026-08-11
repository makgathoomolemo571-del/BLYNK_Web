import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import storyAPI from "../services/story.api";

const StoryProgress = ({ duration }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);

    const interval = 50;
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          return 100;
        }
        return p + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [duration]);

  return (
    <div className="h-1 bg-zinc-700">
      <div
        className="h-full bg-white"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

StoryProgress.propTypes = {
  duration: PropTypes.number.isRequired,
};

export default function StoryViewer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [stories, setStories] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    loadStories();
  }, []);

  const loadStories = async () => {
    try {
      const res = await storyAPI.getFeedStories();

      const list =
        res.data ||
        res.stories ||
        res ||
        [];

      setStories(list);

      const i = list.findIndex(
        (s) => (s.id || s._id) === id
      );

      setIndex(i === -1 ? 0 : i);
    } catch (err) {
      console.error(err);
    }
  };

  const currentStory = stories[index];

  useEffect(() => {
    if (!currentStory) return;

    storyAPI.viewStory(currentStory.id || currentStory._id);

    const timer = setTimeout(() => {
      nextStory();
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentStory]);

  const nextStory = () => {
    if (index < stories.length - 1) {
      setIndex(index + 1);
    } else {
      navigate("/stories");
    }
  };

  const prevStory = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  if (!currentStory) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black z-50 flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="flex justify-between items-center p-4 text-white">
          <div className="flex items-center gap-3">
            <img
              src={currentStory.creator?.profilePicture}
              className="w-10 h-10 rounded-full"
            />

            <div>
              <div className="font-bold">
                {currentStory.creator?.username}
              </div>

              <div className="text-xs">
                {currentStory.caption}
              </div>
            </div>
          </div>

          <button onClick={() => navigate("/stories")}>
            <FaTimes size={22} />
          </button>
        </div>

        <StoryProgress duration={5000} />

        <div className="flex-1 flex justify-center items-center relative">

          {currentStory.type === "image" && (
            <img
              src={currentStory.media?.url}
              className="max-h-full"
            />
          )}

          {currentStory.type === "video" && (
            <video
              src={currentStory.media?.url}
              autoPlay
              controls
              className="max-h-full"
            />
          )}

          {currentStory.type === "text" && (
            <h1 className="text-white text-3xl">
              {currentStory.caption}
            </h1>
          )}

          <button
            className="absolute left-4 text-white"
            onClick={prevStory}
          >
            <FaChevronLeft size={30} />
          </button>

          <button
            className="absolute right-4 text-white"
            onClick={nextStory}
          >
            <FaChevronRight size={30} />
          </button>

        </div>

<div className="absolute bottom-6 left-0 right-0 flex justify-center gap-10">

<button
onClick={async()=>{

await storyAPI.reactStory(currentStory.id);

loadStories();

}}
>
❤️ {currentStory.stats?.reactions || 0}
</button>

<button
onClick={()=>navigate(`/stories/${currentStory.id}/reply`)}
>
💬 {currentStory.stats?.replies || 0}
</button>



</div>

      </motion.div>
    </AnimatePresence>
  );
}