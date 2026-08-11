import { Link } from "react-router-dom";

export default function Support() {

  return (

    <div className="max-w-5xl mx-auto p-8">


      <h1 className="text-4xl font-bold mb-6">
        Support Center
      </h1>


      <p className="text-zinc-600 leading-7">
        Need help? Our support team is here to assist you.
      </p>


      <div className="mt-8 space-y-4">


        <div className="border rounded-xl p-5">

          <h2 className="font-bold">
            Account Support
          </h2>

          <p className="text-zinc-600">
            Problems with login, profile or account settings.
          </p>

        </div>


        <div className="border rounded-xl p-5">

          <h2 className="font-bold">
            Creator Support
          </h2>

          <p className="text-zinc-600">
            Help with podcasts, monetization and creator tools.
          </p>

        </div>


        <div className="border rounded-xl p-5">

          <h2 className="font-bold">
            Contact Support
          </h2>

          <p className="text-zinc-600">
            Email: support@blynk.co.za
          </p>

        </div>


      </div>


      <Link
        to="/support/create"
        className="inline-block mt-8 bg-purple-600 text-white px-6 py-3 rounded-xl"
      >
        Create Support Ticket
      </Link>


    </div>

  );
}