import plans from "../../config/plans.config";
import { Link } from "react-router-dom";

const groups = {
  Members: [
    "FREE_MEMBER",
    "MEMBER_BASIC",
    "MEMBER_PLUS"
  ],

  Creators: [
    "FREE_CREATOR",
    "CREATOR_BASIC",
    "CREATOR_PLUS",
    "CREATOR_PRO"
  ],

  Businesses: [
    "FREE_BUSINESS",
    "BUSINESS_BASIC",
    "BUSINESS_PRO",
    "BUSINESS_ENTERPRISE"
  ],

  "Creator Upgrades": [
    "MEMBER_TO_CREATOR_VIP",
    "MEMBER_TO_CREATOR_VVIP"
  ],

  "Business Upgrades": [
    "MEMBER_TO_BUSINESS_VIP",
    "MEMBER_TO_BUSINESS_VVIP"
  ]
};

export default function SubscriptionsPlatformPage() {
  return (
    <div className="landing-page">

      <section className="hero-small">

        <h1>Subscriptions</h1>

        <p>
          Choose the plan that matches your journey.
          Whether you're a member, creator or business,
          BLYNK gives you everything you need to grow,
          earn and connect.
        </p>

      </section>

      {Object.entries(groups).map(([title, list]) => (

        <section
          key={title}
          className="subscription-section"
        >

          <h2>{title}</h2>

          <div className="plans-grid">

            {list.map((key) => {

              const plan = plans[key];

              return (

                <div
                  key={key}
                  className="plan-card"
                >

                  <h3>{plan.name}</h3>

                  <div className="plan-price">

                    {plan.price === 0
                      ? "FREE"
                      : `R${plan.price}`}

                  </div>

                  <p className="billing">
                    {plan.billing}
                  </p>

                  <ul>

                    <li>✔ Full BLYNK Access</li>

                    <li>✔ Wallet Integration</li>

                    <li>✔ Secure Account</li>

                    {key.includes("CREATOR") && (
                      <li>✔ Creator Monetization</li>
                    )}

                    {key.includes("BUSINESS") && (
                      <li>✔ Business Dashboard</li>
                    )}

                    {key.includes("PRO") && (
                      <li>✔ Priority Support</li>
                    )}

                    {key.includes("ENTERPRISE") && (
                      <li>✔ Dedicated Account Manager</li>
                    )}

                  </ul>

                  <Link
                    to="/register"
                    className="btn primary"
                  >
                    Get Started
                  </Link>

                </div>

              );

            })}

          </div>

        </section>

      ))}

    </div>
  );
}