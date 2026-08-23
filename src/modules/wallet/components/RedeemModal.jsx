// modules/wallet/components/RedeemModal.jsx

import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import {
  X,
  Gift,
  Ticket,
  Coins,
  ArrowRight,
} from "lucide-react";

const voucherOptions = [
  {
    id: "airtime",
    title: "Airtime Voucher",
    description:
      "Redeem eligible BLYNK rewards for airtime.",
    icon: <Ticket size={20} />,
    min: 20,
  },
  {
    id: "shopping",
    title: "Shopping Voucher",
    description:
      "Redeem for participating retail vouchers.",
    icon: <Gift size={20} />,
    min: 50,
  },
  {
    id: "fuel",
    title: "Fuel Voucher",
    description:
      "Redeem eligible rewards for fuel vouchers.",
    icon: <Gift size={20} />,
    min: 100,
  },
  {
    id: "vig",
    title: "BLYNK Points",
    description:
      "Convert eligible BLYNK Tokens into BLYNK Points.",
    icon: <Coins size={20} />,
    min: 10,
  },
];

export default function RedeemModal({
  open,
  wallet,
  loading,
  onClose,
  onRedeem,
}) {
  const [selected, setSelected] =
    useState("airtime");

  const [amount, setAmount] =
    useState("");

  if (!open) {
    return null;
  }

  const balance =
    Number(wallet?.balance || 0);

  const tokens =
    Number(wallet?.tokens || 0);

  const points =
    Number(
      wallet?.points ??
      Math.floor(tokens / 100)
    );

  const selectedVoucher =
    voucherOptions.find(
      (voucher) =>
        voucher.id === selected
    ) || voucherOptions[0];

  const error = useMemo(() => {
    const value = Number(amount);

    if (!amount) {
      return "";
    }

    if (!Number.isFinite(value) || value <= 0) {
      return "Enter a valid amount.";
    }

    if (
      selectedVoucher.id !== "vig" &&
      value < selectedVoucher.min
    ) {
      return `Minimum redemption is R${selectedVoucher.min}.`;
    }

    if (
      selectedVoucher.id !== "vig" &&
      value > balance
    ) {
      return "Insufficient wallet balance.";
    }

    return "";
  }, [
    amount,
    balance,
    selectedVoucher,
  ]);

  const submit = () => {
    if (loading || error || !amount) {
      return;
    }

    onRedeem({
      type: selected,
      amount: Number(amount),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">

      <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950">

        {/* HEADER */}

        <div className="flex items-center justify-between border-b border-zinc-200 p-5 dark:border-zinc-800">

          <div>
            <h2 className="text-xl font-bold">
              BLYNK Rewards
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Redeem eligible rewards
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border p-2 transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            <X size={20} />
          </button>

        </div>

        {/* BALANCES */}

        <div className="grid grid-cols-3 gap-3 p-5">

          <div className="rounded-2xl border bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">

            <p className="text-xs text-zinc-500">
              Wallet
            </p>

            <p className="mt-1 text-lg font-bold">
              R {balance.toLocaleString()}
            </p>

          </div>

          <div className="rounded-2xl border bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">

            <p className="text-xs text-zinc-500">
              Tokens
            </p>

            <p className="mt-1 text-lg font-bold">
              {tokens.toLocaleString()}
            </p>

          </div>

          <div className="rounded-2xl border bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">

            <p className="text-xs text-zinc-500">
              Points
            </p>

            <p className="mt-1 text-lg font-bold">
              {points.toLocaleString()}
            </p>

          </div>

        </div>

        {/* ECONOMY */}

        <div className="mx-5 rounded-2xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950/30">

          <p className="mb-3 text-sm font-semibold">
            BLYNK Reward Path
          </p>

          <div className="flex items-center justify-between text-xs font-medium">

            <span>
              Tokens
            </span>

            <ArrowRight size={15} />

            <span>
              Points
            </span>

            <ArrowRight size={15} />

            <span>
              Voucher
            </span>

            <ArrowRight size={15} />

            <span>
              Merchant
            </span>

          </div>

          <p className="mt-3 text-xs text-zinc-500">
            100 BLYNK Tokens = 1 BLYNK Point
          </p>

        </div>

        {/* OPTIONS */}

        <div className="space-y-4 p-5">

          <div>

            <label className="font-semibold">
              Reward Type
            </label>

            <div className="mt-3 grid gap-3">

              {voucherOptions.map(
                (item) => (

                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      setSelected(item.id)
                    }
                    className={`rounded-2xl border p-4 text-left transition ${
                      selected === item.id
                        ? "border-blue-600 bg-blue-50 dark:border-blue-500 dark:bg-blue-950/40"
                        : "border-zinc-200 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
                    }`}
                  >

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border">
                        {item.icon}
                      </div>

                      <div>

                        <div className="font-semibold">
                          {item.title}
                        </div>

                        <div className="text-xs text-zinc-500">
                          {item.description}
                        </div>

                      </div>

                    </div>

                  </button>

                )
              )}

            </div>

          </div>

          <div>

            <label className="font-semibold">
              Redemption Amount
            </label>

            <input
              type="number"
              min="0"
              value={amount}
              onChange={(e) =>
                setAmount(e.target.value)
              }
              placeholder="0.00"
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-transparent px-4 py-3 outline-none focus:border-blue-500 dark:border-zinc-700"
            />

            {error && (
              <p className="mt-2 text-sm text-red-500">
                {error}
              </p>
            )}

          </div>

          <div className="rounded-2xl border bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">

            <p className="text-xs text-zinc-500">
              Selected reward
            </p>

            <p className="mt-1 font-bold">
              {selectedVoucher.title}
            </p>

          </div>

        </div>

        {/* ACTIONS */}

        <div className="flex justify-end gap-3 border-t border-zinc-200 p-5 dark:border-zinc-800">

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border px-5 py-3 font-medium transition hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={
              Boolean(error) ||
              loading ||
              !amount
            }
            onClick={submit}
            className="rounded-xl border border-blue-600 bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Processing..."
              : "Redeem Reward"}
          </button>

        </div>

      </div>

    </div>
  );
}

RedeemModal.propTypes = {
  open: PropTypes.bool.isRequired,

  loading: PropTypes.bool,

  wallet: PropTypes.shape({
    balance: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),

    tokens: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),

    points: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
  }),

  onClose: PropTypes.func.isRequired,

  onRedeem: PropTypes.func.isRequired,
};

RedeemModal.defaultProps = {
  loading: false,

  wallet: {
    balance: 0,
    tokens: 0,
    points: 0,
  },
};