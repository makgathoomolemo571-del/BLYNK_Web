export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto py-16 px-6">

      <h1 className="text-5xl font-bold mb-8">
        About BLYNK
      </h1>

      <p className="text-lg text-gray-600 leading-8">
        BLYNK is an all-in-one social media ecosystem built to connect
        creators, businesses and communities. It combines social
        networking, messaging, live streaming, podcasts,
        marketplace, creator monetization, digital wallet,
        subscriptions, loyalty rewards and business discovery
        into one platform.
      </p>

      <div className="grid md:grid-cols-3 gap-8 mt-16">

        <div className="border rounded-xl p-6">
          <h3 className="text-2xl font-bold mb-3">
            Our Mission
          </h3>

          <p>
            Empower creators and businesses to grow,
            earn and build meaningful communities.
          </p>
        </div>

        <div className="border rounded-xl p-6">
          <h3 className="text-2xl font-bold mb-3">
            Our Vision
          </h3>

          <p>
            Become Africa's leading digital platform
            connecting people through content,
            commerce and entertainment.
          </p>
        </div>

        <div className="border rounded-xl p-6">
          <h3 className="text-2xl font-bold mb-3">
            Our Values
          </h3>

          <p>
            Innovation • Transparency • Community •
            Privacy • Opportunity.
          </p>
        </div>

      </div>

    </div>
  );
}