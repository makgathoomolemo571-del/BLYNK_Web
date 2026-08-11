import React from "react";
import "./landing.css";
import LandingFooter from "./LandingFooter";
import { Link } from "react-router-dom";
import blynkLogo from "../../assets/blynk-logo.png";

const Landing = () => {
  return (
    <div className="landing-container">

      {/* HERO SECTION */}
      <section className="hero">
        <img
    src={blynkLogo}
    alt="BLYNK Logo"
    className="hero-logo"
  />
        <div className="hero-logo">
  BLYNK
</div>


        <p className="tagline">
          A Social + Podcast Ecosystem
        </p>

    

<div className="cta-buttons">
  <Link to="/register" className="btn primary">
    Get Started
  </Link>

  <Link to="/login" className="btn secondary">
    Login
  </Link>
</div>
      </section>

      {/* FEATURES */}
      <section className="features">
        

  <Link
    to="/features/social"
    className="feature-card"
  >
    <h3>Social Feed</h3>
    <p>
      Share posts, photos and connect with friends.
    </p>
  </Link>

  <Link
    to="/features/reels"
    className="feature-card"
  >
    <h3>Reels & Stories</h3>
    <p>
      Short videos, stories and live moments.
    </p>
  </Link>

  <Link
    to="/features/podcasts"
    className="feature-card"
  >
    <h3>Podcasts</h3>
    <p>
      Listen or create podcasts and episodes.
    </p>
  </Link>

  <Link
    to="/features/marketplace"
    className="feature-card"
  >
    <h3>Marketplace</h3>
    <p>
      Buy, sell and discover local businesses.
    </p>
  </Link>

  <Link
    to="/features/wallet"
    className="feature-card"
  >
    <h3>Wallet & Rewards</h3>
    <p>
      Payments, subscriptions and loyalty rewards.
    </p>
  </Link>

  <Link
    to="/features/creators"
    className="feature-card"
  >
    <h3>Creator Studio</h3>
    <p>
      Monetize content, podcasts and live streams.
    </p>
  </Link>


      </section>

      {/* FOOTER */}
      <LandingFooter />

    </div>
  );
};

export default Landing;