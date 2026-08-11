// modules/recommendation/components/RecommendationSkeleton.jsx

import React from "react";

const placeholders = Array.from({ length: 8 });

const RecommendationSkeleton = () => {
  return (
    <section className="w-full">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

        {placeholders.map((_, index) => (
          <article
            key={index}
            className="animate-pulse rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden"
          >
            <div className="h-44 w-full bg-gray-200 dark:bg-zinc-800" />

            <div className="p-4 space-y-3">

              <div className="flex items-center gap-3">

                <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-zinc-800" />

                <div className="flex-1 space-y-2">
                  <div className="h-4 w-32 rounded bg-gray-200 dark:bg-zinc-800" />
                  <div className="h-3 w-20 rounded bg-gray-200 dark:bg-zinc-800" />
                </div>

              </div>

              <div className="space-y-2">

                <div className="h-3 rounded bg-gray-200 dark:bg-zinc-800" />

                <div className="h-3 w-5/6 rounded bg-gray-200 dark:bg-zinc-800" />

                <div className="h-3 w-4/6 rounded bg-gray-200 dark:bg-zinc-800" />

              </div>

              <div className="flex justify-between pt-3">

                <div className="h-8 w-24 rounded-lg bg-gray-200 dark:bg-zinc-800" />

                <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-zinc-800" />

              </div>

            </div>

          </article>
        ))}

      </div>
    </section>
  );
};

export default React.memo(RecommendationSkeleton);