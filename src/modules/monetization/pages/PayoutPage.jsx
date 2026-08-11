// src/modules/monetization/pages/PayoutPage.jsx

import { useEffect, useState } from "react";
import monetizationApi from "../services/monetization.api";

const METHODS = [
  "Bank Transfer",
  "PayPal",
  "Peach Payments",
  "Crypto"
];

export default function PayoutPage() {

  const [wallet, setWallet] = useState(null);

  const [history, setHistory] = useState([]);

  const [loading, setLoading] = useState(true);

  const [processing, setProcessing] = useState(false);

  const [form, setForm] = useState({
    amount: "",
    method: "Bank Transfer"
  });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {

    try {

      const walletRes =
        await monetizationApi.getWallet();

      const payoutRes =
        await monetizationApi.getPayouts();

      setWallet(walletRes.data);

      setHistory(
        payoutRes.data || []
      );

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  }

  function change(e) {

    setForm(prev => ({
      ...prev,
      [e.target.name]:
      e.target.value
    }));

  }

  async function submit(e) {

    e.preventDefault();

    try {

      setProcessing(true);

      await monetizationApi.withdraw({
        amount:Number(form.amount),
        method:form.method
      });

      alert(
        "Withdrawal request submitted."
      );

      setForm({
        amount:"",
        method:"Bank Transfer"
      });

      loadData();

    } catch(err){

      alert(
        err.response?.data?.message ||
        "Unable to request payout."
      );

    } finally {

      setProcessing(false);

    }

  }

  if(loading){

    return (
      <div className="flex justify-center py-20">
        Loading...
      </div>
    );

  }

  return (

<div className="max-w-6xl mx-auto p-8">

<h1 className="text-3xl font-bold mb-8">

Withdraw Earnings

</h1>

<div className="grid md:grid-cols-3 gap-5 mb-8">

<div className="bg-white rounded-xl shadow p-6">

<p className="text-zinc-500">
Available
</p>

<h2 className="text-3xl font-bold text-green-600">

R {wallet?.available ?? 0}

</h2>

</div>

<div className="bg-white rounded-xl shadow p-6">

<p className="text-zinc-500">
Pending
</p>

<h2 className="text-3xl font-bold text-yellow-500">

R {wallet?.pending ?? 0}

</h2>

</div>

<div className="bg-white rounded-xl shadow p-6">

<p className="text-zinc-500">
Minimum Withdrawal
</p>

<h2 className="text-3xl font-bold">

R100

</h2>

</div>

</div>

<form
onSubmit={submit}
className="bg-white rounded-xl shadow p-8 mb-8 space-y-6"
>

<div>

<label className="font-semibold">

Amount

</label>

<input
type="number"
name="amount"
min="100"
step="1"
required
value={form.amount}
onChange={change}
className="w-full border rounded-xl p-3 mt-2"
/>

</div>

<div>

<label className="font-semibold">

Withdrawal Method

</label>

<select
name="method"
value={form.method}
onChange={change}
className="w-full border rounded-xl p-3 mt-2"
>

{METHODS.map(method=>(

<option
key={method}
value={method}
>

{method}

</option>

))}

</select>

</div>

<button
disabled={processing}
className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8 py-3"
>

{processing
? "Submitting..."
: "Request Withdrawal"}

</button>

</form>

<div className="bg-white rounded-xl shadow">

<div className="border-b p-5">

<h2 className="text-xl font-bold">

Withdrawal History

</h2>

</div>

<table className="w-full">

<thead>

<tr className="border-b">

<th className="text-left p-4">
Date
</th>

<th className="text-left p-4">
Amount
</th>

<th className="text-left p-4">
Method
</th>

<th className="text-left p-4">
Status
</th>

</tr>

</thead>

<tbody>

{history.length===0 && (

<tr>

<td
colSpan={4}
className="text-center p-10 text-zinc-500"
>

No withdrawals yet.

</td>

</tr>

)}

{history.map(item=>(

<tr
key={item.id}
className="border-b"
>

<td className="p-4">

{new Date(
item.createdAt
).toLocaleDateString()}

</td>

<td className="p-4">

R {item.amount}

</td>

<td className="p-4">

{item.method}

</td>

<td className="p-4">

<span
className={`px-3 py-1 rounded-full text-sm
${
item.status==="paid"
?"bg-green-100 text-green-700"
:item.status==="pending"
?"bg-yellow-100 text-yellow-700"
:item.status==="processing"
?"bg-blue-100 text-blue-700"
:"bg-red-100 text-red-700"
}`}
>

{item.status}

</span>

</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

  );

}