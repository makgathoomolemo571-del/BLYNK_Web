import { useState } from "react";
import reelApi from "../services/reel.api";

export default function CreateReelPage() {
  const [videoFile, setVideoFile] = useState(null);

  const [form, setForm] = useState({
    caption: "",
    video: "",
    visibility: "public",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();

    formData.append("caption", form.caption);
    formData.append("visibility", form.visibility);

    if (videoFile) {
      formData.append("file", videoFile);
    }

    const result = await reelApi.createReel(formData);

    console.log(result);

    alert("Reel created!");

    setForm({
      caption: "",
      video: "",
      visibility: "public",
    });

    setVideoFile(null);

  } catch (err) {
    console.error(err);

    alert(
      err.response?.data?.message ||
      "Failed to create reel"
    );
  }
};

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Reel</h2>

      <input
        name="caption"
        placeholder="Caption"
        value={form.caption}
        onChange={handleChange}
      />

     <input
  type="file"
  accept="video/*"
  capture="environment"
  onChange={(e) => setVideoFile(e.target.files[0])}
/>
      <select
        name="visibility"
        value={form.visibility}
        onChange={handleChange}
      >
        <option value="public">Public</option>
        <option value="followers">Followers</option>
        <option value="private">Private</option>
      </select>

      <button type="submit">
        Create Reel
      </button>
    </form>
  );
}