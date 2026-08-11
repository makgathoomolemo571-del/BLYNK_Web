export default function MarketplaceFeaturePage() {

  return (

    <div className="max-w-6xl mx-auto py-16 px-6">

      <h1 className="text-5xl font-bold mb-8">
        Marketplace
      </h1>

      <p className="text-lg text-gray-600 mb-10">

        Buy, sell and promote products,
        services and digital goods.

      </p>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="border rounded-xl p-6">
          Products
        </div>

        <div className="border rounded-xl p-6">
          Services
        </div>

        <div className="border rounded-xl p-6">
          Digital Downloads
        </div>

        <div className="border rounded-xl p-6">
          Secure Payments
        </div>

        <div className="border rounded-xl p-6">
          Order Tracking
        </div>

        <div className="border rounded-xl p-6">
          Ratings & Reviews
        </div>

      </div>

    </div>

  );

}