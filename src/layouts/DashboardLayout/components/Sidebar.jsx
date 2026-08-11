import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../modules/auth/store/authSlice";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/blynk-logo.png";

import {
  House,
  Clapperboard,
  CirclePlay,
  Bell,
  Store,
  Wallet,
  Mic2,
  BriefcaseBusiness,
  Palette,
  LifeBuoy,
  LogOut,
  SubscriptIcon,
  Users,
  BadgeDollarSign
} from "lucide-react";

import "./Sidebar.css";

const menu = [
  {
    title: "Home",
    icon: House,
    path: "/feed"
  },

  {
    title: "Reels",
    icon: Clapperboard,
    path: "/reels"
  },

  {
    title: "Stories",
    icon: CirclePlay,
    path: "/stories"
  },

  {
    title: "Podcasts",
    icon: Mic2,
    path: "/podcasts"
  },

  {
    title: "Watch Parties",
    icon: CirclePlay,
    path: "/watchparties/live"
  },


  {
    title: "Notifications",
    icon: Bell,
    path: "/notifications"
  },

  {
    title: "Marketplace",
    icon: Store,
    path: "/marketplace"
  },

  {
    title: "Business Hub",
    icon: BriefcaseBusiness,
    path: "/business"
  },

  {
    title: "Creators Hub",
    icon: Palette,
    path: "/creator"
  },

  {
    title: "Wallet",
    icon: Wallet,
    path: "/wallet"
  },

  {
    title: "Subscriptions",
    icon: SubscriptIcon,
    path: "/subscriptions"
  },

  {
    title: "Monetization",
    icon: BadgeDollarSign,
    path: "/monetization/dashboard"
  },

  {
    title: "Social",
    icon: Users,
    path: "/social"
  },

  {
    title: "Support",
    icon: LifeBuoy,
    path: "/support"
  }
];

export default function Sidebar() {

  const dispatch = useDispatch();
const navigate = useNavigate();

  const handleLogout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("token");

  dispatch(logout());

  navigate("/login");
};

  return (

    <aside className="sidebar">

     <div className="sidebar-logo">

  <img
    src={logo}
    alt="Logo"
    className="logo"
  />

  <h1 className="logo-text">
    BLYNK
  </h1>


      </div>

      <nav>

        {menu.map((item) => {

          const Icon = item.icon;

          return (

            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "sidebar-link active"
                  : "sidebar-link"
              }
            >
              <Icon size={20} />

              <span>{item.title}</span>

            </NavLink>

          );

        })}

      </nav>

     <button
    className="logout-btn"
    onClick={handleLogout}
>
    <LogOut size={18} />
    <span>Logout</span>
</button>

    </aside>

  );

}