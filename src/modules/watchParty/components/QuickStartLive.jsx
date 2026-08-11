// modules/watchParty/components/QuickStartLive.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createWatchParty } from "../services/watchParty.api";

const TYPES = [
    {
        id: "watch_party",
        label: "Watch Party"
    },
    {
        id: "creator_live",
        label: "Creator Live"
    },
    {
        id: "business_live",
        label: "Business Live"
    },
    {
        id: "venue_live",
        label: "Venue Live"
    }
];

export default function QuickStartLive({
    
}) {

    const navigate = useNavigate();

    const [loading,setLoading] = useState(false);

    const [type,setType] =
        useState("creator_live");



   
const start = async () => {
    try {
        setLoading(true);

        const party = await createWatchParty({
            title: "Live",
            description: "",
            type,
            visibility: "public"
        });

        navigate(`/watchparties/${res.id}/start`);

        
        // or whatever page should open after creating
    } catch (err) {
    console.log(err);
    console.log(err.response);
    console.log(err.response?.data);

    alert(
        JSON.stringify(err.response?.data) ||
        err.message
    );
} finally {
        setLoading(false);
    }
};



    return(

       

            <div className="bg-white rounded-xl w-[420px] p-6">

                <h2 className="text-2xl font-bold mb-5">
                    Start Live
                </h2>

                <div className="space-y-3">

                    {TYPES.map(item=>(

                        <button
                            key={item.id}
                            onClick={()=>setType(item.id)}
                            className={`w-full border rounded-xl p-4 text-left ${
                                type===item.id
                                ? "border-blue-600 bg-blue-50"
                                : ""
                            }`}
                        >

                            {item.label}

                        </button>

                    ))}

                </div>

                <div className="flex justify-end gap-3 mt-6">

                    <button
    onClick={() => navigate(-1)}
    className="px-5 py-3 border rounded-lg"
>
    Cancel
</button>

                    <button
                        onClick={start}
                        disabled={loading}
                        className="px-5 py-3 bg-blue-600 text-white rounded-lg"
                    >
                        {loading
                            ? "Starting..."
                            : "Start Live"}
                    </button>

                </div>

            </div>

        

    );

}