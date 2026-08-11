export default function CreatorStudioFeaturePage() {

  return (

    <div className="max-w-6xl mx-auto py-16 px-6">

      <h1 className="text-5xl font-bold mb-8">
        Creator Studio
      </h1>

      <p className="text-lg text-gray-600 mb-10">

        Everything creators need to publish,
        monetize and manage their content.

      </p>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="border rounded-xl p-6">

          <h2 className="text-xl font-bold mb-3">
            Content
          </h2>

          <p>
            Posts, reels, podcasts and livestreams.
          </p>

        </div>

        <div className="border rounded-xl p-6">

          <h2 className="text-xl font-bold mb-3">
            Monetization
          </h2>

          <p>
            Ads, subscriptions, gifts,
            sponsorships and marketplace sales.
          </p>

        </div>

        <div className="border rounded-xl p-6">

          <h2 className="text-xl font-bold mb-3">
            Analytics
          </h2>

          <p>
            Audience growth, earnings,
            engagement and insights.
          </p>

        </div>

      </div>

    </div>

  );

}