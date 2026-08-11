// src/modules/monetization/pages/TipsPage.jsx

import { useEffect, useState } from "react";
import {
  Heart,
  DollarSign,
  Search,
  Send,
  Gift,
} from "lucide-react";

import monetizationApi from "../services/monetization.api";

export default function TipsPage() {
  const [loading, setLoading] = useState(true);

  const [summary, setSummary] = useState({
    balance: 0,
    received: 0,
    sent: 0,
  });

  const [tips, setTips] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    creator: "",
    amount: "",
    message: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);

      const dashboard =
        await monetizationApi.getDashboard();

      const history =
        await monetizationApi.getTips();

      setSummary({
        balance:
          dashboard.wallet.available,
        received:
          dashboard.tips.received,
        sent:
          dashboard.tips.sent,
      });

      setTips(history);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }
  }

  async function sendTip(e) {

    e.preventDefault();

    try {

      await monetizationApi.sendTip({
        creatorId:
          form.creator,
        amount:
          Number(form.amount),
        message:
          form.message,
      });

      setShowModal(false);

      setForm({
        creator: "",
        amount: "",
        message: "",
      });

      loadData();

    } catch (err) {

      alert(
        err?.response?.data?.message ||
        "Unable to send tip."
      );

    }

  }

  if (loading)
    return (
      <div className="p-10">
        Loading...
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-8">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold">
            Creator Tips
          </h1>

          <p className="text-zinc-500">
            Reward creators instantly.
          </p>

        </div>

        <button
          onClick={() =>
            setShowModal(true)
          }
          className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl px-6 py-3 flex items-center gap-2"
        >
          <Gift size={18} />
          Send Tip
        </button>

      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white rounded-xl shadow p-6">

          <DollarSign
            className="text-green-600 mb-4"
            size={36}
          />

          <p className="text-zinc-500">
            Wallet
          </p>

          <h2 className="text-3xl font-bold">
            R {summary.balance}
          </h2>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <Heart
            className="text-pink-600 mb-4"
            size={36}
          />

          <p className="text-zinc-500">
            Tips Received
          </p>

          <h2 className="text-3xl font-bold">
            R {summary.received}
          </h2>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <Send
            className="text-blue-600 mb-4"
            size={36}
          />

          <p className="text-zinc-500">
            Tips Sent
          </p>

          <h2 className="text-3xl font-bold">
            R {summary.sent}
          </h2>

        </div>

      </div>

      <div className="bg-white rounded-xl shadow">

        <div className="p-5 border-b">

          <h2 className="text-xl font-bold">
            Tip History
          </h2>

        </div>

        {tips.length === 0 && (

          <div className="p-8 text-center text-zinc-500">

            No tips yet.

          </div>

        )}

        {tips.map((tip) => (

          <div
            key={tip.id}
            className="flex justify-between items-center border-b px-6 py-4"
          >

            <div>

              <h3 className="font-semibold">
                {tip.creatorName}
              </h3>

              <p className="text-sm text-zinc-500">
                {tip.message}
              </p>

            </div>

            <div className="text-right">

              <p className="font-bold text-green-600">
                R {tip.amount}
              </p>

              <small>
                {new Date(
                  tip.createdAt
                ).toLocaleDateString()}
              </small>

            </div>

          </div>

        ))}

      </div>

      {showModal && (

        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

          <form
            onSubmit={sendTip}
            className="bg-white rounded-xl w-full max-w-lg p-8 space-y-5"
          >

            <h2 className="text-2xl font-bold">

              Send Tip

            </h2>

            <div className="relative">

              <Search
                className="absolute left-3 top-3 text-zinc-400"
                size={18}
              />

              <input
                className="w-full border rounded-xl pl-10 p-3"
                placeholder="Creator ID"
                value={form.creator}
                onChange={(e)=>
                  setForm({
                    ...form,
                    creator:e.target.value
                  })
                }
              />

            </div>

            <input
              type="number"
              placeholder="Amount"
              className="w-full border rounded-xl p-3"
              value={form.amount}
              onChange={(e)=>
                setForm({
                  ...form,
                  amount:e.target.value
                })
              }
            />

            <textarea
              rows={4}
              placeholder="Message"
              className="w-full border rounded-xl p-3"
              value={form.message}
              onChange={(e)=>
                setForm({
                  ...form,
                  message:e.target.value
                })
              }
            />

            <div className="flex justify-end gap-3">

              <button
                type="button"
                onClick={() =>
                  setShowModal(false)
                }
                className="border rounded-xl px-5 py-3"
              >
                Cancel
              </button>

              <button
                className="bg-purple-600 text-white rounded-xl px-5 py-3"
              >
                Send Tip
              </button>

            </div>

          </form>

        </div>

      )}

    </div>
  );
}