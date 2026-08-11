import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Briefcase,
  Calendar,
  Clock,
  Globe,
  MapPin,
  Pencil,
  Trash2,
  Users,
} from "lucide-react";

import useCreatorHire from "../hooks/useCreatorHire";

const badgeColors = {
  open: "bg-green-100 text-green-700",
  closed: "bg-yellow-100 text-yellow-700",
  completed: "bg-blue-100 text-blue-700",
};

export default function MyListingsPage() {
  const {
    jobs,
    loading,
    error,
    getMyJobs,
    deleteJob,
  } = useCreatorHire();

  useEffect(() => {
    getMyJobs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <span className="text-lg font-medium">
          Loading your listings...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl bg-red-50 border border-red-200 p-5 text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold">
            My Creator Listings
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all creator opportunities you've published.
          </p>

        </div>

        <Link
          to="/creator-hire/create"
          className="px-5 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700"
        >
          Create Listing
        </Link>

      </div>

      {!jobs.length ? (
        <div className="bg-white rounded-xl shadow p-12 text-center">

          <Briefcase
            size={60}
            className="mx-auto text-gray-300 mb-4"
          />

          <h2 className="text-2xl font-semibold">
            No Listings Yet
          </h2>

          <p className="text-gray-500 mt-3">
            Start hiring creators by creating your first listing.
          </p>

        </div>
      ) : (

        <div className="grid gap-6">

          {jobs.map((job) => (

            <div
              key={job.id}
              className="bg-white rounded-2xl shadow border p-6"
            >

              <div className="flex justify-between items-start">

                <div>

                  <h2 className="text-2xl font-bold">
                    {job.projectTitle}
                  </h2>

                  <p className="text-gray-500 mt-1">
                    {job.category}
                  </p>

                </div>

                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    badgeColors[job.status]
                  }`}
                >
                  {job.status}
                </span>

              </div>

              <p className="mt-5 text-gray-700 whitespace-pre-wrap">
                {job.description}
              </p>

              <div className="grid md:grid-cols-3 gap-5 mt-6">

                <div className="flex items-center gap-2">
                  <Users size={18} />
                  <span>
                    Applicants:
                    {" "}
                    {job.applicants.length}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Briefcase size={18} />
                  <span>
                    {job.roleRequired}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock size={18} />
                  <span>
                    {job.experienceLevel}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar size={18} />
                  <span>
                    {new Date(job.timelineStart).toLocaleDateString()}
                    {" - "}
                    {new Date(job.timelineEnd).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin size={18} />
                  <span>
                    {job.location}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Globe size={18} />
                  <span>
                    {job.workType}
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
                      className="px-3 py-1 rounded-full bg-gray-100 text-sm"
                    >
                      {skill}
                    </span>

                  ))}

                </div>

              </div>

              <div className="mt-6 flex justify-between items-center">

                <div className="text-sm text-gray-500">

                  Budget:
                  {" "}
                  <strong>
                    {job.budgetRange}
                  </strong>

                  {" • "}

                  {job.paymentMethod}

                </div>

                <div className="flex gap-3">

                  <Link
                    to={`/creator-hire/edit/${job.id}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                  >
                    <Pencil size={18} />
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteJob(job.id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}