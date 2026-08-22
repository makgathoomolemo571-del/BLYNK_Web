import { Link } from "react-router-dom";
import "./Logo.css";

import blynkLogo from "../../../assets/logo.png";

export default function Logo() {
  return (
   <button
  type="button"
  className={`sidebar-logo ${open ? "expanded" : "collapsed"}`}
  onClick={onToggle}
  aria-label={
    open
      ? "Collapse sidebar"
      : "Expand sidebar"
  }
>

  <img
    src={logo}
    alt="BLYNK"
    className="logo"
  />

  {open && (
    <h1 className="logo-text">
      BLYNK
    </h1>
  )}

</button>
  );
}