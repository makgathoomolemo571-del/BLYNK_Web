import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Mic,
  MonitorPlay,
  BriefcaseBusiness
} from "lucide-react";

export default function CreatorStudio() {
  const authUser = useSelector(state => state.auth.user);
console.log("AUTH USER:", authUser);
if (!authUser) {
    return <Navigate to="/login" replace />;
}

if (authUser.role !== "creator") {
    return <Navigate to="/403" replace />;
}
  const navigate = useNavigate();

  const cards = [
    {
      title: "Marketplace",
      description: "Create marketplace listing",
      icon: ShoppingBag,
      path: "/marketplace/create"
    },
    {
      title: "Podcast",
      description: "Create podcast",
      icon: Mic,
      path: "/podcasts/create"
    },
    {
    title: "Watch Party",
    description: "Create a live watch party",
    icon: MonitorPlay,
    path: "/watchparties"
  },
    {
      title: "Creator Hire",
      description: "Create creator hire job",
      icon: BriefcaseBusiness,
      path: "/creator-hire/create"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        Creator Studio
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        {cards.map((item) => {

          const Icon = item.icon;

          return (
            <button
              key={item.title}
              onClick={() => navigate(item.path)}
              className="rounded-xl border bg-white hover:shadow-xl transition p-8 text-left"
            >
              <Icon size={40} className="mb-5 text-purple-600"/>

              <h2 className="text-xl font-bold">
                {item.title}
              </h2>

              <p className="text-zinc-500 mt-2">
                {item.description}
              </p>
            </button>
          );
        })}

      </div>

    </div>
  );
}