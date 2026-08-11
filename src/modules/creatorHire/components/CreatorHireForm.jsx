import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import creatorHireApi from "../services/creatorHire.api";



const EXPERIENCE = [
  "Entry",
  "Junior",
  "Intermediate",
  "Senior",
  "Expert"
];

const WORK_TYPES = [
  "Remote",
  "Hybrid",
  "Onsite"
];

const VISIBILITY = [
  "public",
  "members",
  "subscribers"
];

const STATUS = [
  "open",
  "closed",
  "completed"
];

const PAYMENT_METHODS = [
  "BLYNK_TOKENS",
  "BANK_TRANSFER",
  "MOBILE_MONEY",
  "CRYPTO",
  "OTHER"
];

const BUDGET_TYPES = [
  "Fixed",
  "Hourly",
  "Negotiable"
];

export default function CreatorHireForm({

  editMode = false,
  initialData = null,
  onSuccess

}) {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({

    projectTitle: "",

    category: "",

    description: "",

    objectives: "",

    deliverables: "",

    roleRequired: "",

    experienceLevel: EXPERIENCE[0],

    skills: [],

    budgetType: BUDGET_TYPES[0],

    budgetRange: "",

    paymentMethod: PAYMENT_METHODS[0],

    timelineStart: "",

    timelineEnd: "",

    workType: WORK_TYPES[0],

    location: "",

    timeZone: "",

    visibility: VISIBILITY[0],

    status: STATUS[0]

  });

  const [skillInput, setSkillInput] = useState("");

  const [jobs, setJobs] = useState([]);
const [jobsLoading, setJobsLoading] = useState(false);

  useEffect(() => {

  if (!initialData) {
    loadJobs();
    return;
  }

  setForm({

      projectTitle:
        initialData.projectTitle || "",

      category:
        initialData.category || "",

      description:
        initialData.description || "",

      objectives:
        initialData.objectives || "",

      deliverables:
        initialData.deliverables || "",

      roleRequired:
        initialData.roleRequired || "",

      experienceLevel:
        initialData.experienceLevel || EXPERIENCE[0],

      skills:
        initialData.skills || [],

      budgetType:
        initialData.budgetType || BUDGET_TYPES[0],

      budgetRange:
        initialData.budgetRange || "",

      paymentMethod:
        initialData.paymentMethod || PAYMENT_METHODS[0],

      timelineStart:
        initialData.timelineStart?.substring(0,10) || "",

      timelineEnd:
        initialData.timelineEnd?.substring(0,10) || "",

      workType:
        initialData.workType || WORK_TYPES[0],

      location:
        initialData.location || "",

      timeZone:
        initialData.timeZone || "",

      visibility:
        initialData.visibility || VISIBILITY[0],

      status:
        initialData.status || STATUS[0]

    });

  }, [initialData]);

  const change = e => {

    setForm(prev => ({

      ...prev,

      [e.target.name]: e.target.value

    }));

  };

  const loadJobs = async () => {

  try {

    setJobsLoading(true);

    const res =
 await creatorHireApi.getMyJobs();

console.log("MY JOBS:", res);

setJobs(
 res.data || res
);

  } catch(err){

    console.error(err);

  } finally {

    setJobsLoading(false);

  }

};

  const addSkill = () => {

    const skill = skillInput.trim();

    if (!skill) return;

    if (form.skills.includes(skill)) {

      setSkillInput("");

      return;

    }

    setForm(prev => ({

      ...prev,

      skills: [...prev.skills, skill]

    }));

    setSkillInput("");

  };

  const removeSkill = skill => {

    setForm(prev => ({

      ...prev,

      skills: prev.skills.filter(s => s !== skill)

    }));

  };

  const validate = () => {

    const e = {};

    if (!form.projectTitle.trim())
      e.projectTitle = "Required";

    if (!form.category.trim())
      e.category = "Required";

    if (!form.description.trim())
      e.description = "Required";

    if (!form.roleRequired.trim())
      e.roleRequired = "Required";

    if (!form.timelineStart)
      e.timelineStart = "Required";

    if (!form.timelineEnd)
      e.timelineEnd = "Required";

    if (
      form.timelineStart &&
      form.timelineEnd &&
      new Date(form.timelineEnd) <
      new Date(form.timelineStart)
    ) {

      e.timelineEnd =
        "End date cannot be before start";

    }

    setErrors(e);

    return Object.keys(e).length === 0;

  };

  const payload = useMemo(() => ({

    ...form,

    skills: form.skills

  }), [form]);

  const submit = async e => {

    e.preventDefault();

    if (!validate()) return;

    try {

      setLoading(true);

      if (editMode) {

        await creatorHireApi.update(
          initialData.id,
          payload
        );

      } else {

        await creatorHireApi.createJob(payload);

      }

      if (onSuccess)
        onSuccess();

      else
        navigate("/creator-hire");

    }

    finally {

      setLoading(false);

    }

  };

  return (
<div className="space-y-10">
    <form
      onSubmit={submit}
      className="space-y-5"
    >

      <input
        name="projectTitle"
        placeholder="Project title"
        value={form.projectTitle}
        onChange={change}
      />

      <input
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={change}
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={change}
      />

      <textarea
        name="objectives"
        placeholder="Objectives"
        value={form.objectives}
        onChange={change}
      />

      <textarea
        name="deliverables"
        placeholder="Deliverables"
        value={form.deliverables}
        onChange={change}
      />

      <input
        name="roleRequired"
        placeholder="Role required"
        value={form.roleRequired}
        onChange={change}
      />

      <select
        name="experienceLevel"
        value={form.experienceLevel}
        onChange={change}
      >

        {EXPERIENCE.map(level => (

          <option
            key={level}
            value={level}
          >
            {level}
          </option>

        ))}

      </select>

      <div>

        <input
          value={skillInput}
          placeholder="Add skill"
          onChange={e =>
            setSkillInput(
              e.target.value
            )
          }
        />

        <button
          type="button"
          onClick={addSkill}
        >
          Add
        </button>

      </div>

      <div>

        {form.skills.map(skill => (

          <button
            key={skill}
            type="button"
            onClick={() =>
              removeSkill(skill)
            }
          >
            {skill} ✕
          </button>

        ))}

      </div>

      <select
        name="budgetType"
        value={form.budgetType}
        onChange={change}
      >

        {BUDGET_TYPES.map(type => (

          <option
            key={type}
            value={type}
          >
            {type}
          </option>

        ))}

      </select>

      <input
        name="budgetRange"
        value={form.budgetRange}
        placeholder="Budget range"
        onChange={change}
      />

      <select
        name="paymentMethod"
        value={form.paymentMethod}
        onChange={change}
      >

        {PAYMENT_METHODS.map(method => (

          <option
            key={method}
            value={method}
          >
            {method}
          </option>

        ))}

      </select>

      <input
        type="date"
        name="timelineStart"
        value={form.timelineStart}
        onChange={change}
      />

      <input
        type="date"
        name="timelineEnd"
        value={form.timelineEnd}
        onChange={change}
      />

      <select
        name="workType"
        value={form.workType}
        onChange={change}
      >

        {WORK_TYPES.map(type => (

          <option
            key={type}
            value={type}
          >
            {type}
          </option>

        ))}

      </select>

      <input
        name="location"
        value={form.location}
        placeholder="Location"
        onChange={change}
      />

      <input
        name="timeZone"
        value={form.timeZone}
        placeholder="Time Zone"
        onChange={change}
      />

      <select
        name="visibility"
        value={form.visibility}
        onChange={change}
      >

        {VISIBILITY.map(v => (

          <option
            key={v}
            value={v}
          >
            {v}
          </option>

        ))}

      </select>

      <select
        name="status"
        value={form.status}
        onChange={change}
      >

        {STATUS.map(v => (

          <option
            key={v}
            value={v}
          >
            {v}
          </option>

        ))}

      </select>

      {Object.keys(errors).length > 0 && (

        <ul>

          {Object.entries(errors).map(

            ([k,v]) => (

              <li key={k}>
                {v}
              </li>

            )

          )}

        </ul>

      )}

      <button
        disabled={loading}
        type="submit"
      >

        {loading
          ? "Saving..."
          : editMode
            ? "Update Project"
            : "Create Project"}

      </button>

    </form>


    <div className="mt-10">

      <h2 className="text-2xl font-bold mb-5">
        My Creator Jobs
      </h2>


      {jobsLoading ? (

        <p>Loading jobs...</p>

      ) : jobs.length === 0 ? (

        <p className="text-gray-500">
          No jobs created yet.
        </p>

      ) : (

        <div className="grid md:grid-cols-2 gap-5">

          {jobs.map(job => (

            <div
              key={job._id || job.id}
              className="border rounded-xl p-5 shadow"
            >

              <h3 className="text-xl font-bold">
                {job.projectTitle}
              </h3>


              <p>
                {job.category}
              </p>


              <p className="text-gray-600">
                {job.description}
              </p>


              <div className="flex gap-3 mt-5">


                <button
                  onClick={() =>
                    navigate(
                      `/creator-hire/${job.id}/applications`
                    )
                  }
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Applications
                </button>


                <button
                  onClick={() =>
                    navigate(
                      `/creator-hire/edit/${job._id}`
                    )
                  }
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>


                <button
                  onClick={() =>
                    navigate("/creator-hire")
                  }
                  className="bg-gray-700 text-white px-4 py-2 rounded"
                >
                  Back
                </button>


              </div>


            </div>

          ))}

        </div>

      )}

    </div>

  </div>
);

}