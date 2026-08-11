import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import creatorHireApi from "../services/creatorHire.api";

import ApplyModal from "../../applications/pages/ApplyModal";

const CreatorHireDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
const [showApply, setShowApply] = useState(false);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  

 
  useEffect(() => {
    loadJob();
  }, [id]);

  const loadJob = async () => {
    try {
      const job = await creatorHireApi.get(id);
setJob(job);
      
const response = await creatorHireApi.get(id);
console.log("API Response:", response);
setJob(response);

    } catch (err) {
      console.error(err);
      navigate("/creator-hire");
    } finally {
      setLoading(false);
    }
  };

  

  if (loading)
    return (
      <div className="flex justify-center p-5">
        Loading...
      </div>
    );

  if (!job)
    return (
      <div className="text-center p-5">
        Job not found.
      </div>
    );

  return (
    <div className="container py-4">

      <div className="card shadow-sm">

        <div className="card-body">

          <h2>{job.projectTitle}</h2>

          <span className="badge bg-primary mb-3">
            {job.status}
          </span>

          <p>{job.description}</p>

          <hr />

          <div className="row">

            <div className="col-md-6">

              <h5>Project</h5>

              <p>
                <strong>Category:</strong>{" "}
                {job.category}
              </p>

              <p>
                <strong>Role:</strong>{" "}
                {job.roleRequired}
              </p>

              <p>
                <strong>Experience:</strong>{" "}
                {job.experienceLevel}
              </p>

              <p>
                <strong>Objectives:</strong><br />
                {job.objectives}
              </p>

              <p>
                <strong>Deliverables:</strong><br />
                {job.deliverables}
              </p>

            </div>

            <div className="col-md-6">

              <h5>Budget</h5>

              <p>
                <strong>Type:</strong>{" "}
                {job.budgetType}
              </p>

              <p>
                <strong>Range:</strong>{" "}
                {job.budgetRange}
              </p>

              <p>
                <strong>Payment:</strong>{" "}
                {job.paymentMethod}
              </p>

              <hr />

              <h5>Work</h5>

              <p>
                <strong>Type:</strong>{" "}
                {job.workType}
              </p>

              <p>
                <strong>Location:</strong>{" "}
                {job.location}
              </p>

              <p>
                <strong>Timezone:</strong>{" "}
                {job.timeZone}
              </p>

            </div>

          </div>

          <hr />

          <h5>Required Skills</h5>

          <div className="mb-4">

            {job.skills?.map((skill) => (
              <span
                key={skill}
                className="badge bg-secondary me-2 mb-2"
              >
                {skill}
              </span>
            ))}

          </div>

          <h5>Timeline</h5>

          <p>
            {new Date(
              job.timelineStart
            ).toLocaleDateString()}{" "}
            -
            {" "}
            {new Date(
              job.timelineEnd
            ).toLocaleDateString()}
          </p>

          <hr />

          
        </div>
<div className="bg-white rounded-xl shadow border p-6">

  <h2 className="text-2xl font-bold mb-6">
    Actions
  </h2>

  <div className="flex flex-wrap gap-4">

    <button
      onClick={() => setShowApply(true)}
      className="bg-purple-600 text-white px-6 py-3 rounded-lg"
    >
      Apply
    </button>

    <button
      onClick={() => navigate("/applications/my")}
      className="bg-blue-600 text-white px-6 py-3 rounded-lg"
    >
      My Applications
    </button>

    <button
      onClick={() => navigate(-1)}
      className="border px-6 py-3 rounded-lg"
    >
      Back
    </button>

  </div>

</div>
      </div>
<ApplyModal
  open={showApply}
  onClose={() => setShowApply(false)}
  targetType="CREATOR_HIRE"
  targetId={job.id || job._id}
  onCreated={() => {
    alert("Application submitted successfully.");
    setShowApply(false);
  }}
/>
    </div>
  );
};

export default CreatorHireDetailsPage;