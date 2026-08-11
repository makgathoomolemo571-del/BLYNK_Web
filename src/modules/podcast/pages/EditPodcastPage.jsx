// modules/podcast/pages/EditPodcastPage.jsx

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import podcastApi from "../services/podcast.api";

const VISIBILITY = [
  "public",
  "followers",
  "subscribers",
  "private"
];

const CATEGORIES = [
  "General",
  "Business",
  "Technology",
  "Education",
  "Comedy",
  "Music",
  "Sports",
  "Health",
  "News",
  "Lifestyle"
];

export default function EditPodcastPage() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [form, setForm] = useState({

    name: "",

    description: "",

    category: "General",

    coverImage: "",

    visibility: "public"

  });

  useEffect(() => {

    loadPodcast();

  }, [id]);

  async function loadPodcast() {

    try {

      setLoading(true);

      const podcast =
        await podcastApi.getById(id);

      setForm({

        name:
          podcast.name || "",

        description:
          podcast.description || "",

        category:
          podcast.category || "General",

        coverImage:
          podcast.coverImage || "",

        visibility:
          podcast.visibility || "public"

      });

    } catch (err) {

      setError(

        err.response?.data?.message ||

        err.message ||

        "Unable to load podcast"

      );

    } finally {

      setLoading(false);

    }

  }

  function change(e) {

    setForm(prev => ({

      ...prev,

      [e.target.name]: e.target.value

    }));

  }

  async function submit(e) {

    e.preventDefault();

    try {

      setSaving(true);

      setError("");

      await podcastApi.update(

        id,

        form

      );

      navigate(`/podcasts/${id}`);

    } catch (err) {

      setError(

        err.response?.data?.message ||

        err.message ||

        "Unable to update podcast"

      );

    } finally {

      setSaving(false);

    }

  }

  if (loading)

    return (

      <div className="flex justify-center p-10">

        Loading...

      </div>

    );

  return (

    <div className="max-w-4xl mx-auto p-6">

      <div className="bg-white rounded-xl shadow border p-6">

        <h1 className="text-2xl font-bold mb-6">

          Edit Podcast

        </h1>

        {error && (

          <div className="mb-5 rounded bg-red-100 text-red-700 p-3">

            {error}

          </div>

        )}

        <form
          onSubmit={submit}
          className="space-y-5"
        >

          <div>

            <label className="block mb-2 font-medium">

              Podcast Name

            </label>

            <input

              type="text"

              name="name"

              value={form.name}

              onChange={change}

              required

              className="w-full border rounded-lg p-3"

            />

          </div>

          <div>

            <label className="block mb-2 font-medium">

              Description

            </label>

            <textarea

              rows={6}

              name="description"

              value={form.description}

              onChange={change}

              className="w-full border rounded-lg p-3"

            />

          </div>

          <div>

            <label className="block mb-2 font-medium">

              Category

            </label>

            <select

              name="category"

              value={form.category}

              onChange={change}

              className="w-full border rounded-lg p-3"

            >

              {CATEGORIES.map(category => (

                <option

                  key={category}

                  value={category}

                >

                  {category}

                </option>

              ))}

            </select>

          </div>

          <div>

            <label className="block mb-2 font-medium">

              Cover Image

            </label>

            <input

              type="text"

              name="coverImage"

              value={form.coverImage}

              onChange={change}

              placeholder="https://..."

              className="w-full border rounded-lg p-3"

            />

          </div>

          <div>

            <label className="block mb-2 font-medium">

              Visibility

            </label>

            <select

              name="visibility"

              value={form.visibility}

              onChange={change}

              className="w-full border rounded-lg p-3"

            >

              {VISIBILITY.map(level => (

                <option

                  key={level}

                  value={level}

                >

                  {level}

                </option>

              ))}

            </select>

          </div>

          <div className="flex gap-3">

            <button

              disabled={saving}

              type="submit"

              className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"

            >

              {saving

                ? "Saving..."

                : "Update Podcast"}

            </button>

            <button

              type="button"

              onClick={() => navigate(-1)}

              className="px-6 py-3 rounded-lg border"

            >

              Cancel

            </button>

          </div>

        </form>

      </div>

    </div>

  );

}