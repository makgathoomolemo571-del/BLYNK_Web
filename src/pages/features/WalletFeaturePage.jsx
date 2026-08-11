export default function WalletFeaturePage() {

  return (

    <div className="max-w-6xl mx-auto py-16 px-6">

      <h1 className="text-5xl font-bold mb-8">
        Wallet & Rewards
      </h1>

      <p className="text-lg text-gray-600 mb-10">

        Store funds, receive creator earnings,
        loyalty rewards and subscription income.

      </p>

      <div className="grid md:grid-cols-2 gap-8">

        <div className="border rounded-xl p-6">

          <h2 className="font-bold text-2xl mb-4">
            Wallet
          </h2>

          <ul className="space-y-2">
            <li>• Deposits</li>
            <li>• Purchases</li>
            <li>• Revenue</li>
            <li>• Transfers</li>
          </ul>

        </div>

        <div className="border rounded-xl p-6">

          <h2 className="font-bold text-2xl mb-4">
            Rewards
          </h2>

          <ul className="space-y-2">
            <li>• Loyalty Points</li>
            <li>• Cashback</li>
            <li>• Coupons</li>
            <li>• Promotions</li>
          </ul>

        </div>

      </div>

    </div>

  );

}