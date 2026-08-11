// modules/post/components/PostComposer.jsx

import { useCallback, useRef, useState } from "react";
import { FaImage, FaVideo, FaPaperPlane, FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";

import mediaApi from "../../media/services/media.api";
import postApi from "../services/post.api";
import { addPost } from "../store/postSlice";

const MAX_FILES = 10;

export default function PostComposer() {
  const dispatch = useDispatch();

  const inputRef = useRef(null);

  const [caption, setCaption] = useState("");

  const [files, setFiles] = useState([]);

  const [previews, setPreviews] = useState([]);

  const [visibility, setVisibility] = useState("public");

  const [loading, setLoading] = useState(false);

  const pickFiles = () => inputRef.current?.click();

  const onFiles = useCallback((e) => {
    const selected = Array.from(e.target.files || []);

    if (!selected.length) return;

    const merged = [...files, ...selected].slice(0, MAX_FILES);

    setFiles(merged);

    setPreviews(
      merged.map((file) => ({
        file,
        url: URL.createObjectURL(file),
        type: file.type.startsWith("video")
          ? "video"
          : "image",
      }))
    );
  }, [files]);

  const removeFile = (index) => {
    const f = [...files];
    const p = [...previews];

    URL.revokeObjectURL(p[index].url);

    f.splice(index, 1);
    p.splice(index, 1);

    setFiles(f);
    setPreviews(p);
  };

  const createPost = async () => {
    try {
      setLoading(true);

      let media = [];

      for (const file of files) {
        const form = new FormData();

        form.append("file", file);

        form.append(
          "module",
          "post"
        );

        form.append(
          "type",
          file.type.startsWith("video")
            ? "video"
            : "image"
        );

        const uploaded =
          await mediaApi.upload(form);

        media.push({
          url: uploaded.url,
          type: uploaded.type,
          thumbnail:
            uploaded.thumbnail || ""
        });
      }

      const post =
        await postApi.create({
          caption,
          media,
          visibility
        });

      dispatch(addPost(post));

      previews.forEach((x) =>
        URL.revokeObjectURL(x.url)
      );

      setCaption("");
      setFiles([]);
      setPreviews([]);
      setVisibility("public");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 shadow p-5 space-y-5">

      <textarea
        value={caption}
        onChange={(e) =>
          setCaption(e.target.value)
        }
        rows={4}
        maxLength={2200}
        placeholder="What's happening?"
        className="w-full resize-none rounded-xl border p-4 outline-none dark:bg-zinc-950"
      />

      {previews.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

          {previews.map((media, index) => (
            <div
              key={index}
              className="relative rounded-xl overflow-hidden border"
            >
              {media.type === "image" ? (
                <img
                  src={media.url}
                  alt=""
                  className="h-40 w-full object-cover"
                />
              ) : (
                <video
                  src={media.url}
                  controls
                  className="h-40 w-full object-cover"
                />
              )}

              <button
                onClick={() =>
                  removeFile(index)
                }
                className="absolute top-2 right-2 bg-black/70 text-white rounded-full p-2"
              >
                <FaTimes />
              </button>
            </div>
          ))}

        </div>
      )}

      <div className="flex items-center justify-between flex-wrap gap-4">

        <div className="flex items-center gap-3">

          <button
            onClick={pickFiles}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white"
          >
            <FaImage />
            Media
          </button>

          <button
            onClick={pickFiles}
            className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white"
          >
            <FaVideo />
            Video
          </button>

          <select
            value={visibility}
            onChange={(e) =>
              setVisibility(e.target.value)
            }
            className="rounded-lg border px-3 py-2 dark:bg-zinc-950"
          >
            <option value="public">
              Public
            </option>

            <option value="followers">
              Followers
            </option>

            <option value="subscribers">
              Subscribers
            </option>

            <option value="private">
              Private
            </option>
          </select>

        </div>

        <button
          disabled={loading}
          onClick={createPost}
          className="flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white disabled:opacity-60"
        >
          <FaPaperPlane />

          {loading
            ? "Publishing..."
            : "Publish"}
        </button>

      </div>

      <input
        ref={inputRef}
        type="file"
        multiple
        hidden
        accept="image/*,video/*"
        onChange={onFiles}
      />

    </div>
  );
}