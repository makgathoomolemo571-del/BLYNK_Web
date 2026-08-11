import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FaMapMarkerAlt, FaUser, FaMoneyBill } from "react-icons/fa";
import marketplaceService from "../services/marketplace.api";

const MarketplaceCard = ({ item }) => (
  <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md transition">
    <div className="flex justify-between items-start">
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
        {item.title}
      </h3>
      <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
        {item.listingType}
      </span>
    </div>

    <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 line-clamp-2">
      {item.description}
    </p>

    <div className="flex items-center gap-2 mt-3 text-sm text-zinc-500">
      <FaMapMarkerAlt />
      <span>{item.location || "Remote"}</span>
    </div>

    <div className="flex items-center justify-between mt-4">
      <div className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
        <FaMoneyBill />
        <span>
          {item.price ? `$${item.price}` : item.budgetRange || "Negotiable"}
        </span>
      </div>

      <div className="flex items-center gap-2 text-xs text-zinc-500">
        <FaUser />
        <span>{item.applicationCount || 0} applicants</span>
      </div>
    </div>
  </div>
);

MarketplaceCard.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    listingType: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    price: PropTypes.number,
    budgetRange: PropTypes.string,
    applicationCount: PropTypes.number,
  }).isRequired,
};

const MarketplaceGrid = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchMarketplace = async () => {
      try {
        const res = await marketplaceService.getAll();

        if (mounted) {
          setItems(res.data || res);
        }
      } catch (err) {
        console.error("Marketplace fetch error:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchMarketplace();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-40 rounded-xl bg-zinc-200 dark:bg-zinc-800 animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <MarketplaceCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default MarketplaceGrid;