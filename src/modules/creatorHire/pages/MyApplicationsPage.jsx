import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Briefcase,
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  Users,
  ChevronRight,
  Lock,
} from "lucide-react";

import { getMyJobs } from "../store/creatorHireActions";
import { selectMyJobs } from "../store/creatorHireSelectors";

const badgeColor = {
  open: "bg-green-100 text-green-700",
  closed: "bg-red-100 text-red-700",
  completed: "bg-blue-100 text-blue-700",
};

const visibilityColor = {
  public: "bg-indigo-100 text-indigo-700",
  members: "bg-orange-100 text-orange-700",
  subscribers: "bg-purple-100 text-purple-700",
};

export default function MyApplicationsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const jobs = useSelector(selectMyJobs);

  const loading = useSelector(
    (state) => state.creatorHire.loading
  );

  useEffect(() => {
    dispatch(getMyJobs());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">

      <div className="flex items-center justify-between mb-8">

        <div>

          <h1 className="text-3xl font-bold">
            My Creator Hire Projects
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all creator opportunities you have posted.
          </p>

        </div>

        <button
          onClick={() =>
            navigate("/creator-hire/create")
          }
          className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700"
        >
          New Project
        </button>

      </div>

      {jobs.length === 0 && (

        <div className="bg-white rounded-2xl shadow p-10 text-center">

          <Briefcase
            className="mx-auto mb-4"
            size={55}
          />

          <h2 className="text-xl font-semibold">
            No Projects Found
          </h2>

          <p className="text-gray-500 mt-2">
            You have not created any creator hire projects.
          </p>

        </div>

      )}

      <div className="grid lg:grid-cols-2 gap-6">

        {jobs.map((job) => (

          <div
            key={job.id}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
          >

            <div className="p-6">

              <div className="flex justify-between">

                <div>

                  <h2 className="text-2xl font-semibold">
                    {job.projectTitle}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    {job.category}
                  </p>

                </div>

                <div className="flex flex-col gap-2">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeColor[job.status]}`}
                  >
                    {job.status}
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${visibilityColor[job.visibility]}`}
                  >
                    {job.visibility}
                  </span>

                </div>

              </div>

              <p className="mt-5 text-gray-600 line-clamp-3">
                {job.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mt-6">

                <div className="flex items-center gap-2">

                  <Briefcase size={18} />

                  <span>{job.roleRequired}</span>

                </div>

                <div className="flex items-center gap-2">

                  <Clock size={18} />

                  <span>{job.experienceLevel}</span>

                </div>

                <div className="flex items-center gap-2">

                  <DollarSign size={18} />

                  <span>{job.budgetRange}</span>

                </div>

                <div className="flex items-center gap-2">

                  <MapPin size={18} />

                  <span>{job.location}</span>

                </div>

                <div className="flex items-center gap-2">

                  <Calendar size={18} />

                  <span>
                    {new Date(
                      job.timelineStart
                    ).toLocaleDateString()}
                  </span>

                </div>

                <div className="flex items-center gap-2">

                  <Calendar size={18} />

                  <span>
                    {new Date(
                      job.timelineEnd
                    ).toLocaleDateString()}
                  </span>

                </div>

              </div>

              <div className="mt-6">

                <h3 className="font-semibold mb-2">
                  Skills
                </h3>

                <div className="flex flex-wrap gap-2">

                  {job.skills.map((skill) => (

                    <span
                      key={skill}
                      className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>

                  ))}

                </div>

              </div>

              <div className="mt-6 flex items-center justify-between">

                <div className="flex items-center gap-6">

                  <div className="flex items-center gap-2">

                    <Users size={18} />

                    <span>
                      {job.applicants.length} Applicants
                    </span>

                  </div>

                  <div className="flex items-center gap-2">

                    <Lock size={18} />

                    <span>
                      {job.paymentMethod}
                    </span>

                  </div>

                </div>

                <button
                  onClick={() =>
                    navigate(
                      `/creator-hire/${job.id}`
                    )
                  }
                  className="flex items-center gap-2 text-blue-600 font-semibold"
                >
                  View

                  <ChevronRight size={18} />

                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}