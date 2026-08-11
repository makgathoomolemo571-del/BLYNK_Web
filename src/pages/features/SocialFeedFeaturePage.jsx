export default function SocialFeedPage() {

  return (

    <div className="max-w-6xl mx-auto py-16 px-6">

      <h1 className="text-5xl font-bold mb-8">
        Social Feed
      </h1>

      <p className="text-lg text-gray-600 mb-10">
        Share posts, photos, videos and updates with
        friends, followers and the world.
      </p>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="border rounded-xl p-6">
          <h2 className="font-bold text-xl mb-3">
            Create Posts
          </h2>
          <p>
            Publish text, images, videos and polls.
          </p>
        </div>

        <div className="border rounded-xl p-6">
          <h2 className="font-bold text-xl mb-3">
            Engage
          </h2>
          <p>
            Like, comment, share and save content.
          </p>
        </div>

        <div className="border rounded-xl p-6">
          <h2 className="font-bold text-xl mb-3">
            Discover
          </h2>
          <p>
            Explore trending creators and communities.
          </p>
        </div>

      </div>

    </div>

  );

}