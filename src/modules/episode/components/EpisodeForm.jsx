// src/modules/episode/components/EpisodeForm.jsx

import { useState } from "react";

export default function EpisodeForm({
  initialValues = {},
  podcasts = [],
  loading = false,
  onSubmit
}) {

  const [form, setForm] = useState({
     podcast: "",
    seasonNumber: initialValues.seasonNumber || 1,
    episodeNumber: initialValues.episodeNumber || 1,
    title: initialValues.title || "",
    description: initialValues.description || "",
    audio: initialValues.audio || "",
    video: initialValues.video || "",
    visibility: initialValues.visibility || "public",
    status: initialValues.status || "draft",
    publishDate: initialValues.publishDate || ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >

      {/* Podcast */}

      <div>


      </div>

      {/* Season & Episode */}

      <div className="grid grid-cols-2 gap-4">

        <div>
          <label className="block font-medium mb-2">
            Season
          </label>

          <input
            type="number"
            min="1"
            name="seasonNumber"
            value={form.seasonNumber}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">
            Episode #
          </label>

          <input
            type="number"
            min="1"
            name="episodeNumber"
            value={form.episodeNumber}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
            required
          />
        </div>

      </div>

      <div>

        <label className="block font-medium mb-2">
          Episode Title
        </label>

        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-3"
          required
        />

      </div>

      <div>

        <label className="block font-medium mb-2">
          Description
        </label>

        <textarea
          rows={6}
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-3"
        />

      </div>

      <div>

       <div>
  <label className="block font-medium mb-2">
    Upload Audio
  </label>

  <input
    type="file"
    accept="audio/*"
    onChange={(e) =>
      setForm((prev) => ({
        ...prev,
        audio: e.target.files[0],
      }))
    }
    className="w-full border rounded-lg px-4 py-3"
  />
</div>
      </div>

      <div>

        <div>
  <label className="block font-medium mb-2">
    Upload Video (Optional)
  </label>

  <input
    type="file"
    accept="video/*"
    onChange={(e) =>
      setForm((prev) => ({
        ...prev,
        video: e.target.files[0],
      }))
    }
    className="w-full border rounded-lg px-4 py-3"
  />
</div>

      </div>

      <div>

        <label className="block font-medium mb-2">
          Visibility
        </label>

        <select
          name="visibility"
          value={form.visibility}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-3"
        >
          <option value="public">Public</option>
          <option value="followers">Followers</option>
          <option value="subscribers">Subscribers</option>
          <option value="private">Private</option>
        </select>

      </div>

      <div>

        <label className="block font-medium mb-2">
          Status
        </label>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-3"
        >
          <option value="draft">Draft</option>
          <option value="published">Publish Now</option>
          <option value="scheduled">Schedule</option>
        </select>

      </div>

      {form.status === "scheduled" && (
        <div>

          <label className="block font-medium mb-2">
            Publish Date
          </label>

          <input
            type="datetime-local"
            name="publishDate"
            value={form.publishDate}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          />

        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold"
      >
        {loading ? "Saving Episode..." : "Create Episode"}
      </button>

    </form>
  );
}