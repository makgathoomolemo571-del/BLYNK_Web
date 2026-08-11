import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchJobs } from "../store/creatorHireSlice";
import {
  selectCreatorHireLoading,
  selectJobs,
} from "../store/creatorHireSelectors";

import CreatorCard from "../components/CreatorCard";

const CreatorHirePage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const jobs = useSelector(selectJobs);

console.log("Jobs from Redux:", jobs);
  const loading = useSelector(selectCreatorHireLoading);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);
console.log("Jobs:", jobs);
  return (

    <div className="w-full min-h-screen bg-zinc-100 dark:bg-zinc-950">

      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="flex items-center justify-between mb-8">

          <div>

            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
              Creator Hire
            </h1>

            <p className="text-zinc-500 mt-2">
              Manage projects and creator applications.
            </p>

          </div>

        

        </div>

        {loading ? (

          <div className="grid lg:grid-cols-3 gap-6">

            {[1,2,3,4,5,6].map(item => (

              <div
                key={item}
                className="animate-pulse rounded-xl bg-white dark:bg-zinc-900 h-72"
              />

            ))}

          </div>

        ) : jobs.length === 0 ? (

          <div className="rounded-xl bg-white dark:bg-zinc-900 p-16 text-center shadow">

            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">

              No Projects Yet

            </h2>

            <p className="mt-3 text-zinc-500">

              Start hiring creators by publishing your first project.

            </p>

           

          </div>

        ) : (

          <div className="grid gap-6 lg:grid-cols-3">

  {jobs.map((job) => (

    <div
      key={job.id}
      className="rounded-xl bg-white dark:bg-zinc-900 shadow p-5"
    >

      <h2 className="text-xl font-bold">
        {job.jobTitle}
      </h2>

      <p className="text-sm text-zinc-500 mt-1">
        {job.companyName}
      </p>

      <p className="mt-4 line-clamp-3">
        {job.jobDescription}
      </p>

      <div className="mt-4 space-y-1 text-sm">

        <p>
          <strong>Budget:</strong> {job.budget}
        </p>

        <p>
          <strong>Category:</strong> {job.category}
        </p>

        <p>
          <strong>Location:</strong> {job.location}
        </p>

      </div>

      <div className="flex gap-3 mt-6">

        <button
  onClick={() => navigate(`/creator-hire/${job.id}`)}
  className="flex-1 bg-purple-600 text-white py-2 rounded-lg"
>
  View
</button>

      </div>

    </div>

  ))}

</div>

        )}

      </div>

    </div>

  );

};

export default CreatorHirePage;