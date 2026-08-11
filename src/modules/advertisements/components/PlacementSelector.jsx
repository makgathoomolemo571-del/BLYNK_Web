import "./PlacementSelector.css";

const PLACEMENTS = [
  {
    id: "feed",
    title: "Social Feed",
    description: "Appear between user posts.",
    icon: "📰"
  },
  {
    id: "reels",
    title: "Reels",
    description: "Full screen vertical ads.",
    icon: "🎬"
  },
  {
    id: "stories",
    title: "Stories",
    description: "Story advertisements.",
    icon: "📖"
  },
  {
    id: "watchparty",
    title: "Watch Parties",
    description: "Display before or during watch parties.",
    icon: "📺"
  },
  {
    id: "podcasts",
    title: "Podcasts",
    description: "Audio sponsorship placements.",
    icon: "🎙️"
  },
  {
    id: "marketplace",
    title: "Marketplace",
    description: "Sponsored product listings.",
    icon: "🛍️"
  },
  {
    id: "business",
    title: "Business Hub",
    description: "Business discovery promotions.",
    icon: "🏢"
  },
  {
    id: "creator",
    title: "Creator Profiles",
    description: "Promote on creator pages.",
    icon: "⭐"
  }
];

export default function PlacementSelector({

  value = [],

  onChange

}) {

  function toggle(id) {

    let updated = [];

    if (value.includes(id)) {

      updated = value.filter(v => v !== id);

    } else {

      updated = [...value, id];

    }

    onChange(updated);

  }

  return (

    <div className="placement-selector">

      <h3>Select Placements</h3>

      <div className="placement-grid">

        {PLACEMENTS.map(item => (

          <button

            key={item.id}

            type="button"

            className={
              value.includes(item.id)
                ? "placement-card active"
                : "placement-card"
            }

            onClick={() => toggle(item.id)}

          >

            <div className="placement-icon">

              {item.icon}

            </div>

            <h4>

              {item.title}

            </h4>

            <p>

              {item.description}

            </p>

          </button>

        ))}

      </div>

    </div>

  );

}