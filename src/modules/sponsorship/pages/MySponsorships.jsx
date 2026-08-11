import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import sponsorshipApi from "../services/sponsorship.api";

export default function MySponsorships() {

  const [sponsorships, setSponsorships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadSponsorships();
  }, []);


  const loadSponsorships = async () => {

    try {

      setLoading(true);

      const res =
        await sponsorshipApi.getMine();

      setSponsorships(
        res.data || res
      );

    } catch (err) {

      console.error(err);

      setError(
        err.response?.data?.message ||
        "Unable to load sponsorships."
      );

    } finally {

      setLoading(false);

    }

  };


  if (loading) {

    return (
      <div className="p-6 text-center">
        Loading sponsorships...
      </div>
    );

  }


  if (error) {

    return (
      <div className="p-6 text-red-500">
        {error}
      </div>
    );

  }


  return (

    <div className="max-w-6xl mx-auto p-6">

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold">
            My Sponsorships
          </h1>

          <p className="text-gray-500">
            Manage your creator campaigns and brand partnerships.
          </p>
        </div>


        <Link
          to="/sponsorships/create"
          className="bg-purple-600 text-white px-5 py-3 rounded-lg"
        >
          Create Campaign
        </Link>

      </div>


      {sponsorships.length === 0 ? (

        <div className="border rounded-xl p-10 text-center">

          <h2 className="text-xl font-semibold">
            No Sponsorships Yet
          </h2>

          <p className="text-gray-500 mt-2">
            Create a campaign or apply for sponsorship opportunities.
          </p>

        </div>


      ) : (

        <div className="grid md:grid-cols-3 gap-6">


          {sponsorships.map((item)=>(

            <div
              key={item.id || item._id}
              className="border rounded-xl p-5 shadow-sm"
            >

              <div className="flex justify-between mb-3">

                <h2 className="font-bold text-lg">
                  {item.title}
                </h2>


                <span
                  className="
                  text-xs 
                  px-3 
                  py-1 
                  rounded-full
                  bg-purple-100
                  text-purple-700
                  "
                >
                  {item.status}
                </span>

              </div>


              <p className="text-gray-600 text-sm mb-4">

                {item.description ||
                "No description"}

              </p>


              <div className="space-y-2 text-sm">


                <p>
                  Category:
                  <strong className="ml-2">
                    {item.category}
                  </strong>
                </p>


                <p>
                  Budget:
                  <strong className="ml-2">
                    {item.budget?.amount ||
                    item.budget ||
                    0}
                    {" "}
                    {item.currency || "ZAR"}
                  </strong>
                </p>


                <p>
                  Creator:
                  <strong className="ml-2">
                    {
                    item.creator?.displayName ||
                    item.creator?.username ||
                    "Pending"
                    }
                  </strong>
                </p>


              </div>


              <Link
                to={`/sponsorships/${item.id || item._id}`}
                className="
                block
                mt-5
                text-center
                border
                rounded-lg
                py-2
                "
              >
                View Campaign
              </Link>


            </div>

          ))}


        </div>

      )}


    </div>

  );

}