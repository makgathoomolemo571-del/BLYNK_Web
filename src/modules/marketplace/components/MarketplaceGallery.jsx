// modules/marketplace/components/MarketplaceGallery.jsx

import { memo, useMemo, useState } from "react";
import PropTypes from "prop-types";

const PLACEHOLDER =
  "https://via.placeholder.com/600x450?text=BLYNK";

function MarketplaceGallery({ images = [], title }) {
  const gallery = useMemo(() => {
    if (!Array.isArray(images)) return [];
    return images.filter(Boolean);
  }, [images]);

  const [active, setActive] = useState(
    gallery.length ? gallery[0] : PLACEHOLDER
  );

  return (
    <section className="w-full space-y-4">

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <img
          src={active}
          alt={title}
          loading="lazy"
          className="h-[450px] w-full object-cover"
          onError={(e) => {
            e.target.src = PLACEHOLDER;
          }}
        />
      </div>

      {gallery.length > 1 && (
        <div className="grid grid-cols-4 md:grid-cols-6 gap-3">

          {gallery.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActive(image)}
              className={`overflow-hidden rounded-xl border transition
              ${
                active === image
                  ? "border-blue-600 ring-2 ring-blue-500"
                  : "border-gray-200 hover:border-blue-400"
              }`}
            >
              <img
                src={image}
                alt={`${title}-${index}`}
                loading="lazy"
                className="h-24 w-full object-cover"
                onError={(e) => {
                  e.target.src = PLACEHOLDER;
                }}
              />
            </button>
          ))}

        </div>
      )}

    </section>
  );
}

MarketplaceGallery.propTypes = {
  title: PropTypes.string,
  images: PropTypes.arrayOf(
    PropTypes.string
  ),
};

MarketplaceGallery.defaultProps = {
  title: "",
  images: [],
};

export default memo(MarketplaceGallery);