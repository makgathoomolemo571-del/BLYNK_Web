export default function CampaignProgress({
  status,
  deliverables = []
}) {

  const steps = [
    "requested",
    "negotiating",
    "accepted",
    "active",
    "submitted",
    "approved",
    "completed"
  ];


  const current =
    steps.indexOf(status);


  return (
    <div className="w-full">

      <div className="flex items-center justify-between">

        {steps.map((step,index)=>(

          <div
            key={step}
            className="flex-1 flex flex-col items-center"
          >

            <div
              className={`
                w-8
                h-8
                rounded-full
                flex
                items-center
                justify-center
                text-sm
                font-bold

                ${
                  index <= current
                  ?
                  "bg-purple-600 text-white"
                  :
                  "bg-gray-300 text-gray-600"
                }
              `}
            >
              {index + 1}
            </div>


            <span
              className="
              text-xs
              mt-2
              capitalize
              "
            >
              {step}
            </span>


            {
              index !== steps.length -1 &&
              (
                <div
                  className={`
                    h-1
                    w-full
                    mt-[-20px]
                    ${
                    index < current
                    ?
                    "bg-purple-600"
                    :
                    "bg-gray-300"
                    }
                  `}
                />
              )
            }

          </div>

        ))}

      </div>



      <div className="mt-8">

        <h3 className="font-bold mb-3">
          Deliverables
        </h3>


        {
          deliverables.length === 0 ?

          (
            <p className="text-gray-500">
              No deliverables added
            </p>
          )

          :

          deliverables.map((item,index)=>(

            <div
              key={index}
              className="
              border
              rounded-lg
              p-4
              mb-3
              "
            >

              <div className="flex justify-between">

                <h4 className="font-semibold">
                  {item.title}
                </h4>


                <span
                  className={`
                  text-sm
                  ${
                    item.completed
                    ?
                    "text-green-600"
                    :
                    "text-orange-500"
                  }
                  `}
                >
                  {
                    item.completed
                    ?
                    "Completed"
                    :
                    "Pending"
                  }
                </span>

              </div>


              <p className="text-sm mt-2">
                {item.description}
              </p>


            </div>

          ))

        }

      </div>

    </div>
  );
}