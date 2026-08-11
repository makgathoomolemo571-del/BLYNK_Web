export default function BudgetCard({
  budget = 0,
  currency = "ZAR",
  creatorAmount = 0,
  platformCommission = 0,
  status
}) {

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow p-5 space-y-4">

      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">
          Campaign Budget
        </h3>

        <span className="
          px-3 py-1
          rounded-full
          text-xs
          bg-purple-100
          text-purple-700
          dark:bg-purple-900
          dark:text-purple-300
        ">
          {status}
        </span>
      </div>


      <div className="text-3xl font-bold">
        {currency} {budget.toLocaleString()}
      </div>


      <div className="border-t pt-4 space-y-2">

        <div className="flex justify-between">
          <span className="text-gray-500">
            Creator Reward
          </span>

          <span className="font-semibold">
            {currency} {creatorAmount.toLocaleString()}
          </span>
        </div>


        <div className="flex justify-between">
          <span className="text-gray-500">
            Platform Commission
          </span>

          <span className="font-semibold">
            {currency} {platformCommission.toLocaleString()}
          </span>
        </div>

      </div>

    </div>
  );
}