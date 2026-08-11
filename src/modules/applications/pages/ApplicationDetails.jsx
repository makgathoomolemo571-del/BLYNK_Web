import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import applicationApi from "../services/application.api";
import { useLocation } from "react-router-dom";
import creatorHireApi from "../../creatorHire/services/creatorHire.api";

export default function ApplicationDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [application, setApplication] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadApplication();
  }, [id]);

async function loadApplication() {
  try {
    setLoading(true);

    let res;

    if (location.pathname.startsWith("/business-find")) {
      res = await applicationApi.getCampaignApplications(id);
    } else if (location.pathname.startsWith("/creator-hire")) {
      console.log("CREATOR JOB ID:", id);

      res = await applicationApi.getJobApplications(id);
    }

    console.log("FULL RESPONSE:", res);
console.log("DATA:", res?.data);
console.log("TYPE:", typeof res);

let result = res?.data ?? res ?? [];

if (Array.isArray(result)) {
  result = result[0] || {};
}

setApplication(result);
    setError("");

  } catch (err) {
    console.error(err);
    setError(err.response?.data?.message || "Unable to load application");
  } finally {
    setLoading(false);
  }
}

  async function changeStatus(status) {
    try {

      setProcessing(true);

      await applicationApi.updateStatus(application.id, status);

      loadApplication();

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Unable to update application."
      );

    } finally {

      setProcessing(false);

    }
  }

  async function withdrawApplication() {

    if (
      !window.confirm(
        "Withdraw this application?"
      )
    ) return;

    try {

      setProcessing(true);

      await applicationApi.withdraw(id);

      navigate("/applications/my");

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Unable to withdraw application."
      );

    } finally {

      setProcessing(false);

    }

  }

  if (loading)
    return (
      <div className="p-10 text-center">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="p-10 text-red-600 text-center">
        {error}
      </div>
    );

  return (

    <div className="max-w-5xl mx-auto p-8">

      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow">

        <div className="border-b p-6">

          <h1 className="text-2xl font-bold">

            Application

          </h1>

          <p className="text-sm text-zinc-500 mt-2">

            Status

          </p>

          <span
            className={`inline-block mt-2 px-4 py-2 rounded-full text-sm font-semibold
            ${
              application.status === "accepted"
                ? "bg-green-600 text-white"
                : application.status === "rejected"
                ? "bg-red-600 text-white"
                : application.status === "withdrawn"
                ? "bg-zinc-500 text-white"
                : application.status === "reviewed"
                ? "bg-yellow-500 text-black"
                : "bg-blue-600 text-white"
            }`}
          >

            {application.status}

          </span>

        </div>

        <div className="grid md:grid-cols-2 gap-8 p-8">

          <div>

            <h3 className="font-bold mb-2">

              Target

            </h3>

            <p>{application.targetType}</p>

            <p className="text-xs text-zinc-500 mt-2">

              {application.targetId}

            </p>

            <h3 className="font-bold mt-8 mb-2">

              Proposal

            </h3>

            <p className="whitespace-pre-wrap">

              {application.proposal || "-"}

            </p>

            <h3 className="font-bold mt-8 mb-2">

              Message

            </h3>

            <p className="whitespace-pre-wrap">

              {application.message || "-"}

            </p>

          </div>

          <div>

            <h3 className="font-bold mb-2">

              Deliverables

            </h3>

            <p className="whitespace-pre-wrap">

              {application.deliverables || "-"}

            </p>

            <h3 className="font-bold mt-8 mb-2">

              Proposed Price

            </h3>

            <p className="text-3xl font-bold text-green-600">

              R
              {application.proposedPrice || 0}

            </p>

            <h3 className="font-bold mt-8 mb-2">

              Submitted

            </h3>

            <p>

              {new Date(
                application.createdAt
              ).toLocaleString()}

            </p>

          </div>

        </div>

        <div className="border-t p-6 flex flex-wrap gap-3">

          <button
            disabled={processing}
            onClick={() => changeStatus("reviewed")}
            className="px-5 py-3 rounded-lg bg-yellow-500 text-black"
          >

            Mark Reviewed

          </button>

          <button
            disabled={processing}
            onClick={() => changeStatus("accepted")}
            className="px-5 py-3 rounded-lg bg-green-600 text-white"
          >

            Accept

          </button>

          <button
            disabled={processing}
            onClick={() => changeStatus("rejected")}
            className="px-5 py-3 rounded-lg bg-red-600 text-white"
          >

            Reject

          </button>

          <button
            disabled={processing}
            onClick={withdrawApplication}
            className="px-5 py-3 rounded-lg bg-zinc-800 text-white"
          >

            Withdraw

          </button>

        </div>

      </div>

    </div>

  );
}