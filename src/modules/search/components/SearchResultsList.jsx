import React, { memo } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const SearchResultsList = ({
  results,
  loading = false,
  emptyMessage = "No results found."
}) => {
  const navigate = useNavigate();

  const sections = [
    {
      title: "Users",
      key: "users",
      route: (item) => `/profile/${item._id || item.id}`,
      label: (item) => item.username
    },
    {
      title: "Creators",
      key: "creators",
      route: (item) => `/profile/${item._id || item.id}`,
      label: (item) => item.username
    },
    {
      title: "Businesses",
      key: "businesses",
      route: (item) => `/profile/${item._id || item.id}`,
      label: (item) => item.username
    },
    {
      title: "Posts",
      key: "posts",
      route: (item) => `/posts/${item._id || item.id}`,
      label: (item) => item.caption
    },
    {
      title: "Reels",
      key: "reels",
      route: (item) => `/reels/${item._id || item.id}`,
      label: (item) => item.caption
    },
    {
      title: "Podcasts",
      key: "podcasts",
      route: (item) => `/podcasts/${item._id || item.id}`,
      label: (item) => item.title
    },
    {
      title: "Marketplace",
      key: "marketplace",
      route: (item) => `/marketplace/${item._id || item.id}`,
      label: (item) => item.title
    },
    {
      title: "Creator Hire",
      key: "creatorHires",
      route: (item) => `/creator-hire/${item._id || item.id}`,
      label: (item) => item.projectTitle
    },
    {
      title: "Business Find",
      key: "businessFinds",
      route: (item) => `/business-find/${item._id || item.id}`,
      label: (item) => item.campaignName
    }
  ];

  if (loading) {
    return (
      <div className="flex justify-center py-8 text-gray-500">
        Searching...
      </div>
    );
  }

  const hasResults = sections.some(
    (section) =>
      Array.isArray(results?.[section.key]) &&
      results[section.key].length > 0
  );

  if (!hasResults) {
    return (
      <div className="py-10 text-center text-gray-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {sections.map((section) => {

        const list = results?.[section.key] || [];

        if (!list.length) return null;

        return (
          <section key={section.key}>

            <h2 className="mb-3 text-lg font-semibold">
              {section.title}
            </h2>

            <div className="space-y-2">

              {list.map((item) => (

                <button
                  key={item._id || item.id}
                  type="button"
                  onClick={() =>
                    navigate(section.route(item))
                  }
                  className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white p-4 text-left transition hover:border-blue-500 hover:bg-blue-50"
                >

                  <div>

                    <div className="font-medium">
                      {section.label(item)}
                    </div>

                    <div className="mt-1 text-sm text-gray-500">
                      {item.username ||
                        item.title ||
                        item.caption ||
                        item.projectTitle ||
                        item.campaignName}
                    </div>

                  </div>

                </button>

              ))}

            </div>

          </section>
        );

      })}

    </div>
  );
};

SearchResultsList.propTypes = {
  loading: PropTypes.bool,
  emptyMessage: PropTypes.string,
  results: PropTypes.shape({
    users: PropTypes.array,
    creators: PropTypes.array,
    businesses: PropTypes.array,
    posts: PropTypes.array,
    reels: PropTypes.array,
    podcasts: PropTypes.array,
    marketplace: PropTypes.array,
    creatorHires: PropTypes.array,
    businessFinds: PropTypes.array
  }).isRequired
};

export default memo(SearchResultsList);