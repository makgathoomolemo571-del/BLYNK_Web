// modules/analytics/components/AnalyticsChart.jsx

import React, { memo, useMemo } from "react";
import PropTypes from "prop-types";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";

const formatLabel = (value) => {
    if (!value) return "";

    return new Date(value).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric"
    });
};

const AnalyticsChart = ({ analytics = [] }) => {

    const data = useMemo(() => {

        return analytics.map(item => ({

            date: item.createdAt,

            eventType: item.eventType,

            value: 1

        }));

    }, [analytics]);

    return (

        <div
            className="w-full rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm p-5"
        >

            <div className="flex items-center justify-between mb-5">

                <h2
                    className="text-lg font-semibold text-zinc-900 dark:text-white"
                >
                    Analytics Activity
                </h2>

                <span
                    className="text-sm text-zinc-500"
                >
                    {analytics.length.toLocaleString()} Events
                </span>

            </div>

            <ResponsiveContainer
                width="100%"
                height={320}
            >

                <LineChart
                    data={data}
                >

                    <CartesianGrid
                        strokeDasharray="3 3"
                    />

                    <XAxis
                        dataKey="date"
                        tickFormatter={formatLabel}
                    />

                    <YAxis
                        allowDecimals={false}
                    />

                    <Tooltip
                        formatter={(value) => [value, "Events"]}
                        labelFormatter={formatLabel}
                    />

                    <Line
                        type="monotone"
                        dataKey="value"
                        strokeWidth={3}
                        dot={false}
                        activeDot={{
                            r: 6
                        }}
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>

    );

};

AnalyticsChart.propTypes = {

    analytics: PropTypes.arrayOf(

        PropTypes.shape({

            id: PropTypes.string,

            eventType: PropTypes.string,

            actor: PropTypes.string,

            targetId: PropTypes.string,

            targetType: PropTypes.string,

            metadata: PropTypes.object,

            createdAt: PropTypes.string

        })

    )

};

export default memo(AnalyticsChart);