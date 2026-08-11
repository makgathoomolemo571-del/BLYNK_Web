export default function LandingHero() {

  return (

    <section className="w-full min-h-screen flex flex-col justify-center items-center text-center bg-black text-white">

      <h1 className="text-5xl font-bold">
        BLYNK SOCIAL PLATFORM
      </h1>

      <p className="mt-4 text-lg text-gray-300">
        Social • Creator Economy • Marketplace • Podcasts • Wallet System
      </p>

      <div className="mt-8 flex gap-4">

        <button className="px-6 py-3 bg-white text-black rounded-xl">
          Get Started
        </button>

        <button className="px-6 py-3 border border-white rounded-xl">
          Learn More
        </button>

      </div>

    </section>

  );

}