import useAdsAnalytics from "../hooks/useAdsAnalytics";

import AnalyticsCard from "../components/AnalyticsCard";

import CampaignTable from "../components/CampaignTable";

export default function AdsAnalytics(){

const{

ads,

loading

}=useAdsAnalytics();

if(loading){

return <h2>Loading...</h2>;

}

const totalBudget=

ads.reduce(

(a,b)=>a+b.budget,

0

);

const totalSpent=

ads.reduce(

(a,b)=>a+b.spent,

0

);

const totalClicks=

ads.reduce(

(a,b)=>a+b.clicks,

0

);

const totalImpressions=

ads.reduce(

(a,b)=>a+b.impressions,

0

);

return(

<div className="ads-page">

<h1>

Advertising Analytics

</h1>

<div className="analytics-grid">

<AnalyticsCard

title="Budget"

value={`R${totalBudget}`}

color="#7c3aed"

/>

<AnalyticsCard

title="Spent"

value={`R${totalSpent}`}

color="#ef4444"

/>

<AnalyticsCard

title="Impressions"

value={totalImpressions}

color="#10b981"

/>

<AnalyticsCard

title="Clicks"

value={totalClicks}

color="#3b82f6"

/>

</div>

<CampaignTable

ads={ads}

/>

</div>

);

}