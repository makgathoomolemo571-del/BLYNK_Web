import { Link } from "react-router-dom";


export default function SponsorshipCard({
  sponsorship
}) {

  if (!sponsorship)
    return null;


  return (

    <div className="
      bg-white
      dark:bg-zinc-900
      rounded-xl
      shadow
      p-5
      border
      border-zinc-200
      dark:border-zinc-800
    ">


      {/* BUSINESS */}

      <div className="flex items-center gap-3 mb-4">

        {sponsorship.business?.logo && (

          <img
            src={sponsorship.business.logo}
            className="
              w-12
              h-12
              rounded-full
              object-cover
            "
          />

        )}


        <div>

          <h3 className="font-bold">

            {sponsorship.business?.name ||
             sponsorship.business?.businessName ||
             "Business"}

          </h3>


          <p className="
            text-sm
            text-zinc-500
          ">
            Sponsor
          </p>

        </div>


      </div>



      {/* TITLE */}

      <h2 className="
        text-xl
        font-bold
        mb-2
      ">

        {sponsorship.title}

      </h2>



      <p className="
        text-sm
        text-zinc-600
        dark:text-zinc-300
        mb-4
      ">

        {sponsorship.description}

      </p>



      {/* CATEGORY */}

      <div className="
        flex
        gap-2
        flex-wrap
        mb-4
      ">


        <span className="
          px-3
          py-1
          rounded-full
          text-xs
          bg-purple-100
          text-purple-700
        ">

          {sponsorship.category}

        </span>


        <span className="
          px-3
          py-1
          rounded-full
          text-xs
          bg-blue-100
          text-blue-700
        ">

          {sponsorship.status}

        </span>


      </div>



      {/* BUDGET */}

      <div className="
        flex
        justify-between
        mb-5
      ">


        <div>

          <p className="text-xs text-zinc-500">
            Budget
          </p>

          <strong>

            R {sponsorship.budget?.amount ||
               sponsorship.budget ||
               0}

          </strong>

        </div>


        <div>

          <p className="text-xs text-zinc-500">
            Payment
          </p>

          <strong>

            {sponsorship.paymentType ||
             "once"}

          </strong>

        </div>


      </div>



      <Link

        to={`/sponsorships/${sponsorship.id ||
                            sponsorship._id}`}

        className="
          block
          text-center
          bg-purple-600
          text-white
          py-3
          rounded-lg
          hover:bg-purple-700
        "

      >

        View Campaign

      </Link>


    </div>

  );

}