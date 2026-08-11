const features = [

  "Social Networking (Posts, Reels, Stories)",

  "Creator Economy (Podcasts, Watch Parties, Monetization)",

  "Marketplace & Business Tools",

  "Wallet System (Tokens + Vouchers)",

  "Real-time Messaging & Notifications",

  "Admin + Analytics Dashboard"

];

export default function LandingFeatures() {

  return (

    <section className="w-full py-20 bg-white text-black text-center">

      <h2 className="text-3xl font-bold">
        Platform Features
      </h2>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 px-10">

        {features.map((f, i) => (

          <div key={i} className="p-6 border rounded-xl shadow">

            {f}

          </div>

        ))}

      </div>

    </section>

  );

}