import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Bookmark } from "lucide-react";

import useUser from "../hooks/useUser";

import PostCard from "../../post/components/PostCard";

const SavedPosts = () => {

  const {
    savedPosts,
    loading,
    loadSavedPosts
  } = useUser();

  useEffect(() => {

    loadSavedPosts();

  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="h-10 w-10 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-4 py-6">

      <div className="flex items-center gap-3 mb-8">

        <Bookmark
          size={28}
          className="text-blue-600"
        />

        <div>

          <h1 className="text-2xl font-bold">
            Saved Posts
          </h1>

          <p className="text-zinc-500">
            Posts you've saved for later.
          </p>

        </div>

      </div>

      {!savedPosts.length ? (

        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow border p-12 text-center">

          <Bookmark
            size={48}
            className="mx-auto mb-4 text-zinc-400"
          />

          <h2 className="text-xl font-semibold mb-2">
            No Saved Posts
          </h2>

          <p className="text-zinc-500 mb-6">
            Start saving posts to easily find them later.
          </p>

          <Link
            to="/feed"
            className="inline-flex px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
          >
            Browse Feed
          </Link>

        </div>

      ) : (

        <div className="space-y-6">

          {savedPosts.map(post => (

            <PostCard
              key={post.id}
              post={post}
            />

          ))}

        </div>

      )}

    </section>
  );

};

export default SavedPosts;