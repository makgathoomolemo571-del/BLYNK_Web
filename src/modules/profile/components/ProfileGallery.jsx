// modules/profile/components/ProfileGallery.jsx

import React from "react";
import { useSelector } from "react-redux";

const ProfileGallery = () => {
  const gallery = useSelector((state) => state.profile.profile?.gallery || []);
  const loading = useSelector((state) => state.profile.loadingPosts);

  if (loading) {
    return (
      <div className="p-4 text-sm text-gray-500">
        Loading gallery...
      </div>
    );
  }
if (!gallery.length) {
  return <div>No posts yet.</div>;
}

return (
  <div className="grid grid-cols-3 gap-2">
    {gallery.map((post) => (
      <div key={post._id}
          className="aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-zinc-800"
        >
          {post.media?.[0] ? (
            <img
              src={post.media?.[0]?.url}
              alt="post"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
              No media
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProfileGallery;