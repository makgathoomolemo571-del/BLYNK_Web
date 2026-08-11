import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import marketplaceApi from "../services/marketplace.api";

const LISTING_TYPES = [
  {
    value: "product",
    label: "Product",
  },
  {
    value: "service",
    label: "Service",
  },
];

const PRODUCT_CATEGORIES = [
  "Electronics",
  "Fashion",
  "Beauty & Cosmetics",
  "Food & Beverages",
  "Furniture",
  "Home & Garden",
  "Automotive",
  "Sports",
  "Books",
  "Pets",
  "Agriculture",
  "Other",
];

const SERVICE_CATEGORIES = [
  "Graphic Design",
  "Photography",
  "Videography",
  "Marketing",
  "Software Development",
  "Web Design",
  "Cleaning",
  "Plumbing",
  "Electrical",
  "Beauty",
  "Tutoring",
  "Legal",
  "Accounting",
  "Consulting",
  "Transport",
  "Construction",
  "Other",
];



const VISIBILITY = [
  "public",
  "members",
  "subscribers",
];

export default function CreateMarketplacePage() {

  const navigate = useNavigate();
  const [myListings, setMyListings] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

const [form, setForm] = useState({
    listingType: "product",
    title: "",
    category: "Electronics",
    description: "",
    price: "",
    condition: "new",
    stock: 1,
    location: "",
    visibility: "public",
    images: [],
    sellerName: "",
  sellerType: "business",
  phone: "",
  email: "",
  whatsapp: "",
  });

  const loadMyListings = async () => {
  try {
    const data = await marketplaceApi.getMyMarketplace();

    setMyListings(data || []);
  } catch (err) {
    console.error(err);
  }
};

useEffect(() => {
  loadMyListings();
}, []);

const deleteListing = async (id) => {
  if (!window.confirm("Delete this listing?")) return;

  try {
    await marketplaceApi.remove(id);

    setMyListings((prev) =>
      prev.filter((item) => item.id !== id)
    );
  } catch (err) {
    alert(
      err?.response?.data?.message ||
      "Unable to delete listing."
    );
  }
};

  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  const submit = async (e) => {

    e.preventDefault();

    setError("");

    try {

      setLoading(true);

      const payload = {

        listingType: form.listingType,

        title: form.title.trim(),

        category: form.category.trim(),

        description: form.description.trim(),

        price: form.price
          ? Number(form.price)
          : undefined,

           stock: 1,

       condition: form.condition,

        location: form.location.trim(),

        visibility: form.visibility,

        sellerName: form.sellerName.trim(),
  sellerType: form.sellerType,
  phone: form.phone.trim(),
  whatsapp: form.whatsapp.trim(),
  email: form.email.trim(),

      };

      

      await marketplaceApi.createMarketplace(payload);

setForm({
  listingType: "product",
  title: "",
  category: "Electronics",
  description: "",
  price: "",
  condition: "new",
  stock: 1,
  location: "",
  visibility: "public",
  images: [],
  sellerName: "",
  sellerType: "business",
  phone: "",
  email: "",
  whatsapp: "",
});

await loadMyListings();
      

    } catch (err) {

      setError(
        err?.response?.data?.message ||
        "Unable to create marketplace listing."
      );

    } finally {

      setLoading(false);

    }

  };

  const categories =
  form.listingType === "product"
    ? PRODUCT_CATEGORIES
    : SERVICE_CATEGORIES;



  return (

    <div className="max-w-5xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-8">
        Create Marketplace Listing
      </h1>

      {error && (

        <div className="mb-6 rounded-lg bg-red-100 border border-red-300 text-red-700 p-4">
          {error}
        </div>

      )}

      <form
        onSubmit={submit}
        className="space-y-6"
      >

        <div>

          <label className="block mb-2 font-semibold">
            Listing Type
          </label>

          <select
            name="listingType"
            value={form.listingType}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >

            {LISTING_TYPES.map((type) => (

              <option
                key={type.value}
                value={type.value}
              >
                {type.label}
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
            required
            value={form.title}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

        </div>

       <div>
  <label className="block mb-2 font-semibold">
    Category
  </label>

  <select
  name="category"
  value={form.category}
  onChange={handleChange}
  className="w-full border rounded-lg p-3"
  required
>
  <option value="">Select Category</option>

  {categories.map((category) => (
    <option key={category} value={category}>
      {category}
    </option>
  ))}
</select>
</div>

        <div>

          <label className="block mb-2 font-semibold">
            Description
          </label>

          <textarea
            rows={6}
            required
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

        </div>

        <div className="grid md:grid-cols-2 gap-5">

          <div>

            <label className="block mb-2 font-semibold">
              Price
            </label>

            <input
              type="number"
              min="0"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

          </div>

          {form.listingType === "product" && (
  <div>
    <label className="block mb-2 font-semibold">
      Condition
    </label>

    <select
      name="condition"
      value={form.condition}
      onChange={handleChange}
      className="w-full border rounded-lg p-3"
    >
      <option value="new">New</option>
      <option value="used">Used</option>
      <option value="refurbished">Refurbished</option>
    </select>
  </div>
)}

          <input
  type="file"
  multiple
  accept="image/*"
  onChange={(e) =>
    setForm((prev) => ({
      ...prev,
      images: [...e.target.files],
    }))
  }
/>

<div>
  <label className="block mb-2 font-semibold">
    Stock Quantity
  </label>

  <input
    type="number"
    min="1"
    name="stock"
    value={form.stock}
    onChange={handleChange}
    className="w-full border rounded-lg p-3"
  />
</div>

        </div>

        <div className="grid md:grid-cols-2 gap-5">

          <div>

            <label className="block mb-2 font-semibold">
              Location
            </label>

            <input
              name="location"
              value={form.location}
              onChange={handleChange}
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
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >

              {VISIBILITY.map((item) => (

                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>

              ))}

            </select>

          </div>

          <div className="border rounded-xl p-6 space-y-5">

  <h2 className="text-xl font-bold">
    Seller Information
  </h2>

  <div className="grid md:grid-cols-2 gap-5">

    <div>
      <label className="block mb-2 font-semibold">
        Seller / Business Name
      </label>

      <input
        name="sellerName"
        value={form.sellerName}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        placeholder="e.g. Makomo Electronics"
        required
      />
    </div>

    <div>
      <label className="block mb-2 font-semibold">
        Seller Type
      </label>

      <select
        name="sellerType"
        value={form.sellerType}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      >
        <option value="business">Business</option>
        <option value="creator">Creator</option>
      </select>
    </div>

    <div>
      <label className="block mb-2 font-semibold">
        Phone Number
      </label>

      <input
        name="phone"
        value={form.phone}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        placeholder="+27..."
      />
    </div>

    <div>
      <label className="block mb-2 font-semibold">
        WhatsApp Number
      </label>

      <input
        name="whatsapp"
        value={form.whatsapp}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        placeholder="+27..."
      />
    </div>

    <div className="md:col-span-2">
      <label className="block mb-2 font-semibold">
        Contact Email
      </label>

      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        placeholder="seller@email.com"
      />
    </div>

  </div>

</div>

        </div>

        <button
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-8 py-3 font-semibold"
        >
          {loading
            ? "Creating..."
            : "Create Marketplace"}
        </button>

      </form>
<div className="mt-12">

  <h2 className="text-2xl font-bold mb-6">
    My Marketplace Listings
  </h2>

  {myListings.length === 0 ? (

    <div className="border rounded-xl p-8 text-center text-gray-500">
      No listings found.
    </div>

  ) : (

    <div className="grid md:grid-cols-2 gap-6">

      {myListings.map((listing) => (

        <div
          key={listing.id}
          className="border rounded-2xl p-5 shadow"
        >

          <img
            src={
              listing.images?.[0] ||
              "/images/placeholder.png"
            }
            alt={listing.title}
            className="w-full h-48 object-cover rounded-xl mb-4"
          />

          <h3 className="text-xl font-bold">
            {listing.title}
          </h3>

          <p className="text-gray-600">
            {listing.description}
          </p>

          <p className="mt-2 font-semibold">
            R {listing.price}
          </p>

          <div className="flex gap-2 mt-5">

            <Link
              to={`/marketplace/${listing.id}`}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              View
            </Link>

            <Link
              to={`/marketplace/edit/${listing.id}`}
              className="bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Edit
            </Link>

            <button
              onClick={() => deleteListing(listing.id)}
              className="bg-red-600 text-white px-4 py-2 rounded"
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