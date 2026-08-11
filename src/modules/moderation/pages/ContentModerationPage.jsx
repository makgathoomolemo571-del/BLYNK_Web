import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ShieldAlert,
  Ban,
  Trash2,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Clock,
  RefreshCw
} from "lucide-react";

import moderationApi from "../services/moderation.api";

const STATUS_COLORS = {
  pending: "bg-yellow-100 text-yellow-700",
  under_review: "bg-blue-100 text-blue-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  resolved: "bg-gray-200 text-gray-700"
};

const SEVERITY_COLORS = {
  low: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-orange-100 text-orange-700",
  critical: "bg-red-100 text-red-700"
};

export default function ContentModerationPage() {

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [severity, setSeverity] = useState("all");

  const loadReports = async () => {

    try {

      setLoading(true);

      const res =
        await moderationApi.getReports();

      setReports(res.data);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadReports();

  }, []);

  const filtered = useMemo(() => {

    return reports.filter((item) => {

      const matchSearch =
        item.targetType
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        item.reason
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchStatus =
        status === "all" ||
        item.status === status;

      const matchSeverity =
        severity === "all" ||
        item.severity === severity;

      return (
        matchSearch &&
        matchStatus &&
        matchSeverity
      );

    });

  }, [
    reports,
    search,
    status,
    severity
  ]);

  const approve = async (id) => {

    try {

      await moderationApi.approve(id);

      loadReports();

    } catch (err) {

      console.error(err);

    }

  };

  const reject = async (id) => {

    try {

      await moderationApi.reject(id);

      loadReports();

    } catch (err) {

      console.error(err);

    }

  };

  const review = async (
    id,
    action
  ) => {

    try {

      await moderationApi.review(
        id,
        {
          actionTaken: action,
          notes: ""
        }
      );

      loadReports();

    } catch (err) {

      console.error(err);

    }

  };

  return (

    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">

            Content Moderation

          </h1>

          <p className="text-gray-500">

            Review reports and moderate platform content.

          </p>

        </div>

        <button
          onClick={loadReports}
          className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-white"
        >
          <RefreshCw size={18} />
          Refresh
        </button>

      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">

        <div className="relative">

          <Search
            className="absolute left-3 top-3"
            size={18}
          />

          <input

            value={search}

            onChange={(e)=>
              setSearch(
                e.target.value
              )
            }

            placeholder="Search..."

            className="w-full rounded-lg border pl-10 pr-4 py-2"

          />

        </div>

        <select

          value={status}

          onChange={(e)=>
            setStatus(
              e.target.value
            )
          }

          className="rounded-lg border p-2"

        >

          <option value="all">
            All Status
          </option>

          <option value="pending">
            Pending
          </option>

          <option value="approved">
            Approved
          </option>

          <option value="rejected">
            Rejected
          </option>

          <option value="resolved">
            Resolved
          </option>

        </select>

        <select

          value={severity}

          onChange={(e)=>
            setSeverity(
              e.target.value
            )
          }

          className="rounded-lg border p-2"

        >

          <option value="all">
            All Severity
          </option>

          <option value="low">
            Low
          </option>

          <option value="medium">
            Medium
          </option>

          <option value="high">
            High
          </option>

          <option value="critical">
            Critical
          </option>

        </select>

        <div className="flex items-center gap-2 rounded-lg border px-4">

          <Filter size={18} />

          {filtered.length}
          Reports

        </div>

      </div>

      <div className="overflow-hidden rounded-xl border bg-white">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">
                Target
              </th>

              <th className="p-4 text-left">
                Reason
              </th>

              <th className="p-4 text-left">
                Severity
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Created
              </th>

              <th className="p-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {

              loading ?

              (

                <tr>

                  <td
                    colSpan={6}
                    className="p-8 text-center"
                  >

                    Loading...

                  </td>

                </tr>

              )

              :

              filtered.map(
                (item)=>(

                  <tr
                    key={item.id}
                    className="border-t"
                  >

                    <td className="p-4">

                      <div className="font-semibold">

                        {item.targetType}

                      </div>

                      <div className="text-xs text-gray-500">

                        {item.targetId}

                      </div>

                    </td>

                    <td className="p-4">

                      {item.reason}

                    </td>

                    <td className="p-4">

                      <span
                        className={`rounded-full px-3 py-1 text-xs ${SEVERITY_COLORS[item.severity]}`}
                      >

                        {item.severity}

                      </span>

                    </td>

                    <td className="p-4">

                      <span
                        className={`rounded-full px-3 py-1 text-xs ${STATUS_COLORS[item.status]}`}
                      >

                        {item.status}

                      </span>

                    </td>

                    <td className="p-4 text-sm">

                      {new Date(
                        item.createdAt
                      ).toLocaleString()}

                    </td>

                    <td className="p-4">

                      <div className="flex justify-center gap-2 flex-wrap">

                        <button

                          onClick={()=>
                            approve(item.id)
                          }

                          className="rounded bg-green-600 p-2 text-white"

                        >

                          <CheckCircle size={18}/>

                        </button>

                        <button

                          onClick={()=>
                            reject(item.id)
                          }

                          className="rounded bg-red-600 p-2 text-white"

                        >

                          <XCircle size={18}/>

                        </button>

                        <button

                          onClick={()=>
                            review(
                              item.id,
                              "warning"
                            )
                          }

                          className="rounded bg-yellow-600 p-2 text-white"

                        >

                          <AlertTriangle size={18}/>

                        </button>

                        <button

                          onClick={()=>
                            review(
                              item.id,
                              "remove_content"
                            )
                          }

                          className="rounded bg-orange-600 p-2 text-white"

                        >

                          <Trash2 size={18}/>

                        </button>

                        <button

                          onClick={()=>
                            review(
                              item.id,
                              "suspend_user"
                            )
                          }

                          className="rounded bg-purple-700 p-2 text-white"

                        >

                          <Clock size={18}/>

                        </button>

                        <button

                          onClick={()=>
                            review(
                              item.id,
                              "ban_user"
                            )
                          }

                          className="rounded bg-black p-2 text-white"

                        >

                          <Ban size={18}/>

                        </button>

                      </div>

                    </td>

                  </tr>

                )
              )

            }

          </tbody>

        </table>

      </div>

    </div>

  );

}