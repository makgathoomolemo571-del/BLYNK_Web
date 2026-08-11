import React, { useState, useRef } from "react";
import { FaVideo, FaUpload, FaTimes } from "react-icons/fa";
import reelService from "../services/reel.api";

const ReelUpload = ({ onSuccess }) => {
  const fileRef = useRef(null);

  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    if (!selected.type.startsWith("video/")) {
      setError("Only video files allowed");
      return;
    }

    setFile(selected);
    setError("");
  };

  const removeFile = () => {
    setFile(null);
    fileRef.current.value = null;
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Select a video first");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("file", file);
      formData.append("caption", caption);

      const res = await reelService.uploadReel(formData);

      setFile(null);
      setCaption("");

      if (fileRef.current) fileRef.current.value = null;

      if (onSuccess) onSuccess(res);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err.message ||
          "Upload failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <FaVideo className="text-blue-500" />
        <h2 className="font-semibold text-zinc-900 dark:text-white">
          Upload Reel
        </h2>
      </div>

      {error && (
        <div className="text-red-500 text-sm mb-2">{error}</div>
      )}

      <input
        type="file"
        ref={fileRef}
        accept="video/*"
        onChange={handleFileChange}
        className="mb-3 w-full text-sm"
      />

      {file && (
        <div className="flex items-center justify-between bg-zinc-100 dark:bg-zinc-800 p-2 rounded mb-3">
          <span className="text-sm text-zinc-700 dark:text-zinc-200 truncate">
            {file.name}
          </span>

          <button
            onClick={removeFile}
            className="text-red-500"
          >
            <FaTimes />
          </button>
        </div>
      )}

      <textarea
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="Write a caption..."
        className="w-full p-2 rounded border border-zinc-300 dark:border-zinc-700 bg-transparent text-sm mb-3"
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
      >
        <FaUpload />
        {loading ? "Uploading..." : "Upload Reel"}
      </button>
    </div>
  );
};

export default ReelUpload;