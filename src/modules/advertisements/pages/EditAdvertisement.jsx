import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import advertisementApi from "../services/advertisement.api";

export default function EditAdvertisement() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({

    title: "",

    description: "",

    media: "",

    type: "image",

    budget: 0,

    targetAudience: {

      ageMin: 18,

      ageMax: 65,

      countries: [],

      interests: [],

      gender: ""

    }

  });

  useEffect(() => {

    loadAdvertisement();

  }, []);

  async function loadAdvertisement() {

    try {

      const ads = await advertisementApi.getAll();

      const ad = ads.find(x => x.id === id);

      if (!ad) {

        navigate("/advertisements");

        return;

      }

      setForm({

        title: ad.title,

        description: ad.description || "",

        media: ad.media,

        type: ad.type,

        budget: ad.budget,

        targetAudience: {

          ageMin: ad.targetAudience?.ageMin || 18,

          ageMax: ad.targetAudience?.ageMax || 65,

          countries: ad.targetAudience?.countries || [],

          interests: ad.targetAudience?.interests || [],

          gender: ad.targetAudience?.gender || ""

        }

      });

    } catch (err) {

      console.error(err);

    }

    setLoading(false);

  }

  function change(e) {

    setForm({

      ...form,

      [e.target.name]: e.target.value

    });

  }

  async function submit(e) {

    e.preventDefault();

    try {

      setSaving(true);

      await advertisementApi.update(id, form);

      navigate("/advertisements");

    } catch (err) {

      console.error(err);

    }

    setSaving(false);

  }

  if (loading)

    return <div className="p-8">Loading...</div>;

  return (

    <div className="max-w-4xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-8">

        Edit Advertisement

      </h1>

      <form
        onSubmit={submit}
        className="space-y-6"
      >

        <div>

          <label>Title</label>

          <input

            className="w-full border rounded-lg p-3"

            name="title"

            value={form.title}

            onChange={change}

          />

        </div>

        <div>

          <label>Description</label>

          <textarea

            className="w-full border rounded-lg p-3"

            rows="5"

            name="description"

            value={form.description}

            onChange={change}

          />

        </div>

        <div>

          <label>Media URL</label>

          <input

            className="w-full border rounded-lg p-3"

            name="media"

            value={form.media}

            onChange={change}

          />

        </div>

        <div className="grid grid-cols-2 gap-5">

          <div>

            <label>Advertisement Type</label>

            <select

              className="w-full border rounded-lg p-3"

              name="type"

              value={form.type}

              onChange={change}

            >

              <option value="image">

                Image

              </option>

              <option value="video">

                Video

              </option>

              <option value="carousel">

                Carousel

              </option>

            </select>

          </div>

          <div>

            <label>Budget</label>

            <input

              type="number"

              className="w-full border rounded-lg p-3"

              name="budget"

              value={form.budget}

              onChange={change}

            />

          </div>

        </div>

        <h3 className="text-xl font-semibold">

          Target Audience

        </h3>

        <div className="grid grid-cols-2 gap-5">

          <input

            type="number"

            placeholder="Minimum Age"

            value={form.targetAudience.ageMin}

            onChange={(e)=>setForm({

              ...form,

              targetAudience:{

                ...form.targetAudience,

                ageMin:e.target.value

              }

            })}

            className="border rounded-lg p-3"

          />

          <input

            type="number"

            placeholder="Maximum Age"

            value={form.targetAudience.ageMax}

            onChange={(e)=>setForm({

              ...form,

              targetAudience:{

                ...form.targetAudience,

                ageMax:e.target.value

              }

            })}

            className="border rounded-lg p-3"

          />

        </div>

        <input

          className="w-full border rounded-lg p-3 mt-5"

          placeholder="Countries (comma separated)"

          value={form.targetAudience.countries.join(",")}

          onChange={(e)=>setForm({

            ...form,

            targetAudience:{

              ...form.targetAudience,

              countries:e.target.value.split(",")

            }

          })}

        />

        <input

          className="w-full border rounded-lg p-3 mt-5"

          placeholder="Interests (comma separated)"

          value={form.targetAudience.interests.join(",")}

          onChange={(e)=>setForm({

            ...form,

            targetAudience:{

              ...form.targetAudience,

              interests:e.target.value.split(",")

            }

          })}

        />

        <select

          className="w-full border rounded-lg p-3 mt-5"

          value={form.targetAudience.gender}

          onChange={(e)=>setForm({

            ...form,

            targetAudience:{

              ...form.targetAudience,

              gender:e.target.value

            }

          })}

        >

          <option value="">

            Everyone

          </option>

          <option value="male">

            Male

          </option>

          <option value="female">

            Female

          </option>

        </select>

        <div className="flex justify-end gap-4">

          <button

            type="button"

            className="px-6 py-3 border rounded-lg"

            onClick={()=>navigate(-1)}

          >

            Cancel

          </button>

          <button

            type="submit"

            className="px-8 py-3 bg-purple-600 text-white rounded-lg"

          >

            {saving ? "Saving..." : "Save Advertisement"}

          </button>

        </div>

      </form>

    </div>

  );

}