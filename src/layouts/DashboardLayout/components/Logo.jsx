import { Link } from "react-router-dom";
import "./Logo.css";

import blynkLogo from "../../../assets/logo.png";

export default function Logo() {
  return (
    <Link to="/feed" className="blynk-logo">

      

      {
      <img
        src={blynkLogo}
        alt="BLYNK"
      />
      }

      <div className="logo-circle">
        B
      </div>

      <div className="logo-text">

        <span>BLYNK</span>

        <span>Connect • Create • Earn</span>

      </div>

    </Link>
  );
}