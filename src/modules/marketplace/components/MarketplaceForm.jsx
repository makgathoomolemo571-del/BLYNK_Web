import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import marketplaceApi from "../services/marketplace.api";

const listingTypes = [
  "product",
  "service",
];

const visibilityOptions = [
  "public",
  "members",
  "subscribers",
];

export default function MarketplaceForm({

  marketplace = null,
  isEdit = false,

}) {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({

    listingType: "creator_service",

    title: "",

    category: "",

    description: "",

    price: "",

    location: "",

    visibility: "public"

  });

  useEffect(() => {

    if (!marketplace) return;

    setForm({

      listingType:
        marketplace.listingType,

      title:
        marketplace.title,

      category:
        marketplace.category || "",

      description:
        marketplace.description || "",

      price:
        marketplace.price || "",

      location:
        marketplace.location || "",

      visibility:
        marketplace.visibility || "public"

    });

  }, [marketplace]);

  const change = (e) => {

    setForm({

      ...form,

      [e.target.name]:
      e.target.value

    });

  };

  const validate = () => {

    const err = {};

    if (!form.title.trim())
      err.title = "Title required";

    if (!form.listingType)
      err.listingType = "Listing type required";

    if (!form.description.trim())
      err.description = "Description required";

    setErrors(err);

    return Object.keys(err).length === 0;

  };

  const submit = async (e) => {

    e.preventDefault();

    if (!validate()) return;

    try {

      setLoading(true);

      if (isEdit) {

        await marketplaceApi.update(
          marketplace.id,
          form
        );

      } else {

        await marketplaceApi.create(
          form
        );

      }

      navigate("/marketplace");

    }

    catch (err) {

      console.error(err);

      alert(

        err?.response?.data?.message ||

        "Unable to save marketplace"

      );

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <form
      onSubmit={submit}
      className="space-y-5"
    >

      <div>

        <label>

          Listing Type

        </label>

        <select

          name="listingType"

          value={form.listingType}

          onChange={change}

        >

          {

            listingTypes.map(type => (

              <option
                key={type}
                value={type}
              >

                {type.replaceAll("_", " ")}

              </option>

            ))

          }

        </select>

      </div>

      <div>

        <label>

          Title

        </label>

        <input

          name="title"

          value={form.title}

          onChange={change}

        />

        {

          errors.title &&

          <small>

            {errors.title}

          </small>

        }

      </div>

      <div>

        <label>

          Category

        </label>

        <input

          name="category"

          value={form.category}

          onChange={change}

        />

      </div>

      <div>

        <label>

          Description

        </label>

        <textarea

          rows={6}

          name="description"

          value={form.description}

          onChange={change}

        />

      </div>

      <div>

        <label>

          Price

        </label>

        <input

          type="number"

          name="price"

          value={form.price}

          onChange={change}

        />

      </div>

      <div>

        

      </div>

      <div>

        <label>

          Location

        </label>

        <input

          name="location"

          value={form.location}

          onChange={change}

        />

      </div>

      <div>

        <label>

          Visibility

        </label>

        <select

          name="visibility"

          value={form.visibility}

          onChange={change}

        >

          {

            visibilityOptions.map(option => (

              <option

                key={option}

                value={option}

              >

                {option}

              </option>

            ))

          }

        </select>

      </div>

      <button

        disabled={loading}

        type="submit"

      >

        {

          loading

          ? "Saving..."

          : isEdit

          ? "Update Listing"

          : "Create Listing"

        }

      </button>

    </form>

  );

}