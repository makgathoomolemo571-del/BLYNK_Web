import React from "react";
import { Link } from "react-router-dom";

const LandingFooter = () => {
  return (
    <footer className="footer">

      <div className="footer-grid">

        <div>
          <h3>BLYNK</h3>
          <p>Building the future of creators, business & social networking.</p>
        </div>

       <div>
  <h4>Platform</h4>

  <Link to="/platform/subscriptions">
    Subscriptions
  </Link>

  <Link to="/platform/studio">
    Studio
  </Link>

  <Link to="/platform/marketplace">
    Marketplace
  </Link>

  <Link to="/platform/monetization">
    Monetization
  </Link>
</div>

        <div>
  <h4>Company</h4>

  <Link to="/company/about">
    About BLYNK
  </Link>

  <Link to="/company/careers">
    Careers
  </Link>

  <Link to="/company/press">
    Press
  </Link>

  <Link to="/company/contact">
    Contact
  </Link>

  <Link to="/support">
    Help Center
  </Link>
</div>

        <div>
  <h4>Legal</h4>

  <Link to="/legal/terms">
    Terms of Service
  </Link>

  <Link to="/legal/privacy">
    Privacy Policy
  </Link>

  <Link to="/legal/community">
    Community Guidelines
  </Link>

  <Link to="/legal/cookies">
    Cookie Policy
  </Link>

  <Link to="/legal/copyright">
    Copyright
  </Link>
</div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} BLYNK. All rights reserved.
      </div>

    </footer>
  );
};

export default LandingFooter;