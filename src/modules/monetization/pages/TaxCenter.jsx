import { useEffect, useState } from "react";
import monetizationApi from "../services/monetization.api";

export default function TaxCenter() {
  const [loading, setLoading] = useState(true);

  const [tax, setTax] = useState({
    taxNumber: "",
    country: "South Africa",
    vatRegistered: false,
    taxStatus: "Individual",
    withholdingTax: 0,
    totalEarnings: 0,
    taxableIncome: 0,
    estimatedTax: 0,
    nextTaxDate: "",
    documents: []
  });

  useEffect(() => {
    loadTax();
  }, []);

  const loadTax = async () => {
    try {
      const data = await monetizationApi.getTax();

      setTax(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateTax = async () => {
    try {
      await monetizationApi.updateTax(tax);

      alert("Tax information updated.");
    } catch (err) {
      alert(
        err?.response?.data?.message ||
          "Unable to update tax information."
      );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        Loading Tax Center...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-8">
        Tax Center
      </h1>

      <div className="grid lg:grid-cols-2 gap-8">

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-semibold mb-6">
            Tax Information
          </h2>

          <div className="space-y-5">

            <div>

              <label className="font-medium block mb-2">
                Tax Number
              </label>

              <input
                className="w-full border rounded-lg p-3"
                value={tax.taxNumber}
                onChange={(e) =>
                  setTax({
                    ...tax,
                    taxNumber: e.target.value
                  })
                }
              />

            </div>

            <div>

              <label className="font-medium block mb-2">
                Country
              </label>

              <input
                className="w-full border rounded-lg p-3"
                value={tax.country}
                onChange={(e) =>
                  setTax({
                    ...tax,
                    country: e.target.value
                  })
                }
              />

            </div>

            <div>

              <label className="font-medium block mb-2">
                Tax Status
              </label>

              <select
                className="w-full border rounded-lg p-3"
                value={tax.taxStatus}
                onChange={(e) =>
                  setTax({
                    ...tax,
                    taxStatus: e.target.value
                  })
                }
              >

                <option>Individual</option>

                <option>Business</option>

                <option>Company</option>

              </select>

            </div>

            <div className="flex items-center gap-3">

              <input
                type="checkbox"
                checked={tax.vatRegistered}
                onChange={(e) =>
                  setTax({
                    ...tax,
                    vatRegistered:
                      e.target.checked
                  })
                }
              />

              <span>
                VAT Registered
              </span>

            </div>

            <button
              onClick={updateTax}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-3"
            >
              Save Tax Information
            </button>

          </div>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-semibold mb-6">
            Tax Summary
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between">

              <span>Total Earnings</span>

              <strong>
                R
                {Number(
                  tax.totalEarnings
                ).toLocaleString()}
              </strong>

            </div>

            <div className="flex justify-between">

              <span>Taxable Income</span>

              <strong>
                R
                {Number(
                  tax.taxableIncome
                ).toLocaleString()}
              </strong>

            </div>

            <div className="flex justify-between">

              <span>Estimated Tax</span>

              <strong className="text-red-600">
                R
                {Number(
                  tax.estimatedTax
                ).toLocaleString()}
              </strong>

            </div>

            <div className="flex justify-between">

              <span>Withholding Tax</span>

              <strong>
                {tax.withholdingTax}%
              </strong>

            </div>

            <div className="flex justify-between">

              <span>Next Filing Date</span>

              <strong>
                {tax.nextTaxDate ||
                  "-"}
              </strong>

            </div>

          </div>

        </div>

      </div>

      <div className="mt-10 bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-semibold mb-5">
          Tax Documents
        </h2>

        {tax.documents?.length === 0 ? (

          <div className="text-zinc-500">
            No tax documents uploaded.
          </div>

        ) : (

          <div className="space-y-3">

            {tax.documents.map((doc) => (

              <div
                key={doc.id}
                className="flex justify-between border rounded-lg p-4"
              >

                <div>

                  <div className="font-medium">
                    {doc.name}
                  </div>

                  <div className="text-sm text-zinc-500">
                    {doc.date}
                  </div>

                </div>

                <button className="text-blue-600">
                  Download
                </button>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}