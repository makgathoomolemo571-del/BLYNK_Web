import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { createStory } from "../store/storySlice";
import { FaImage, FaVideo, FaTimes } from "react-icons/fa";

const StoryComposer = () => {
  const dispatch = useDispatch();

  const [media, setMedia] = useState(null);
  const [preview, setPreview] = useState(null);
  const [type, setType] = useState("image");
  const [caption, setCaption] = useState("");
  const fileRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setMedia(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    if (file.type.startsWith("video")) {
      setType("video");
    } else {
      setType("image");
    }
  };

  const clearMedia = () => {
    setMedia(null);
    setPreview(null);
    setType("image");
    if (fileRef.current) fileRef.current.value = null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!media) return;

    const formData = new FormData();
    formData.append("file", media);
    formData.append("type", type);
    formData.append("caption", caption);

    dispatch(createStory(formData));

    setMedia(null);
    setPreview(null);
    setCaption("");
    setType("image");

    if (fileRef.current) fileRef.current.value = null;
  };

  return (
    <div className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4">
      <form onSubmit={handleSubmit} className="space-y-3">

        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Write your story..."
          className="w-full p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white outline-none resize-none"
          rows={3}
        />

        {preview && (
          <div className="relative w-full rounded-lg overflow-hidden">
            {type === "video" ? (
              <video src={preview} controls className="w-full rounded-lg" />
            ) : (
              <img src={preview} alt="preview" className="w-full rounded-lg" />
            )}

            <button
              type="button"
              onClick={clearMedia}
              className="absolute top-2 right-2 bg-black/60 text-white p-2 rounded-full"
            >
              <FaTimes />
            </button>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => fileRef.current.click()}
              className="text-blue-500 hover:text-blue-600"
            >
              <FaImage />
            </button>

            <input
              ref={fileRef}
              type="file"
              accept="image/*,video/*"
              hidden
              onChange={handleFileChange}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Post Story
          </button>
        </div>

      </form>
    </div>
  );
};

export default StoryComposer;