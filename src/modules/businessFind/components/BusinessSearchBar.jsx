import { useEffect, useMemo, useState } from "react";
import { Search, Filter, X } from "lucide-react";

const INDUSTRIES = [
  "Technology",
  "Fashion",
  "Gaming",
  "Sports",
  "Education",
  "Finance",
  "Food",
  "Travel",
  "Music",
  "Entertainment",
  "Health",
  "Beauty",
  "Automotive",
  "Real Estate",
  "Other"
];

const STATUS = [
  "active",
  "paused",
  "closed"
];

export default function BusinessSearchBar({
  campaigns = [],
  onResults,
  onFilterChange
}) {

  const [keyword, setKeyword] = useState("");
  const [industry, setIndustry] = useState("");
  const [status, setStatus] = useState("");

  const filtered = useMemo(() => {

    return campaigns.filter((campaign) => {

      const search =
        keyword.trim().toLowerCase();

      const matchesKeyword =
        !search ||

        campaign.businessName?.toLowerCase().includes(search) ||

        campaign.campaignName?.toLowerCase().includes(search) ||

        campaign.campaignObjectives?.toLowerCase().includes(search) ||

        campaign.targetAudience?.toLowerCase().includes(search);

      const matchesIndustry =
        !industry ||
        campaign.industry === industry;

      const matchesStatus =
        !status ||
        campaign.status === status;

      return (
        matchesKeyword &&
        matchesIndustry &&
        matchesStatus
      );

    });

  }, [
    campaigns,
    keyword,
    industry,
    status
  ]);

  useEffect(() => {

    onResults?.(filtered);

  }, [filtered, onResults]);

  useEffect(() => {

    onFilterChange?.({

      keyword,

      industry,

      status

    });

  }, [
    keyword,
    industry,
    status,
    onFilterChange
  ]);

  const clearFilters = () => {

    setKeyword("");
    setIndustry("");
    setStatus("");

  };

  return (

    <div className="w-full bg-white rounded-xl border border-gray-200 shadow-sm p-4 space-y-4">

      <div className="relative">

        <Search
          size={18}
          className="absolute left-3 top-3 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search campaigns..."
          value={keyword}
          onChange={(e)=>setKeyword(e.target.value)}
          className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

      <div className="grid md:grid-cols-3 gap-3">

        <div>

          <label className="text-xs font-semibold text-gray-500 mb-1 block">
            Industry
          </label>

          <select
            value={industry}
            onChange={(e)=>setIndustry(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2"
          >

            <option value="">
              All Industries
            </option>

            {INDUSTRIES.map((item)=>(
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}

          </select>

        </div>

        <div>

          <label className="text-xs font-semibold text-gray-500 mb-1 block">
            Campaign Status
          </label>

          <select
            value={status}
            onChange={(e)=>setStatus(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2"
          >

            <option value="">
              All Status
            </option>

            {STATUS.map((item)=>(
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}

          </select>

        </div>

        <div className="flex items-end gap-2">

          <button
            className="flex items-center justify-center gap-2 w-full rounded-lg bg-blue-600 text-white py-2 hover:bg-blue-700 transition"
          >

            <Filter size={18}/>

            Filters

          </button>

          <button
            onClick={clearFilters}
            className="rounded-lg border border-red-300 text-red-600 p-2 hover:bg-red-50"
          >

            <X size={18}/>

          </button>

        </div>

      </div>

      <div className="text-sm text-gray-500">

        {filtered.length.toLocaleString()} Campaigns Found

      </div>

    </div>

  );

}