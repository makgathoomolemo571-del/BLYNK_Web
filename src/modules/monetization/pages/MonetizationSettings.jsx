// src/modules/monetization/pages/MonetizationSettings.jsx

import { useEffect, useState } from "react";
import monetizationApi from "../services/monetization.api";

export default function MonetizationSettings() {

  const [loading, setLoading] = useState(false);

  const [saving, setSaving] = useState(false);

  const [settings, setSettings] = useState({

    adsEnabled: true,

    subscriptionsEnabled: true,

    tipsEnabled: true,

    giftsEnabled: true,

    affiliateEnabled: true,

    creatorFund: false,

    membershipPrice: 49.99,

    minimumWithdrawal: 100,

    currency: "ZAR",

    payoutMethod: "bank",

    autoWithdraw: false,

    visibility: "public"

  });

  useEffect(() => {

    loadSettings();

  }, []);

  async function loadSettings() {

    try {

      setLoading(true);

      const { data } =
        await monetizationApi.getSettings();

      setSettings(data);

    } catch (e) {

      console.log(e);

    } finally {

      setLoading(false);

    }

  }

  function change(e) {

    const { name, value, type, checked } = e.target;

    setSettings(prev => ({

      ...prev,

      [name]:
        type === "checkbox"
          ? checked
          : value

    }));

  }

  async function save() {

    try {

      setSaving(true);

      await monetizationApi.updateSettings(settings);

      alert("Settings updated.");

    } catch (e) {

      alert(
        e.response?.data?.message ||
        "Unable to save."
      );

    } finally {

      setSaving(false);

    }

  }

  if (loading)
    return (
      <div className="p-10 text-center">
        Loading...
      </div>
    );

  return (

    <div className="max-w-5xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">

        Monetization Settings

      </h1>

      <div className="bg-white rounded-xl shadow p-8 space-y-8">

        <section>

          <h2 className="text-xl font-bold mb-4">

            Revenue Sources

          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            {[
              ["adsEnabled","Advertisement Revenue"],
              ["subscriptionsEnabled","Subscriptions"],
              ["tipsEnabled","Tips"],
              ["giftsEnabled","Virtual Gifts"],
              ["affiliateEnabled","Affiliate Revenue"],
              ["creatorFund","Creator Fund"]
            ].map(item=>(

              <label
                key={item[0]}
                className="flex items-center justify-between border rounded-xl p-4"
              >

                <span>{item[1]}</span>

                <input
                  type="checkbox"
                  name={item[0]}
                  checked={settings[item[0]]}
                  onChange={change}
                />

              </label>

            ))}

          </div>

        </section>

        <section>

          <h2 className="text-xl font-bold mb-4">

            Membership

          </h2>

          <input

            className="w-full border rounded-xl p-3"

            type="number"

            step="0.01"

            name="membershipPrice"

            value={settings.membershipPrice}

            onChange={change}

          />

        </section>

        <section>

          <h2 className="text-xl font-bold mb-4">

            Withdrawal

          </h2>

          <div className="grid md:grid-cols-3 gap-5">

            <div>

              <label>

                Minimum Withdrawal

              </label>

              <input

                className="w-full border rounded-xl p-3"

                type="number"

                name="minimumWithdrawal"

                value={settings.minimumWithdrawal}

                onChange={change}

              />

            </div>

            <div>

              <label>

                Currency

              </label>

              <select

                className="w-full border rounded-xl p-3"

                name="currency"

                value={settings.currency}

                onChange={change}

              >

                <option>ZAR</option>

                <option>USD</option>

                <option>EUR</option>

                <option>GBP</option>

              </select>

            </div>

            <div>

              <label>

                Payout Method

              </label>

              <select

                className="w-full border rounded-xl p-3"

                name="payoutMethod"

                value={settings.payoutMethod}

                onChange={change}

              >

                <option value="bank">

                  Bank

                </option>

                <option value="paypal">

                  PayPal

                </option>

                <option value="crypto">

                  Crypto

                </option>

              </select>

            </div>

          </div>

        </section>

        <section>

          <h2 className="text-xl font-bold mb-4">

            Creator Profile

          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            <div>

              <label>

                Visibility

              </label>

              <select

                className="w-full border rounded-xl p-3"

                name="visibility"

                value={settings.visibility}

                onChange={change}

              >

                <option value="public">

                  Public

                </option>

                <option value="followers">

                  Followers

                </option>

                <option value="subscribers">

                  Subscribers

                </option>

                <option value="private">

                  Private

                </option>

              </select>

            </div>

            <label className="flex items-center justify-between border rounded-xl p-4">

              <span>

                Automatic Withdrawals

              </span>

              <input

                type="checkbox"

                name="autoWithdraw"

                checked={settings.autoWithdraw}

                onChange={change}

              />

            </label>

          </div>

        </section>

        <div className="pt-4">

          <button

            onClick={save}

            disabled={saving}

            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-semibold"

          >

            {saving
              ? "Saving..."
              : "Save Settings"}

          </button>

        </div>

      </div>

    </div>

  );

}