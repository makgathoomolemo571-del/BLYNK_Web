// src/modules/monetization/components/SubscriberTable.jsx

import PropTypes from "prop-types";
import { Crown, CheckCircle, Clock } from "lucide-react";

export default function SubscriberTable({
    subscribers = [],
    loading = false
}) {

    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow p-6">
                <p className="text-center text-gray-500">
                    Loading subscribers...
                </p>
            </div>
        );
    }

    if (!subscribers.length) {
        return (
            <div className="bg-white rounded-xl shadow p-6">
                <p className="text-center text-gray-500">
                    No subscribers found.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow overflow-hidden">

            <div className="px-6 py-4 border-b">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <Crown className="text-yellow-500" size={22} />
                    Subscribers
                </h2>
            </div>

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead className="bg-gray-50">

                        <tr>

                            <th className="px-6 py-3 text-left text-sm font-semibold">
                                Subscriber
                            </th>

                            <th className="px-6 py-3 text-left text-sm font-semibold">
                                Plan
                            </th>

                            <th className="px-6 py-3 text-left text-sm font-semibold">
                                Since
                            </th>

                            <th className="px-6 py-3 text-left text-sm font-semibold">
                                Next Billing
                            </th>

                            <th className="px-6 py-3 text-left text-sm font-semibold">
                                Amount
                            </th>

                            <th className="px-6 py-3 text-left text-sm font-semibold">
                                Status
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {subscribers.map((subscriber) => (

                            <tr
                                key={subscriber.id}
                                className="border-b hover:bg-gray-50"
                            >

                                <td className="px-6 py-4">

                                    <div className="flex items-center gap-3">

                                        <img
                                            src={
                                                subscriber.avatar ||
                                                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                    subscriber.name
                                                )}`
                                            }
                                            alt={subscriber.name}
                                            className="w-10 h-10 rounded-full"
                                        />

                                        <div>

                                            <div className="font-semibold">
                                                {subscriber.name}
                                            </div>

                                            <div className="text-xs text-gray-500">
                                                {subscriber.email}
                                            </div>

                                        </div>

                                    </div>

                                </td>

                                <td className="px-6 py-4">
                                    {subscriber.plan}
                                </td>

                                <td className="px-6 py-4">
                                    {subscriber.startedAt}
                                </td>

                                <td className="px-6 py-4">
                                    {subscriber.nextBilling}
                                </td>

                                <td className="px-6 py-4 font-semibold text-green-600">
                                    R {subscriber.amount}
                                </td>

                                <td className="px-6 py-4">

                                    {subscriber.status === "active" ? (

                                        <span className="inline-flex items-center gap-1 text-green-600 font-medium">

                                            <CheckCircle size={16} />

                                            Active

                                        </span>

                                    ) : (

                                        <span className="inline-flex items-center gap-1 text-orange-500 font-medium">

                                            <Clock size={16} />

                                            Pending

                                        </span>

                                    )}

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

SubscriberTable.propTypes = {
    loading: PropTypes.bool,
    subscribers: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            email: PropTypes.string,
            avatar: PropTypes.string,
            plan: PropTypes.string,
            startedAt: PropTypes.string,
            nextBilling: PropTypes.string,
            amount: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ]),
            status: PropTypes.string
        })
    )
};