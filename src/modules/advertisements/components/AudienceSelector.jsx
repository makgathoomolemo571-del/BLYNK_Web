// src/modules/advertisements/components/AudienceSelector.jsx

import { useState, useEffect } from "react";

const INTERESTS = [
  "Music",
  "Entertainment",
  "Nightlife",
  "Gaming",
  "Sports",
  "Fashion",
  "Technology",
  "Food",
  "Travel",
  "Business",
  "Education",
  "Finance",
  "Fitness",
  "Beauty",
  "Lifestyle",
  "Cars",
  "Real Estate",
  "Movies",
  "Podcasts",
  "Creators"
];

const COUNTRIES = [
  "South Africa",
  "Botswana",
  "Namibia",
  "Zimbabwe",
  "Mozambique",
  "Zambia",
  "Lesotho",
  "Eswatini",
  "Nigeria",
  "Kenya",
  "Ghana",
  "United States",
  "United Kingdom"
];

export default function AudienceSelector({

  value,

  onChange

}) {

  const [audience, setAudience] = useState(

    value || {

      ageMin: 18,

      ageMax: 65,

      gender: "all",

      countries: [],

      interests: []

    }

  );

  useEffect(() => {

    onChange?.(audience);

  }, [audience]);

  function update(field, val) {

    setAudience(prev => ({

      ...prev,

      [field]: val

    }));

  }

  function toggleCountry(country) {

    const exists =
      audience.countries.includes(country);

    update(

      "countries",

      exists
        ? audience.countries.filter(
            c => c !== country
          )
        : [...audience.countries, country]

    );

  }

  function toggleInterest(item) {

    const exists =
      audience.interests.includes(item);

    update(

      "interests",

      exists
        ? audience.interests.filter(
            i => i !== item
          )
        : [...audience.interests, item]

    );

  }

  return (

    <div className="space-y-8">

      <div>

        <h3 className="text-lg font-semibold mb-4">

          Target Audience

        </h3>

      </div>

      {/* AGE */}

      <div className="grid md:grid-cols-2 gap-4">

        <div>

          <label className="block mb-2">

            Minimum Age

          </label>

          <input

            type="number"

            min="13"

            max="100"

            value={audience.ageMin}

            onChange={e =>
              update(
                "ageMin",
                Number(e.target.value)
              )
            }

            className="w-full rounded-lg border p-3"

          />

        </div>

        <div>

          <label className="block mb-2">

            Maximum Age

          </label>

          <input

            type="number"

            min="13"

            max="100"

            value={audience.ageMax}

            onChange={e =>
              update(
                "ageMax",
                Number(e.target.value)
              )
            }

            className="w-full rounded-lg border p-3"

          />

        </div>

      </div>

      {/* GENDER */}

      <div>

        <label className="block mb-3">

          Gender

        </label>

        <select

          value={audience.gender}

          onChange={e =>
            update(
              "gender",
              e.target.value
            )
          }

          className="w-full rounded-lg border p-3"

        >

          <option value="all">

            Everyone

          </option>

          <option value="male">

            Male

          </option>

          <option value="female">

            Female

          </option>

        </select>

      </div>

      {/* COUNTRIES */}

      <div>

        <h4 className="font-semibold mb-3">

          Countries

        </h4>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">

          {COUNTRIES.map(country => (

            <button

              key={country}

              type="button"

              onClick={() =>
                toggleCountry(country)
              }

              className={`rounded-lg border p-3 transition

              ${

                audience.countries.includes(country)

                ? "bg-purple-600 text-white border-purple-600"

                : "bg-white dark:bg-zinc-900"

              }`}

            >

              {country}

            </button>

          ))}

        </div>

      </div>

      {/* INTERESTS */}

      <div>

        <h4 className="font-semibold mb-3">

          Interests

        </h4>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

          {INTERESTS.map(item => (

            <button

              key={item}

              type="button"

              onClick={() =>
                toggleInterest(item)
              }

              className={`rounded-lg border p-3 transition

              ${

                audience.interests.includes(item)

                ? "bg-blue-600 text-white border-blue-600"

                : "bg-white dark:bg-zinc-900"

              }`}

            >

              {item}

            </button>

          ))}

        </div>

      </div>

    </div>

  );

}