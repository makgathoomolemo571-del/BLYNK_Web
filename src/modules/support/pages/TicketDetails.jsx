import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock3,
  User,
  ShieldCheck,
  ArrowLeft,
  Loader2
} from "lucide-react";

import supportApi from "../services/support.api";

const STATUS_COLOR = {
  open: "bg-blue-100 text-blue-700",
  in_progress: "bg-yellow-100 text-yellow-700",
  awaiting_user: "bg-orange-100 text-orange-700",
  resolved: "bg-green-100 text-green-700",
  closed: "bg-gray-200 text-gray-700"
};

const PRIORITY_COLOR = {
  low: "bg-green-100 text-green-700",
  medium: "bg-blue-100 text-blue-700",
  high: "bg-orange-100 text-orange-700",
  urgent: "bg-red-100 text-red-700"
};

export default function TicketDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [ticket, setTicket] = useState(null);

  const [error, setError] = useState("");

  useEffect(() => {

    loadTicket();

  }, [id]);

  async function loadTicket() {

    try {

      setLoading(true);

      const { data } =
        await supportApi.getTicket(id);

      setTicket(data);

    } catch (err) {

      setError(

        err?.response?.data?.message ||

        "Unable to load ticket."

      );

    } finally {

      setLoading(false);

    }

  }

  if (loading) {

    return (

      <div className="flex justify-center items-center h-[60vh]">

        <Loader2 className="w-10 h-10 animate-spin text-blue-600"/>

      </div>

    );

  }

  if (error) {

    return (

      <div className="max-w-5xl mx-auto p-8">

        <div className="rounded-xl bg-red-50 border border-red-200 p-6">

          <div className="flex items-center gap-3">

            <AlertCircle className="text-red-600"/>

            <p>{error}</p>

          </div>

        </div>

      </div>

    );

  }

  return (

    <div className="max-w-6xl mx-auto py-8 px-5">

      <button

        onClick={() => navigate(-1)}

        className="flex items-center gap-2 mb-8 text-blue-600 hover:text-blue-700"

      >

        <ArrowLeft size={18}/>

        Back

      </button>

      <div className="bg-white rounded-2xl shadow-lg border">

        <div className="border-b px-8 py-6 flex justify-between items-center">

          <div>

            <h2 className="text-3xl font-bold">

              {ticket.subject}

            </h2>

            <p className="text-gray-500 mt-2">

              {ticket.ticketNumber}

            </p>

          </div>

          <div className="flex gap-3">

            <span

              className={`px-4 py-2 rounded-full text-sm font-semibold ${STATUS_COLOR[ticket.status]}`}

            >

              {ticket.status.replace("_"," ")}

            </span>

            <span

              className={`px-4 py-2 rounded-full text-sm font-semibold ${PRIORITY_COLOR[ticket.priority]}`}

            >

              {ticket.priority}

            </span>

          </div>

        </div>

        <div className="grid lg:grid-cols-3">

          <div className="lg:col-span-2 p-8 border-r">

            <h3 className="font-bold text-xl mb-4">

              Description

            </h3>

            <div className="whitespace-pre-wrap leading-8 text-gray-700">

              {ticket.description}

            </div>

            {ticket.resolutionNotes && (

              <>

                <hr className="my-8"/>

                <h3 className="font-bold text-xl mb-3">

                  Resolution

                </h3>

                <div className="rounded-xl bg-green-50 border border-green-200 p-5">

                  {ticket.resolutionNotes}

                </div>

              </>

            )}

            {

              ticket.attachments?.length > 0 && (

                <>

                  <hr className="my-8"/>

                  <h3 className="font-bold text-xl mb-4">

                    Attachments

                  </h3>

                  <div className="space-y-3">

                    {

                      ticket.attachments.map(

                        (file,index)=>(

                          <div

                            key={index}

                            className="rounded-lg border p-3"

                          >

                            Attachment {index+1}

                          </div>

                        )

                      )

                    }

                  </div>

                </>

              )

            }

          </div>

          <div className="p-8 space-y-6">

            <div>

              <h4 className="font-semibold mb-2">

                Issue Type

              </h4>

              <p className="capitalize">

                {ticket.issueType}

              </p>

            </div>

            <div>

              <h4 className="font-semibold mb-2">

                Assigned Agent

              </h4>

              <div className="flex items-center gap-2">

                <User size={18}/>

                <span>

                  {

                    ticket.assignedAgent

                    ?

                    ticket.assignedAgent.username ||

                    ticket.assignedAgent

                    :

                    "Not Assigned"

                  }

                </span>

              </div>

            </div>

            <div>

              <h4 className="font-semibold mb-2">

                Created

              </h4>

              <div className="flex items-center gap-2">

                <Calendar size={18}/>

                {

                  new Date(

                    ticket.createdAt

                  ).toLocaleString()

                }

              </div>

            </div>

            <div>

              <h4 className="font-semibold mb-2">

                Updated

              </h4>

              <div className="flex items-center gap-2">

                <Clock3 size={18}/>

                {

                  new Date(

                    ticket.updatedAt

                  ).toLocaleString()

                }

              </div>

            </div>

            {

              ticket.status ===

              "resolved" && (

                <div className="rounded-xl bg-green-100 border border-green-200 p-4 flex items-center gap-3">

                  <CheckCircle2 className="text-green-600"/>

                  Ticket Resolved

                </div>

              )

            }

            {

              ticket.status ===

              "closed" && (

                <div className="rounded-xl bg-gray-100 border border-gray-200 p-4 flex items-center gap-3">

                  <ShieldCheck className="text-gray-600"/>

                  Ticket Closed

                </div>

              )

            }

          </div>

        </div>

      </div>

    </div>

  );

}