import { useState } from "react";
import { useNavigate } from "react-router-dom";

import verificationApi from "../services/verification.api";

const TYPES = [
  {
    value: "identity",
    label: "Identity Verification"
  },
  {
    value: "creator",
    label: "Creator Verification"
  },
  {
    value: "business",
    label: "Business Verification"
  },
  {
    value: "venue",
    label: "Venue Verification"
  },
  {
    value: "podcast",
    label: "Podcast Verification"
  }
];

export default function ApplyVerification() {

  const navigate = useNavigate();

  const [loading,setLoading]=useState(false);

  const [error,setError]=useState("");

  const [success,setSuccess]=useState("");

  const [form,setForm]=useState({

    type:"identity",

    fullName:"",

    idNumber:"",

    registrationNumber:"",

    taxNumber:"",

    website:"",

    socialLinks:[

      {
        platform:"",
        url:""
      }

    ],

    documents:[]

  });

  const change=(e)=>{

    setForm({

      ...form,

      [e.target.name]:
      e.target.value

    });

  };

  const socialChange=(index,key,value)=>{

    const socials=[...form.socialLinks];

    socials[index][key]=value;

    setForm({

      ...form,

      socialLinks:socials

    });

  };

  const addSocial=()=>{

    setForm({

      ...form,

      socialLinks:[
        ...form.socialLinks,
        {
          platform:"",
          url:""
        }
      ]

    });

  };

  const submit=async(e)=>{

    e.preventDefault();

    try{

      setLoading(true);

      setError("");

      await verificationApi.create(form);

      setSuccess(
        "Verification submitted successfully."
      );

      setTimeout(()=>{

        navigate("/verification");

      },1200);

    }

    catch(err){

      setError(

        err?.response?.data?.message ||

        "Unable to submit verification."

      );

    }

    finally{

      setLoading(false);

    }

  };

  return(

<div className="container py-5">

<div className="card shadow">

<div className="card-header">

<h3 className="mb-0">

Apply For Verification

</h3>

</div>

<div className="card-body">

{error &&

<div className="alert alert-danger">

{error}

</div>

}

{success &&

<div className="alert alert-success">

{success}

</div>

}

<form onSubmit={submit}>

<div className="mb-3">

<label className="form-label">

Verification Type

</label>

<select

className="form-select"

name="type"

value={form.type}

onChange={change}

>

{

TYPES.map(type=>(

<option

key={type.value}

value={type.value}

>

{type.label}

</option>

))

}

</select>

</div>

<div className="mb-3">

<label className="form-label">

Full Name

</label>

<input

className="form-control"

name="fullName"

value={form.fullName}

onChange={change}

required

/>

</div>

<div className="mb-3">

<label className="form-label">

ID Number

</label>

<input

className="form-control"

name="idNumber"

value={form.idNumber}

onChange={change}

/>

</div>

<div className="mb-3">

<label className="form-label">

Business Registration Number

</label>

<input

className="form-control"

name="registrationNumber"

value={form.registrationNumber}

onChange={change}

/>

</div>

<div className="mb-3">

<label className="form-label">

Tax Number

</label>

<input

className="form-control"

name="taxNumber"

value={form.taxNumber}

onChange={change}

/>

</div>

<div className="mb-3">

<label className="form-label">

Website

</label>

<input

className="form-control"

name="website"

value={form.website}

onChange={change}

/>

</div>

<hr/>

<h5>

Social Links

</h5>

{

form.socialLinks.map((social,index)=>(

<div
className="row mb-3"
key={index}
>

<div className="col-md-4">

<input

className="form-control"

placeholder="Platform"

value={social.platform}

onChange={(e)=>

socialChange(

index,

"platform",

e.target.value

)

}

/>

</div>

<div className="col-md-8">

<input

className="form-control"

placeholder="URL"

value={social.url}

onChange={(e)=>

socialChange(

index,

"url",

e.target.value

)

}

/>

</div>

</div>

))

}

<button

type="button"

className="btn btn-outline-secondary mb-4"

onClick={addSocial}

>

Add Social Link

</button>

<hr/>

<div className="d-grid">

<button

className="btn btn-primary"

disabled={loading}

>

{

loading

?

"Submitting..."

:

"Submit Verification"

}

</button>

</div>

</form>

</div>

</div>

</div>

  );

}