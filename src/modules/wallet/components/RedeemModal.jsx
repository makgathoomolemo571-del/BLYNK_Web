// modules/wallet/components/RedeemModal.jsx

import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { X, Gift, Ticket, Coins } from "lucide-react";

const voucherOptions = [
  {
    id: "airtime",
    title: "Airtime Voucher",
    description: "Redeem wallet balance for airtime.",
    icon: <Ticket size={18} />,
    min: 20,
  },
  {
    id: "shopping",
    title: "Shopping Voucher",
    description: "Redeem for retail shopping vouchers.",
    icon: <Gift size={18} />,
    min: 50,
  },
  {
    id: "fuel",
    title: "Fuel Voucher",
    description: "Redeem fuel vouchers.",
    icon: <Gift size={18} />,
    min: 100,
  },
  {
    id: "vig",
    title: "Convert To VIG Points",
    description: "Convert Wallet Balance into VIG Rewards.",
    icon: <Coins size={18} />,
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
        useState(voucherOptions[0].id);

    const [amount, setAmount] =
        useState("");

    const balance =
        wallet?.balance || 0;

    const selectedVoucher =
        useMemo(
            () =>
                voucherOptions.find(
                    v => v.id === selected
                ),
            [selected]
        );

    const error =
        useMemo(() => {

            const value =
                Number(amount);

            if (!amount)
                return "";

            if (value <= 0)
                return "Enter a valid amount.";

            if (value < selectedVoucher.min)
                return `Minimum redemption is R${selectedVoucher.min}`;

            if (value > balance)
                return "Insufficient wallet balance.";

            return "";

        }, [
            amount,
            balance,
            selectedVoucher,
        ]);

    const submit = () => {

        if (error) return;

        onRedeem({

            type: selected,

            amount:
                Number(amount),

        });

    };

    if (!open)
        return null;

    return (

<div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

<div className="bg-white dark:bg-zinc-900 rounded-2xl w-full max-w-lg">

<div className="flex justify-between items-center border-b p-5">

<h2 className="font-bold text-xl">
Redeem Wallet
</h2>

<button
onClick={onClose}
className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
>
<X size={20}/>
</button>

</div>

<div className="p-6 space-y-5">

<div className="rounded-xl bg-green-50 dark:bg-green-950 p-4">

<div className="text-sm text-zinc-500">
Available Balance
</div>

<div className="text-3xl font-bold text-green-600">

R {balance.toLocaleString()}

</div>

</div>

<div>

<label className="font-medium">

Voucher Type

</label>

<div className="grid gap-3 mt-3">

{voucherOptions.map(item=>(

<button
key={item.id}
type="button"
onClick={()=>
setSelected(item.id)
}
className={`border rounded-xl p-4 text-left transition

${
selected===item.id

?

"border-blue-600 bg-blue-50 dark:bg-blue-950"

:

"border-zinc-200 dark:border-zinc-700"

}`}
>

<div className="flex items-center gap-3">

{item.icon}

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

))}

</div>

</div>

<div>

<label className="font-medium">

Redeem Amount (R)

</label>

<input

type="number"

value={amount}

onChange={e=>
setAmount(
e.target.value
)
}

placeholder="0.00"

className="w-full mt-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-3 outline-none"

/>

{error && (

<p className="text-red-500 text-sm mt-2">

{error}

</p>

)}

</div>

<div className="rounded-xl bg-zinc-100 dark:bg-zinc-800 p-4">

<div className="text-sm">

Redeeming:

</div>

<div className="font-semibold mt-1">

{selectedVoucher.title}

</div>

</div>

</div>

<div className="flex justify-end gap-3 border-t p-5">

<button

onClick={onClose}

className="px-5 py-3 rounded-xl border"

>

Cancel

</button>

<button

disabled={!!error || loading}

onClick={submit}

className="px-6 py-3 rounded-xl bg-blue-600 text-white disabled:opacity-50"

>

{loading

?

"Processing..."

:

"Redeem"}

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

        balance: PropTypes.number,

    }),

    onClose: PropTypes.func.isRequired,

    onRedeem: PropTypes.func.isRequired,

};

RedeemModal.defaultProps = {

    loading: false,

    wallet: {

        balance: 0,

    },

};