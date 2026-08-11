import {
  FaPlay,
  FaPause,
  FaEdit,
  FaMousePointer,
  FaEye
} from "react-icons/fa";

export default function AdvertisementCard({
  advertisement,
  onPause,
  onResume,
  onEdit,
  onClick
}) {

  const ctr =
    advertisement.impressions > 0
      ? (
          (advertisement.clicks /
            advertisement.impressions) *
          100
        ).toFixed(2)
      : "0.00";

  return (

    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow border overflow-hidden">

      <div className="aspect-video bg-zinc-200 dark:bg-zinc-800">

        {advertisement.type === "video" ? (

          <video
            src={advertisement.media}
            controls
            className="w-full h-full object-cover"
          />

        ) : (

          <img
            src={advertisement.media}
            alt={advertisement.title}
            className="w-full h-full object-cover"
          />

        )}

      </div>

      <div className="p-5 space-y-4">

        <div>

          <h3 className="font-bold text-lg">

            {advertisement.title}

          </h3>

          <p className="text-sm text-zinc-500">

            {advertisement.description}

          </p>

        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">

          <div>

            <strong>Status</strong>

            <div
              className={
                advertisement.status === "active"
                  ? "text-green-500"
                  : advertisement.status === "paused"
                  ? "text-yellow-500"
                  : "text-red-500"
              }
            >

              {advertisement.status}

            </div>

          </div>

          <div>

            <strong>Budget</strong>

            <div>

              R{advertisement.budget}

            </div>

          </div>

          <div>

            <strong>Spent</strong>

            <div>

              R{advertisement.spent}

            </div>

          </div>

          <div>

            <strong>CTR</strong>

            <div>

              {ctr}%

            </div>

          </div>

        </div>

        <div className="grid grid-cols-2 gap-4">

          <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-3 text-center">

            <FaEye className="mx-auto mb-2"/>

            <div className="font-bold">

              {advertisement.impressions}

            </div>

            <small>Impressions</small>

          </div>

          <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-3 text-center">

            <FaMousePointer className="mx-auto mb-2"/>

            <div className="font-bold">

              {advertisement.clicks}

            </div>

            <small>Clicks</small>

          </div>

        </div>

        <div className="flex gap-2">

          <button

            onClick={() => onEdit(advertisement)}

            className="flex-1 bg-blue-600 text-white rounded-lg py-2 flex justify-center items-center gap-2"

          >

            <FaEdit/>

            Edit

          </button>

          {advertisement.status === "active" ? (

            <button

              onClick={() =>
                onPause(advertisement._id || advertisement.id)
              }

              className="flex-1 bg-yellow-500 text-white rounded-lg py-2 flex justify-center items-center gap-2"

            >

              <FaPause/>

              Pause

            </button>

          ) : (

            <button

              onClick={() =>
                onResume(advertisement._id || advertisement.id)
              }

              className="flex-1 bg-green-600 text-white rounded-lg py-2 flex justify-center items-center gap-2"

            >

              <FaPlay/>

              Resume

            </button>

          )}

        </div>

        <button

          onClick={() =>
            onClick(advertisement._id || advertisement.id)
          }

          className="w-full rounded-lg py-2 bg-purple-600 text-white"

        >

          Simulate Ad Click

        </button>

      </div>

    </div>

  );

}