import {
  FaPlayCircle,
  FaPauseCircle,
  FaCheckCircle
} from "react-icons/fa";

const config = {

  active: {
    label: "Active",
    color: "bg-green-100 text-green-700 border-green-300",
    icon: FaPlayCircle
  },

  paused: {
    label: "Paused",
    color: "bg-yellow-100 text-yellow-700 border-yellow-300",
    icon: FaPauseCircle
  },

  completed: {
    label: "Completed",
    color: "bg-blue-100 text-blue-700 border-blue-300",
    icon: FaCheckCircle
  }

};

export default function AdStatusBadge({

  status = "active"

}) {

  const badge =
    config[status] ||
    config.active;

  const Icon = badge.icon;

  return (

    <span
      className={`
        inline-flex
        items-center
        gap-2
        px-3
        py-1
        rounded-full
        border
        text-xs
        font-semibold
        ${badge.color}
      `}
    >

      <Icon size={13} />

      {badge.label}

    </span>

  );

}