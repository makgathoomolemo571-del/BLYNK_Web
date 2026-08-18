import { NavLink } from "react-router-dom";

import {
  House,
  Clapperboard,
  CirclePlus,
  MessageCircle,
  User
} from "lucide-react";

import "./MobileNav.css";

export default function MobileNav() {

  return (

    <nav className="mobile-nav">

      <NavLink to="/feed">
        <House size={24} />
      </NavLink>

      <NavLink to="/reels">
        <Clapperboard size={24} />
      </NavLink>

      <NavLink
        to="/posts/create"
        className="create-mobile"
      >
        <CirclePlus size={34} />
      </NavLink>

      <NavLink to="/conversations">
        <MessageCircle size={24} />
      </NavLink>

      <NavLink to="/profile/me">
        <User size={24} />
      </NavLink>

    </nav>

  );

}