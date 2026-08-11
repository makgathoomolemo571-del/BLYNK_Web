import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Calendar,
  Clock,
  Eye,
  Globe,
  Lock,
  Users,
  
  LogIn,
  LogOut,
  Trash2,
} from "lucide-react";

import watchPartyApi from "../services/watchParty.api";

const STATUS_COLORS = {
  scheduled: "bg-yellow-100 text-yellow-700",
  live: "bg-red-100 text-red-700",
  ended: "bg-zinc-200 text-zinc-700",
};

const VISIBILITY = {
  public: <Globe size={16} />,
  private: <Lock size={16} />,
  followers: <Users size={16} />,
  subscribers: <Users size={16} />,
};

export default function WatchPartyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [party, setParty] = useState(null);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    try {
      setLoading(true);

      const data = await watchPartyApi.getWatchParty(id);

setParty(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [id]);

 

 const join = async () => {
    setBusy(true);

    try {
        await watchPartyApi.joinWatchParty(id);
        await load();
    } finally {
        setBusy(false);
    }
};

const leave = async () => {
    setBusy(true);

    try {
        await watchPartyApi.leaveWatchParty(id);
        await load();
    } finally {
        setBusy(false);
    }
};

 
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  if (!party)
    return (
      <div className="flex justify-center items-center h-screen">
        Watch Party not found.
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-6">

      <div className="rounded-2xl overflow-hidden shadow bg-white">

        <img
          src={
            party.thumbnail ||
            "/images/default-watchparty.jpg"
          }
          alt={party.title}
          className="w-full h-[350px] object-cover"
        />

        <div className="p-8">

          <div className="flex items-center justify-between">

            <div>

              <h1 className="text-3xl font-bold">
                {party.title}
              </h1>

              <p className="text-zinc-500 mt-2">
                {party.description}
              </p>

            </div>

            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                STATUS_COLORS[party.status]
              }`}
            >
              {party.status.toUpperCase()}
            </span>

          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-8">

            <div className="flex items-center gap-2">
              <Eye size={18} />
              <span>{party.viewerCount}</span>
            </div>

            <div className="flex items-center gap-2">
              {VISIBILITY[party.visibility]}
              <span>{party.visibility}</span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>
                {new Date(
                  party.createdAt
                ).toLocaleDateString()}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Clock size={18} />
              <span>
                {party.startedAt
                  ? new Date(
                      party.startedAt
                    ).toLocaleTimeString()
                  : "--"}
              </span>
            </div>

          </div>

          <div className="flex flex-wrap gap-4 mt-10">

            {party.status === "scheduled" && (
              <button
    disabled
    className="bg-zinc-400 text-white px-5 py-3 rounded-xl"
>
    Reminder
</button>
            )}

            {party.status === "live" && (
              <>
                <button
    disabled={busy}
    onClick={join}
    className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl"
>
    Join Live
</button>

                <button
                  disabled={busy}
                  onClick={leave}
                  className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-5 py-3 rounded-xl"
                >
                  <LogOut size={18} />
                  Leave
                </button>

                
              </>
            )}

           

          </div>

        </div>

      </div>

    </div>
  );
}