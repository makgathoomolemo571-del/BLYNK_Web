// src/modules/monetization/pages/SponsorsPage.jsx

import { useState } from "react";
import {
    Building2,
    DollarSign,
    CheckCircle,
    Clock,
    Search,
    Handshake
} from "lucide-react";

export default function SponsorsPage() {

    const [search, setSearch] = useState("");

    const sponsors = [

        {
            id: 1,
            brand: "Nike",
            campaign: "Summer Sports",
            amount: "R25,000",
            status: "Active",
            logo: "https://logo.clearbit.com/nike.com"
        },

        {
            id: 2,
            brand: "Samsung",
            campaign: "Galaxy Creator",
            amount: "R14,500",
            status: "Pending",
            logo: "https://logo.clearbit.com/samsung.com"
        },

        {
            id: 3,
            brand: "Coca-Cola",
            campaign: "Summer Campaign",
            amount: "R42,000",
            status: "Completed",
            logo: "https://logo.clearbit.com/coca-cola.com"
        }

    ];

    const filteredSponsors =
        sponsors.filter(s =>
            s.brand
                .toLowerCase()
                .includes(search.toLowerCase())
        );

    return (

        <div className="max-w-7xl mx-auto p-8">

            <div className="flex justify-between items-center mb-8">

                <div>

                    <h1 className="text-4xl font-bold">
                        Sponsors
                    </h1>

                    <p className="text-zinc-500 mt-2">
                        Manage all brand partnerships
                    </p>

                </div>

                <button
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl flex items-center gap-2"
                >

                    <Handshake size={18} />

                    Find Sponsors

                </button>

            </div>

            {/* Stats */}

            <div className="grid md:grid-cols-4 gap-5 mb-8">

                <div className="bg-white rounded-xl shadow p-6">

                    <Building2
                        size={28}
                        className="text-purple-600 mb-3"
                    />

                    <h2 className="text-2xl font-bold">
                        18
                    </h2>

                    <p className="text-zinc-500">
                        Total Sponsors
                    </p>

                </div>

                <div className="bg-white rounded-xl shadow p-6">

                    <CheckCircle
                        size={28}
                        className="text-green-600 mb-3"
                    />

                    <h2 className="text-2xl font-bold">
                        8
                    </h2>

                    <p className="text-zinc-500">
                        Active Deals
                    </p>

                </div>

                <div className="bg-white rounded-xl shadow p-6">

                    <Clock
                        size={28}
                        className="text-yellow-600 mb-3"
                    />

                    <h2 className="text-2xl font-bold">
                        5
                    </h2>

                    <p className="text-zinc-500">
                        Pending Requests
                    </p>

                </div>

                <div className="bg-white rounded-xl shadow p-6">

                    <DollarSign
                        size={28}
                        className="text-blue-600 mb-3"
                    />

                    <h2 className="text-2xl font-bold">
                        R81,500
                    </h2>

                    <p className="text-zinc-500">
                        Sponsor Revenue
                    </p>

                </div>

            </div>

            {/* Search */}

            <div className="relative mb-8">

                <Search
                    size={18}
                    className="absolute left-4 top-4 text-zinc-400"
                />

                <input

                    className="w-full border rounded-xl pl-12 p-4"

                    placeholder="Search sponsors..."

                    value={search}

                    onChange={(e) =>
                        setSearch(e.target.value)
                    }

                />

            </div>

            {/* Sponsor Cards */}

            <div className="grid lg:grid-cols-2 gap-6">

                {filteredSponsors.map((sponsor) => (

                    <div

                        key={sponsor.id}

                        className="bg-white rounded-xl shadow p-6 flex gap-5"

                    >

                        <img

                            src={sponsor.logo}

                            alt={sponsor.brand}

                            className="w-20 h-20 rounded-xl object-cover border"

                        />

                        <div className="flex-1">

                            <h2 className="text-xl font-bold">

                                {sponsor.brand}

                            </h2>

                            <p className="text-zinc-500">

                                {sponsor.campaign}

                            </p>

                            <div className="flex justify-between mt-5">

                                <div>

                                    <p className="text-sm text-zinc-400">

                                        Deal Value

                                    </p>

                                    <h3 className="font-bold">

                                        {sponsor.amount}

                                    </h3>

                                </div>

                                <span
                                    className={`px-4 py-2 rounded-full text-sm

${sponsor.status==="Active"
?"bg-green-100 text-green-700"
:sponsor.status==="Pending"
?"bg-yellow-100 text-yellow-700"
:"bg-blue-100 text-blue-700"}

`}
                                >

                                    {sponsor.status}

                                </span>

                            </div>

                            <div className="flex gap-3 mt-6">

                                <button
                                    className="bg-purple-600 text-white px-5 py-2 rounded-lg"
                                >
                                    View
                                </button>

                                <button
                                    className="border px-5 py-2 rounded-lg"
                                >
                                    Message
                                </button>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}