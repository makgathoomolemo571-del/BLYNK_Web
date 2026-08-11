// src/modules/sponsorship/components/DeliverablesCard.jsx

export default function DeliverablesCard({
  deliverables = []
}) {

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow p-5">

      <h3 className="text-lg font-bold mb-4">
        Deliverables
      </h3>


      {deliverables.length === 0 ? (

        <p className="text-gray-500">
          No deliverables added
        </p>

      ) : (

        <div className="space-y-4">

          {deliverables.map((item,index)=>(

            <div
              key={index}
              className="
              border
              rounded-lg
              p-4
              dark:border-zinc-700
              "
            >

              <div className="flex justify-between">

                <h4 className="font-semibold">
                  {item.title}
                </h4>


                <span
                  className={`
                  text-sm px-3 py-1 rounded-full
                  ${
                    item.completed
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                  }
                  `}
                >
                  {
                    item.completed
                    ? "Completed"
                    : "Pending"
                  }

                </span>

              </div>


              <p className="
                text-sm
                text-gray-600
                dark:text-gray-400
                mt-2
              ">
                {item.description}
              </p>


              {item.dueDate && (

                <p className="text-xs mt-3 opacity-70">

                  Due:
                  {" "}
                  {
                    new Date(
                      item.dueDate
                    ).toLocaleDateString()
                  }

                </p>

              )}


            </div>

          ))}

        </div>

      )}

    </div>
  );
}