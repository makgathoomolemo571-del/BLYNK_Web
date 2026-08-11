import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import marketplaceApi from "../services/marketplace.api";

const LISTING_TYPES = [
  "creator_service",
  "business_opportunity",
  "sponsorship",
  "collaboration",
  "freelance_service",
  "event_opportunity",
];

const VISIBILITY = [
  "public",
  "members",
  "subscribers",
];

export default function EditMarketplacePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    listingType: "",
    title: "",
    category: "",
    description: "",
    price: "",
    budgetRange: "",
    location: "",
    visibility: "public",
  });

  useEffect(() => {
    loadListing();
  }, [id]);

  async function loadListing() {
    try {
      setLoading(true);

      const { data } = await marketplaceApi.getById(id);

      setForm({
        listingType: data.listingType || "",
        title: data.title || "",
        category: data.category || "",
        description: data.description || "",
        price: data.price ?? "",
        budgetRange: data.budgetRange || "",
        location: data.location || "",
        visibility: data.visibility || "public",
      });
    } catch (err) {
      console.error(err);
      alert("Unable to load marketplace listing.");
      navigate("/marketplace");
    } finally {
      setLoading(false);
    }
  }

  function change(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function save(e) {
    e.preventDefault();

    try {
      setSaving(true);

      await marketplaceApi.update(id, {
        listingType: form.listingType,
        title: form.title,
        category: form.category,
        description: form.description,
        price: Number(form.price || 0),
        budgetRange: form.budgetRange,
        location: form.location,
        visibility: form.visibility,
      });

      navigate(`/marketplace/${id}`);
    } catch (err) {
      console.error(err);
      alert(
        err?.response?.data?.message ||
          "Unable to update listing."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading)
    return (
      <div className="flex justify-center py-20 text-lg">
        Loading...
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">
        Edit Marketplace Listing
      </h1>

      <form
        onSubmit={save}
        className="space-y-6 bg-white rounded-xl shadow p-6"
      >
        <div>
          <label className="block mb-2 font-semibold">
            Listing Type
          </label>

          <select
            name="listingType"
            value={form.listingType}
            onChange={change}
            className="w-full border rounded-lg p-3"
            required
          >
            {LISTING_TYPES.map((type) => (
              <option key={type} value={type}>
                {type.replaceAll("_", " ")}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            Title
          </label>

          <input
            name="title"
            value={form.title}
            onChange={change}
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            Category
          </label>

          <input
            name="category"
            value={form.category}
            onChange={change}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            Description
          </label>

          <textarea
            rows={6}
            name="description"
            value={form.description}
            onChange={change}
            className="w-full border rounded-lg p-3 resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block mb-2 font-semibold">
              Price
            </label>

            <input
              type="number"
              name="price"
              value={form.price}
              onChange={change}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Budget Range
            </label>

            <input
              name="budgetRange"
              value={form.budgetRange}
              onChange={change}
              className="w-full border rounded-lg p-3"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block mb-2 font-semibold">
              Location
            </label>

            <input
              name="location"
              value={form.location}
              onChange={change}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Visibility
            </label>

            <select
              name="visibility"
              value={form.visibility}
              onChange={change}
              className="w-full border rounded-lg p-3"
            >
              {VISIBILITY.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-3 rounded-lg border"
          >
            Cancel
          </button>

          <button
            disabled={saving}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            {saving ? "Saving..." : "Update Listing"}
          </button>
        </div>
      </form>
    </div>
  );
}