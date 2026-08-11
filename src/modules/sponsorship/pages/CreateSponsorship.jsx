import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import sponsorshipApi from "../services/sponsorship.api";


export default function CreateSponsorship() {

  const navigate = useNavigate();
const [sponsorships, setSponsorships] = useState([]);
  const [loading,setLoading] = useState(false);
const [campaigns, setCampaigns] = useState([]);
  const [form,setForm] = useState({

    title:"",
    description:"",
    category:"post",

    budget:"",
    currency:"ZAR",

    paymentType:"once",

    startDate:"",
    endDate:"",

    deliverables:"",

    hashtags:""

  });

  useEffect(() => {
    loadCampaigns();
}, []);

  const change = (e)=>{

    setForm({

      ...form,

      [e.target.name]:
      e.target.value

    });

  };

  
const loadCampaigns = async () => {
    try {
        const res = await sponsorshipApi.getMySponsorships();

        setCampaigns(
            res.data || res
        );
    } catch (err) {
        console.error(err);
    }
};

  const submit = async(e)=>{

    e.preventDefault();


    try{

      setLoading(true);

await sponsorshipApi.createSponsorship({

  ...form,

  budget: Number(form.budget),

  deliverables: form.deliverables
    .split("\n")
    .filter(Boolean),

  hashtags: form.hashtags
    .split(",")
    .map(x => x.trim())
    .filter(Boolean)

});



await sponsorshipApi.createSponsorship(payload);

await loadCampaigns();




    }catch(err){

      console.error(
        "Create sponsorship error",
        err
      );


      alert(
        err.response?.data?.message ||
        "Unable to create sponsorship"
      );


    }finally{

      setLoading(false);

    }

  };
  


return (

<div className="max-w-4xl mx-auto p-6">

<h1 className="text-3xl font-bold mb-6">
Create Sponsorship Campaign
</h1>


<form
onSubmit={submit}
className="space-y-5 bg-white dark:bg-zinc-900 p-6 rounded-xl"
>


<div>

<label>
Campaign Title
</label>

<input

name="title"

value={form.title}

onChange={change}

className="w-full border p-3 rounded"

/>

</div>



<div>

<label>
Description
</label>

<textarea

name="description"

value={form.description}

onChange={change}

rows="5"

className="w-full border p-3 rounded"

/>

</div>



<div className="grid grid-cols-2 gap-4">


<div>

<label>
Category
</label>

<select

name="category"

value={form.category}

onChange={change}

className="w-full border p-3 rounded"

>

<option value="video">
Video
</option>

<option value="post">
Post
</option>

<option value="story">
Story
</option>

<option value="reel">
Reel
</option>

<option value="live">
Live
</option>

<option value="podcast">
Podcast
</option>

<option value="watchparty">
Watch Party
</option>

<option value="event">
Event
</option>

<option value="brand_ambassador">
Brand Ambassador
</option>


</select>

</div>



<div>

<label>
Payment Type
</label>


<select

name="paymentType"

value={form.paymentType}

onChange={change}

className="w-full border p-3 rounded"

>

<option value="once">
Once
</option>

<option value="milestone">
Milestone
</option>

<option value="monthly">
Monthly
</option>


</select>


</div>


</div>




<div>

<label>
Budget (ZAR)
</label>


<input

type="number"

name="budget"

value={form.budget}

onChange={change}

className="w-full border p-3 rounded"

/>

</div>



<div className="grid grid-cols-2 gap-4">


<div>

<label>
Start Date
</label>

<input

type="date"

name="startDate"

value={form.startDate}

onChange={change}

className="w-full border p-3 rounded"

/>

</div>



<div>

<label>
End Date
</label>

<input

type="date"

name="endDate"

value={form.endDate}

onChange={change}

className="w-full border p-3 rounded"

/>

</div>


</div>





<div>

<label>
Deliverables
</label>


<textarea

name="deliverables"

value={form.deliverables}

onChange={change}

placeholder="Example:
Create 2 reels
1 live stream
3 posts"

rows="5"

className="w-full border p-3 rounded"

/>


</div>





<div>

<label>
Hashtags
</label>


<input

name="hashtags"

value={form.hashtags}

onChange={change}

placeholder="#brand #campaign"

className="w-full border p-3 rounded"

/>


</div>




<button

disabled={loading}

className="bg-purple-600 text-white px-6 py-3 rounded-lg"

>

{
loading
?
"Creating..."
:
"Create Sponsorship"
}


</button>


</form>
<hr className="my-10" />

<h2 className="text-2xl font-bold mb-4">
My Sponsorship Campaigns
</h2>

{campaigns.length === 0 ? (

    <p>No sponsorships yet.</p>

) : (

    campaigns.map(campaign => (

       <div
  key={campaign.id || campaign._id}
  className="border rounded-lg p-4 mb-4"
>
  <h3 className="text-xl font-bold">
    {campaign.title}
  </h3>

  <p>{campaign.description}</p>

  <p>Budget: R{campaign.budget}</p>

  <p>Status: {campaign.status}</p>

  <div className="flex gap-3 mt-4">

    <button
      onClick={() =>
        navigate(`/sponsorships/${campaign.id || campaign._id}`)
      }
      className="px-4 py-2 bg-blue-600 text-white rounded-lg"
    >
      View
    </button>

    <button
      onClick={() =>
        navigate(`/sponsorships/${campaign.id || campaign._id}/applications`)
      }
      className="px-4 py-2 bg-purple-600 text-white rounded-lg"
    >
      Applications
    </button>

  </div>

</div>

    ))

)}

</div>


);

}