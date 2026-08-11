import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createStory } from "../store/storySlice";
import { toast } from "react-toastify";

const CreateStoryPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    type: "text",
    caption: "",
    media: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setForm((prev) => ({
      ...prev,
      media: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (form.type !== "text" && !form.media) {
        toast.error("Media file is required for this story type");
        return;
      }

      const payload = new FormData();
      payload.append("type", form.type);
      payload.append("caption", form.caption);

      if (form.media) {
        payload.append("file", form.media);
      }

      await dispatch(createStory(payload)).unwrap();

      toast.success("Story created successfully");

      navigate("/stories");
    } catch (err) {
      toast.error(err?.message || "Failed to create story");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white px-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h1 className="text-xl font-semibold mb-4">Create Story</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-zinc-400">Story Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full mt-1 bg-zinc-800 border border-zinc-700 rounded-lg p-2"
            >
              <option value="text">Text</option>
              <option value="image">Image</option>
              <option value="video">Video</option>
              <option value="link">Link</option>
              <option value="reel-share">Reel Share</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-zinc-400">Caption</label>
            <textarea
              name="caption"
              value={form.caption}
              onChange={handleChange}
              className="w-full mt-1 bg-zinc-800 border border-zinc-700 rounded-lg p-2"
              rows={3}
            />
          </div>

          {form.type !== "text" && (
            <div>
              <label className="text-sm text-zinc-400">Media</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full mt-1 text-sm"
                accept="image/*,video/*"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg p-2"
          >
            {loading ? "Publishing..." : "Create Story"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateStoryPage;