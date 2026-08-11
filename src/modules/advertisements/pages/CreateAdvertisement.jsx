import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import advertisementApi from "../services/advertisements.api";

export default function CreateAdvertisement() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({

    title: "",

    description: "",

    media: "",

    type: "image",

    budget: 100,

    targetAudience: {

      ageMin: 18,

      ageMax: 60,

      countries: [],

      interests: [],

      gender: ""

    }

  });

  const [ads, setAds] = useState([]);

const loadAds = async () => {

    try {

        const res = await advertisementApi.getAdvertisements();


        console.log("========== ADS RESPONSE ==========");
        console.log(res);


        setAds(res);


        console.log("ADS ARRAY:", res);


    } catch(error) {

        console.error(
            "LOAD ADS ERROR:",
            error
        );

    }

};

useEffect(() => {
    loadAds();
}, []);

  const change = (e) => {

    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value
    }));

  };

  const audienceChange = (e) => {

    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,

      targetAudience: {

        ...prev.targetAudience,

        [name]:
          name === "countries"
            ? value.split(",").map(v => v.trim())
            : name === "interests"
            ? value.split(",").map(v => v.trim())
            : value

      }

    }));

  };

const submit = async()=>{

    try {

        const payload = {
            ...form
        };


        console.log(
            "ADVERTISEMENT PAYLOAD:",
            payload
        );


        await advertisementApi.createAdvertisement(payload);

        

loadAds();

    } catch(error){

        console.error(error);

    }

};

  return (

    <div className="max-w-4xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-8">

        Create Advertisement

      </h1>

      <form
        onSubmit={submit}
        className="space-y-6"
      >

        <div>

          <label>Title</label>

          <input
            name="title"
            value={form.title}
            onChange={change}
            className="w-full border rounded-lg p-3"
            required
          />

        </div>

        <div>

          <label>Description</label>

          <textarea
            rows="4"
            name="description"
            value={form.description}
            onChange={change}
            className="w-full border rounded-lg p-3"
          />

        </div>

        <div>

          <label>Media URL</label>

          <input
            name="media"
            value={form.media}
            onChange={change}
            className="w-full border rounded-lg p-3"
            placeholder="https://..."
            required
          />

        </div>

        <div className="grid grid-cols-2 gap-6">

          <div>

            <label>Advertisement Type</label>

            <select
              name="type"
              value={form.type}
              onChange={change}
              className="w-full border rounded-lg p-3"
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

            <label>Budget (ZAR)</label>

            <input
              type="number"
              name="budget"
              value={form.budget}
              onChange={change}
              className="w-full border rounded-lg p-3"
            />

          </div>

        </div>

        <h2 className="text-xl font-semibold">

          Target Audience

        </h2>

        <div className="grid grid-cols-2 gap-6">

          <input
            type="number"
            name="ageMin"
            value={form.targetAudience.ageMin}
            onChange={audienceChange}
            placeholder="Minimum Age"
            className="border rounded-lg p-3"
          />

          <input
            type="number"
            name="ageMax"
            value={form.targetAudience.ageMax}
            onChange={audienceChange}
            placeholder="Maximum Age"
            className="border rounded-lg p-3"
          />

        </div>

        <input
          name="countries"
          onChange={audienceChange}
          placeholder="South Africa,Botswana,Namibia"
          className="w-full border rounded-lg p-3"
        />

        <input
          name="interests"
          onChange={audienceChange}
          placeholder="Music,Sports,Cars"
          className="w-full border rounded-lg p-3"
        />

        <select
          name="gender"
          value={form.targetAudience.gender}
          onChange={audienceChange}
          className="w-full border rounded-lg p-3"
        >

          <option value="">
            All Genders
          </option>

          <option value="male">
            Male
          </option>

          <option value="female">
            Female
          </option>

        </select>

        <button
          disabled={loading}
          className="bg-purple-600 text-white px-8 py-3 rounded-lg"
        >

          {loading
            ? "Creating..."
            : "Create Advertisement"}

        </button>

      </form>
<div className="mt-10">

    <h2 className="text-2xl font-bold mb-6">
        My Advertisements
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {ads.map(ad => (

            <div
                key={ad._id}
                className="rounded-xl border bg-white p-5 shadow"
            >

                <img
                    src={ad.media}
                    alt={ad.title}
                    className="w-full h-52 object-cover rounded-lg"
                />

                <h3 className="text-xl font-bold mt-4">
                    {ad.title}
                </h3>

                <p className="text-gray-600">
                    {ad.description}
                </p>

                <div className="mt-4 flex justify-between">

                    <span className="font-semibold">
                        R {ad.budget}
                    </span>

                    <span className="capitalize">
                        {ad.status}
                    </span>

                </div>

                <button
                    className="mt-5 w-full bg-purple-700 hover:bg-purple-800 text-white py-2 rounded-lg"
                >
                    View
                </button>

            </div>

        ))}

    </div>

</div>
    </div>

  );

}