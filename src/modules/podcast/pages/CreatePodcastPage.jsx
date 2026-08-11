import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUpload, FiImage } from "react-icons/fi";
import podcastApi from "../services/podcast.api";
import { useParams } from "react-router-dom";
import { useEffect } from "react";




const categories = [
  "General",
  "Business",
  "Technology",
  "Comedy",
  "Sports",
  "Education",
  "Music",
  "Gaming",
  "News",
  "Lifestyle",
  "Health",
  "Finance"
];

const visibilities = [
  "public",
  "followers",
  "subscribers",
  "private"
];

export default function CreatePodcastPage() {
const [podcasts, setPodcasts] = useState([]);

  const navigate = useNavigate();
const { podcastId } = useParams();
  const [loading, setLoading] = useState(false);

const [form, setForm] = useState({
  name: "",
  description: "",
  category: "General",
  visibility: "public",
  coverImage: ""
});

const formData = new FormData();

formData.append("name", form.name);
formData.append("description", form.description);
formData.append("category", form.category);
formData.append("visibility", form.visibility);

if (form.coverImage) {
    formData.append("coverImage", form.coverImage);
}

useEffect(() => {
    loadPodcasts();
}, []);

const loadPodcasts = async () => {
  try {
    const data = await podcastApi.getMine();

    console.log("My podcasts:", data);

    setPodcasts(data || []);
  } catch (err) {
    console.error("Failed to load podcasts", err);
    setPodcasts([]);
  }
};

const deletePodcast = async (id) => {
  if (!window.confirm("Delete this podcast?")) return;

  try {
    await podcastApi.remove(id);

    // Remove it from the screen immediately
    setPodcasts((prev) =>
      prev.filter((podcast) => podcast.id !== id)
    );

  } catch (err) {
    alert(
      err?.response?.data?.message ||
      "Unable to delete podcast."
    );
  }
};

  const handleChange = (e) => {

    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!form.name.trim()) {
      return alert("Podcast name is required");
    }

    try {
  setLoading(true);

const podcast = await podcastApi.create(formData);
console.log(podcast);

 navigate(`/podcasts/${podcast.id}/episodes/create`);
 
} catch (err) {
  alert(
    err?.response?.data?.message ||
    "Unable to create podcast."
  );


    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="max-w-4xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-8">
        Create Podcast
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white rounded-2xl shadow p-8"
      >

        <div>

          <label className="font-semibold block mb-2">
            Podcast Name
          </label>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            maxLength={120}
            required
            className="w-full border rounded-xl p-3"
          />

        </div>

        <div>

          <label className="font-semibold block mb-2">
            Description
          </label>

          <textarea
            rows={5}
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded-xl p-3 resize-none"
          />

        </div>

        <div className="grid grid-cols-2 gap-6">

          <div>

            <label className="font-semibold block mb-2">
              Category
            </label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
            >

              {categories.map((category) => (

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

            <label className="font-semibold block mb-2">
              Visibility
            </label>

            <select
              name="visibility"
              value={form.visibility}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
            >

              {visibilities.map((visibility) => (

                <option
                  key={visibility}
                  value={visibility}
                >
                  {visibility}
                </option>

              ))}

            </select>

          </div>

        </div>

        <div>

          <label className="font-semibold block mb-2">
            Cover Image 
          </label>

          <div className="flex">

            <span className="border rounded-l-xl px-4 flex items-center bg-gray-100">
              <FiImage />
            </span>

           <input
  type="file"
  accept="image/*"
  onChange={(e) =>
    setForm({
      ...form,
      coverImage: e.target.files[0]
    })
  }
  className="w-full border rounded-xl p-3"
/>

          </div>

        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white rounded-xl py-4 font-semibold flex justify-center items-center gap-3"
        >

          <FiUpload />

          {loading
            ? "Creating Podcast..."
            : "Create Podcast"}

        </button>

      </form>
<div className="mt-10">

    <h2 className="text-2xl font-bold mb-6">
        My Podcasts
    </h2>

    {podcasts.length === 0 ? (

        <div className="text-gray-500">
            No podcasts created yet.
        </div>

    ) : (

        <div className="grid md:grid-cols-2 gap-6">

            {podcasts.map((podcast) => (

                <div
                    key={podcast.id}
                    className="border rounded-2xl p-5 shadow"
                >

                    <img
                        src={
                            podcast.coverImage ||
                            "/images/podcast-placeholder.png"
                        }
                        className="w-full h-48 object-cover rounded-xl mb-4"
                        alt={podcast.name}
                    />

                    <h3 className="text-xl font-bold">
                        {podcast.name}
                    </h3>

                    <p className="text-gray-600">
                        {podcast.description}
                    </p>

                    <div className="flex gap-2 mt-5">

                        <button
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                            onClick={() =>
                                navigate(
                                    `/podcasts/${podcast.id}/episodes/create`
                                )
                            }
                        >
                            🎙 Add Episode
                        </button>

                        <button
                            className="bg-yellow-500 text-white px-4 py-2 rounded"
                            onClick={() =>
                                navigate(
                                    `/podcasts/${podcast.id}/edit`
                                )
                            }
                        >
                            Edit
                        </button>

                        <button
                            className="bg-green-600 text-white px-4 py-2 rounded"
                            onClick={() =>
                                navigate(
                                    `/podcasts/${podcast.id}`
                                )
                            }
                        >
                            View
                        </button>
<button
            onClick={() =>
              deletePodcast(podcast.id)
            }
            className="bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Delete
          </button>

                    </div>

                </div>

            ))}

        </div>

    )}

</div>

    </div>

  );

}