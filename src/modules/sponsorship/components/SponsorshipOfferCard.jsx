import { Link } from "react-router-dom";


export default function SponsorshipOfferCard({
  sponsorship
}) {

  if (!sponsorship) return null;


  return (

    <div className="
      bg-white
      dark:bg-zinc-900
      rounded-xl
      border
      p-5
      shadow-sm
    ">


      <div className="flex justify-between">

        <div>

          <h3 className="
            text-lg
            font-bold
          ">
            {sponsorship.title}
          </h3>


          <p className="
            text-sm
            text-gray-500
          ">
            {sponsorship.category}
          </p>

        </div>


        <span className="
          px-3
          py-1
          rounded-full
          text-xs
          bg-purple-100
          text-purple-700
        ">
          {sponsorship.status}
        </span>


      </div>



      <p className="
        mt-4
        text-sm
        text-gray-600
        dark:text-gray-300
      ">
        {sponsorship.description}
      </p>



      <div className="
        mt-5
        grid
        grid-cols-2
        gap-3
      ">


        <div>

          <p className="text-xs text-gray-400">
            Budget
          </p>

          <p className="font-bold">
            R{sponsorship.budget}
          </p>

        </div>



        <div>

          <p className="text-xs text-gray-400">
            Content
          </p>

          <p className="font-bold">
            {sponsorship.category}
          </p>

        </div>


      </div>



      <Link
        to={`/sponsorships/${sponsorship.id}`}
        className="
          block
          mt-5
          text-center
          bg-purple-600
          text-white
          rounded-lg
          py-3
          font-semibold
        "
      >

        View Campaign

      </Link>


    </div>

  );
}