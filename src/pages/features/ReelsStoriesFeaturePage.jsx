export default function ReelsStoriesPage() {

  return (

    <div className="max-w-6xl mx-auto py-16 px-6">

      <h1 className="text-5xl font-bold mb-8">
        Reels & Stories
      </h1>

      <p className="text-lg text-gray-600 mb-10">
        Create short videos and 24-hour stories to
        engage your audience.
      </p>

      <div className="grid md:grid-cols-2 gap-8">

        <div className="border rounded-xl p-6">

          <h2 className="text-2xl font-bold mb-3">
            Reels
          </h2>

          <p>
            Vertical videos with music,
            effects and creator monetization.
          </p>

        </div>

        <div className="border rounded-xl p-6">

          <h2 className="text-2xl font-bold mb-3">
            Stories
          </h2>

          <p>
            Temporary content that disappears
            after 24 hours.
          </p>

        </div>

      </div>

    </div>

  );

}