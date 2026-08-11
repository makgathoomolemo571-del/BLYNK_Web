import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getSponsorshipApplications,
  acceptSponsorshipApplication,
  rejectSponsorshipApplication
} from "../services/sponsorship.api";


export default function SponsorshipApplications() {
const { id } = useParams();


  const [applications, setApplications] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState("");


  useEffect(()=>{

    loadApplications();

  },[]);



  const loadApplications = async()=>{

    try{

      setLoading(true);

      const res = await getSponsorshipApplications(id);

      console.log("Applications response:", res);
console.log("Applications data:", res.data || res);
console.log("APPLICATIONS:", res.data || res);
      setApplications(
        res.data || res
      );


    }catch(err){

      console.error(err);

      setError(
        "Unable to load sponsorship applications"
      );

    }finally{

      setLoading(false);

    }

  };



  const accept = async(
    sponsorshipId,
    applicationId
  )=>{

    try{

      await acceptSponsorshipApplication(
        sponsorshipId,
        applicationId
      );

      loadApplications();


    }catch(err){

      console.error(err);

    }

  };



  const reject = async(
    sponsorshipId,
    applicationId
  )=>{

    try{

      await rejectSponsorshipApplication(
        sponsorshipId,
        applicationId
      );

      loadApplications();


    }catch(err){

      console.error(err);

    }

  };



  if(loading){

    return(
      <div className="p-6 text-white">
        Loading applications...
      </div>
    );

  }



  if(error){

    return(
      <div className="p-6 text-red-500">
        {error}
      </div>
    );

  }



  return (

    <div className="p-6 space-y-6">


      <div>

        <h1 className="text-3xl font-bold">
          Sponsorship Applications
        </h1>

        <p className="text-gray-400">
          Manage creators applying for your campaigns
        </p>

      </div>



      <div className="grid gap-5">


      {
        applications.map(app=>(


          <div
            key={app._id || app._id}
            className="
            bg-zinc-900
            rounded-xl
            p-5
            border
            border-zinc-800
            "
          >


            <div className="flex justify-between">


              <div>


                <h2 className="text-xl font-semibold">

                  {
                    app.creator?.displayName ||
                    app.creator?.username ||
                    "Creator"
                  }

                </h2>


                <p className="text-gray-400">

                  {
                    app.sponsorship?.title ||
                    "Sponsorship Campaign"
                  }

                </p>


              </div>


              <span
                className="
                px-3
                py-1
                rounded-full
                bg-purple-600/20
                text-purple-400
                "
              >

                {app.status}

              </span>


            </div>



            <div className="mt-4">


              <p>

                Proposal:

              </p>


              <p className="text-gray-400">

                {
                  app.proposal ||
                  "No proposal"
                }

              </p>


            </div>



            <div className="mt-4">


              <p>

                Requested Price:

              </p>


              <p className="font-bold">

                R {app.quotedPrice || 0}

              </p>


            </div>




            {
              app.status === "pending" && (

                <div className="flex gap-3 mt-5">


                  <button
                    onClick={()=>
                      accept(
    id,
    app._id || app.id
  )
                    }
                    className="
                    bg-green-600
                    px-5
                    py-2
                    rounded-lg
                    text-white
                    "
                  >

                    Accept

                  </button>



                  <button
                    onClick={()=>
                      reject(
    id,
    app._id || app.id
  )
                    }
                    className="
                    bg-red-600
                    px-5
                    py-2
                    rounded-lg
                    text-white
                    "
                  >

                    Reject

                  </button>


                </div>

              )
            }



          </div>


        ))
      }


      </div>


    </div>

  );

}