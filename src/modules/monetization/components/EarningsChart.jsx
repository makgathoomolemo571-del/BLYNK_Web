import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  AreaChart
} from "recharts";

export default function EarningsChart({
  data = [],
  title = "Earnings",
  color = "#2563eb",
  type = "area"
}) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-xl font-bold">
          {title}
        </h2>

      </div>

      <div className="h-80">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          {type === "line" ? (

            <LineChart data={data}>

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="earnings"
                stroke={color}
                strokeWidth={3}
                dot={{
                  r:4
                }}
              />

            </LineChart>

          ) : (

            <AreaChart data={data}>

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="earnings"
                stroke={color}
                fill={color}
                fillOpacity={0.2}
                strokeWidth={3}
              />

            </AreaChart>

          )}

        </ResponsiveContainer>

      </div>

    </div>
  );
}