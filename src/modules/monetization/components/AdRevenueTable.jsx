// src/modules/monetization/components/AdRevenueTable.jsx

import PropTypes from "prop-types";
import { DollarSign, Eye, MousePointerClick } from "lucide-react";

export default function AdRevenueTable({
    ads = []
}) {
    return (
        <div className="bg-white rounded-2xl shadow border overflow-hidden">

            <div className="px-6 py-4 border-b">
                <h2 className="text-xl font-bold">
                    Advertisement Revenue
                </h2>

                <p className="text-sm text-zinc-500">
                    Revenue earned from advertisements.
                </p>
            </div>

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead className="bg-zinc-100">

                        <tr>

                            <th className="px-5 py-3 text-left">
                                Campaign
                            </th>

                            <th className="px-5 py-3 text-left">
                                Type
                            </th>

                            <th className="px-5 py-3 text-center">
                                <Eye
                                    size={16}
                                    className="inline mr-1"
                                />
                                Views
                            </th>

                            <th className="px-5 py-3 text-center">
                                <MousePointerClick
                                    size={16}
                                    className="inline mr-1"
                                />
                                Clicks
                            </th>

                            <th className="px-5 py-3 text-center">
                                CPM
                            </th>

                            <th className="px-5 py-3 text-center">
                                RPM
                            </th>

                            <th className="px-5 py-3 text-right">
                                <DollarSign
                                    size={16}
                                    className="inline mr-1"
                                />
                                Revenue
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {ads.length === 0 && (

                            <tr>

                                <td
                                    colSpan={7}
                                    className="text-center py-12 text-zinc-400"
                                >
                                    No advertisement revenue available.
                                </td>

                            </tr>

                        )}

                        {ads.map((ad) => (

                            <tr
                                key={ad.id}
                                className="border-b hover:bg-zinc-50"
                            >

                                <td className="px-5 py-4 font-semibold">
                                    {ad.campaignName}
                                </td>

                                <td className="px-5 py-4">
                                    {ad.type}
                                </td>

                                <td className="px-5 py-4 text-center">
                                    {Number(ad.views || 0).toLocaleString()}
                                </td>

                                <td className="px-5 py-4 text-center">
                                    {Number(ad.clicks || 0).toLocaleString()}
                                </td>

                                <td className="px-5 py-4 text-center">
                                    R {Number(ad.cpm || 0).toFixed(2)}
                                </td>

                                <td className="px-5 py-4 text-center">
                                    R {Number(ad.rpm || 0).toFixed(2)}
                                </td>

                                <td className="px-5 py-4 text-right font-bold text-green-600">
                                    R {Number(ad.revenue || 0).toFixed(2)}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

AdRevenueTable.propTypes = {
    ads: PropTypes.array
};