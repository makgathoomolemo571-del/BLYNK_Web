import { useEffect, useState } from "react";
import {
    Crown,
    Plus,
    Trash2,
    Edit3,
    CheckCircle
} from "lucide-react";

import monetizationApi from "../services/monetization.api";

export default function MembershipsPage() {

    const [loading,setLoading]=useState(true);

    const [saving,setSaving]=useState(false);

    const [memberships,setMemberships]=useState([]);

    const [form,setForm]=useState({

        name:"",

        description:"",

        monthlyPrice:0,

        yearlyPrice:0,

        color:"#7c3aed",

        perks:""

    });

    useEffect(()=>{

        loadMemberships();

    },[]);

    async function loadMemberships(){

        try{

            setLoading(true);

            const data=
            await monetizationApi.getMemberships();

            setMemberships(data);

        }catch(err){

            console.error(err);

        }finally{

            setLoading(false);

        }

    }

    function change(e){

        setForm(prev=>({

            ...prev,

            [e.target.name]:e.target.value

        }));

    }

    async function createMembership(e){

        e.preventDefault();

        try{

            setSaving(true);

            await monetizationApi.createMembership({

                ...form,

                perks:form.perks
                    .split(",")
                    .map(x=>x.trim())
            });

            setForm({

                name:"",

                description:"",

                monthlyPrice:0,

                yearlyPrice:0,

                color:"#7c3aed",

                perks:""

            });

            loadMemberships();

        }finally{

            setSaving(false);

        }

    }

    async function remove(id){

        if(!window.confirm("Delete membership?"))
            return;

        await monetizationApi.deleteMembership(id);

        loadMemberships();

    }

    return(

<div className="max-w-7xl mx-auto p-8">

<h1 className="text-4xl font-bold mb-8 flex items-center gap-3">

<Crown className="text-yellow-500"/>

Membership Plans

</h1>

<div className="grid lg:grid-cols-2 gap-10">

<div>

<form
onSubmit={createMembership}
className="bg-white rounded-xl shadow p-8 space-y-5">

<h2 className="font-bold text-xl">

Create Membership

</h2>

<input

className="w-full border rounded-lg p-3"

placeholder="Gold"

name="name"

value={form.name}

onChange={change}

/>

<textarea

rows="4"

className="w-full border rounded-lg p-3"

placeholder="Description"

name="description"

value={form.description}

onChange={change}

/>

<div className="grid grid-cols-2 gap-4">

<input

type="number"

name="monthlyPrice"

placeholder="Monthly"

className="border rounded-lg p-3"

value={form.monthlyPrice}

onChange={change}

/>

<input

type="number"

name="yearlyPrice"

placeholder="Yearly"

className="border rounded-lg p-3"

value={form.yearlyPrice}

onChange={change}

/>

</div>

<input

type="color"

name="color"

value={form.color}

onChange={change}

/>

<textarea

rows="4"

placeholder="Perks separated by commas"

className="w-full border rounded-lg p-3"

name="perks"

value={form.perks}

onChange={change}

/>

<button

disabled={saving}

className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg py-4 flex justify-center gap-2"

>

<Plus size={18}/>

{

saving?

"Saving..."

:

"Create Membership"

}

</button>

</form>

</div>

<div>

{

loading?

<div>

Loading...

</div>

:

<div className="space-y-5">

{

memberships.map(plan=>(

<div

key={plan.id}

className="rounded-xl border shadow-sm overflow-hidden"

>

<div

className="p-5 text-white"

style={{

background:plan.color

}}

>

<h3 className="text-2xl font-bold">

{plan.name}

</h3>

<p>

{plan.description}

</p>

</div>

<div className="p-5">

<p>

<strong>

Monthly:

</strong>

R{plan.monthlyPrice}

</p>

<p>

<strong>

Yearly:

</strong>

R{plan.yearlyPrice}

</p>

<div className="mt-4 space-y-2">

{

plan.perks?.map((perk,index)=>(

<div

key={index}

className="flex items-center gap-2"

>

<CheckCircle
size={16}
className="text-green-500"
/>

<span>

{perk}

</span>

</div>

))

}

</div>

<div className="mt-5 flex gap-3">

<button

className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white"

>

<Edit3 size={16}/>

Edit

</button>

<button

onClick={()=>remove(plan.id)}

className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white"

>

<Trash2 size={16}/>

Delete

</button>

</div>

</div>

</div>

))

}

</div>

}

</div>

</div>

</div>

);

}