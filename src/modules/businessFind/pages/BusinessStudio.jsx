import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import {
  ShoppingBag,
  Mic,
  MonitorPlay,
  BriefcaseBusiness,
  Handshake,
  Megaphone
} from "lucide-react";

export default function BusinessStudio() {
  const authUser = useSelector(state => state.auth.user);

    if (!authUser) {
        return <Navigate to="/login" replace />;
    }

    if (authUser.role !== "business") {
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
      title: "Business Hire",
      description: "Create hiring project",
      icon: BriefcaseBusiness,
      path: "/business/create"
    },
    {
      title: "Sponsorship",
      description: "Create sponsorship campaign",
      icon: Handshake,
      path: "/sponsorships"
    },
    {
      title: "Advertisement",
      description: "Create advertisement campaign",
      icon: Megaphone,
      path: "/advertisements"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        Business Studio
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