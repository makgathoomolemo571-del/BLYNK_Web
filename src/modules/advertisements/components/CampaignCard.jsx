import {
  FaPlay,
  FaPause,
  FaChartLine,
  FaMousePointer,
  FaEye,
  FaEdit
} from "react-icons/fa";

import "./CampaignCard.css";

export default function CampaignCard({

  campaign,

  onPause,

  onResume,

  onEdit

}) {

  const progress =
    campaign.budget > 0
      ? Math.min(
          (campaign.spent / campaign.budget) * 100,
          100
        )
      : 0;

  return (

    <div className="campaign-card">

      <div className="campaign-top">

        <img
          src={campaign.media}
          alt={campaign.title}
          className="campaign-image"
        />

        <div className="campaign-info">

          <h3>
            {campaign.title}
          </h3>

          <p>
            {campaign.description}
          </p>

          <span
            className={`campaign-status ${campaign.status}`}
          >
            {campaign.status}
          </span>

        </div>

      </div>

      <div className="campaign-stats">

        <div>

          <FaEye />

          <span>

            {campaign.impressions.toLocaleString()}

          </span>

        </div>

        <div>

          <FaMousePointer />

          <span>

            {campaign.clicks.toLocaleString()}

          </span>

        </div>

        <div>

          <FaChartLine />

          <span>

            R{campaign.spent.toLocaleString()} /
            R{campaign.budget.toLocaleString()}

          </span>

        </div>

      </div>

      <div className="campaign-progress">

        <div
          className="campaign-progress-bar"
          style={{
            width: `${progress}%`
          }}
        />

      </div>

      <div className="campaign-footer">

        <button
          className="campaign-edit"
          onClick={() => onEdit(campaign)}
        >

          <FaEdit />

          Edit

        </button>

        {campaign.status === "active" ? (

          <button
            className="campaign-pause"
            onClick={() => onPause(campaign._id || campaign.id)}
          >

            <FaPause />

            Pause

          </button>

        ) : (

          <button
            className="campaign-resume"
            onClick={() => onResume(campaign._id || campaign.id)}
          >

            <FaPlay />

            Resume

          </button>

        )}

      </div>

    </div>

  );

}