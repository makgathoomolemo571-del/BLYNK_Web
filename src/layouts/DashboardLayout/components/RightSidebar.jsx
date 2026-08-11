import "./RightSidebar.css";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import advertisementApi from "../../../modules/advertisements/services/advertisements.api";

export default function RightSidebar({
    open,
    onClose
}) {
  const [ads, setAds] = useState([]);

useEffect(() => {
    loadAds();
}, []);

async function loadAds() {
    try {

       const res = await advertisementApi.getAdvertisements();
        setAds(res.data || res);

    } catch (err) {
        console.error("Failed to load ads", err);
    }
}
console.log("RightSidebar open =", open);
  return (

    <aside className={`right-sidebar ${open ? "open" : ""}`}>


      {/* TRENDING */}
      <section className="sidebar-card">

        <h3>
          🔥 Trending
        </h3>

        <Link
          to="/recommendations/?limit=${limit}"
          className="sidebar-link"
        >
          View Trending
        </Link>

      </section>


      {/* DISCOVER */}
      <section className="sidebar-card">

        <h3>
          🌎 Discover Sponsorships
        </h3>

        <Link
    to="/sponsorships/dashboard"
    className="sidebar-link"
  >
    Explore Sponsorships
  </Link>

      </section>



      {/* RECOMMENDATIONS */}
      <section className="sidebar-card">

        <h3>
          ⭐ Recommendations 
          (Find Creators-Business-Member)
        </h3>

        <Link
          to="/social"
          className="sidebar-link"
        >
          Suggested For You
        </Link>
<section className="sidebar-card">

    <h3>Sponsored</h3>

    {ads.length === 0 ? (

        <p>No advertisements</p>

    ) : (

        ads.map(ad => (

            <div
                key={ad._id}
                className="sidebar-ad"
            >

                <img
                    src={ad.media}
                    alt={ad.title}
                />

                <h4>{ad.title}</h4>

                <p>{ad.description}</p>

            </div>

        ))

    )}

</section>
      </section>

      <div className="right-sidebar-header">

    <h2>CLOSE</h2>

    <button
        className="close-sidebar"
        
        onClick={onClose}
    >
        <X size={20}/>
    </button>

</div>

      <section className="sidebar-footer">

        <Link to="/about">
          About
        </Link>

        <Link to="/privacy">
          Privacy
        </Link>

        <Link to="/terms">
          Terms
        </Link>

        <Link to="/support">
          Support
        </Link>


        <small>
          © 2026 BLYNK
        </small>

      </section>


    </aside>

  );

}