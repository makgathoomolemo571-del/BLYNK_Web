import { useState } from "react";

export default function ContactPage() {

  const [form,setForm]=useState({

    name:"",
    email:"",
    subject:"",
    message:""

  });

  function change(e){

    setForm(prev=>({

      ...prev,

      [e.target.name]:e.target.value

    }));

  }

  function submit(e){

    e.preventDefault();

    alert("Message submitted.");

  }

  return (

    <div className="max-w-4xl mx-auto py-16 px-6">

      <h1 className="text-5xl font-bold mb-8">

        Contact Us

      </h1>

      <form
        onSubmit={submit}
        className="space-y-5"
      >

        <input
          name="name"
          placeholder="Your Name"
          className="w-full border rounded-xl p-4"
          value={form.name}
          onChange={change}
        />

        <input
          name="email"
          type="email"
          placeholder="Email Address"
          className="w-full border rounded-xl p-4"
          value={form.email}
          onChange={change}
        />

        <input
          name="subject"
          placeholder="Subject"
          className="w-full border rounded-xl p-4"
          value={form.subject}
          onChange={change}
        />

        <textarea
          rows="7"
          name="message"
          placeholder="Message"
          className="w-full border rounded-xl p-4"
          value={form.message}
          onChange={change}
        />

        <button
          className="bg-blue-600 text-white px-8 py-4 rounded-xl"
        >

          Send Message

        </button>

      </form>

    </div>

  );

}