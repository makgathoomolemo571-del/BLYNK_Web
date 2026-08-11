export default function ContractCard({
  contract,
  onSign,
  userType
}) {

  return (
    <div className="bg-white rounded-xl shadow p-5">

      <div className="flex justify-between items-center mb-4">

        <h3 className="text-lg font-bold">
          Sponsorship Contract
        </h3>

        <span
          className={
            contract?.signed
            ? "text-green-600"
            : "text-yellow-600"
          }
        >
          {contract?.signed
            ? "Signed"
            : "Pending"}
        </span>

      </div>


      <div className="space-y-3">

        <div>
          <p className="text-sm text-gray-500">
            Contract Document
          </p>

          {contract?.url ? (

            <a
              href={contract.url}
              target="_blank"
              className="text-blue-600 underline"
            >
              View Contract
            </a>

          ) : (

            <p>
              No contract uploaded
            </p>

          )}

        </div>


        <div className="border-t pt-3">

          <p>
            Business:
            <strong>
              {" "}
              {
                contract?.businessSigned
                ? " Approved"
                : " Waiting"
              }
            </strong>
          </p>


          <p>
            Creator:
            <strong>
              {" "}
              {
                contract?.creatorSigned
                ? " Approved"
                : " Waiting"
              }
            </strong>
          </p>

        </div>


        {
          !contract?.signed &&
          onSign &&
          (
            <button
              onClick={onSign}
              className="
                mt-4
                w-full
                bg-purple-600
                text-white
                py-3
                rounded-lg
                font-semibold
              "
            >
              Sign Contract
            </button>
          )
        }

      </div>

    </div>
  );
}