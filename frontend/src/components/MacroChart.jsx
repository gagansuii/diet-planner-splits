import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";

const COLORS = {
  Protein: "#d4af37",
  Carbs: "#c0c0c0",
  Fats: "#d9534f",
  Fiber: "#3cb371",
};

export default function MacroChart({ data }) {
  const chartData = [
    { name: "Protein", value: data.protein },
    { name: "Carbs", value: data.carbs },
    { name: "Fats", value: data.fats },
    { name: "Fiber", value: data.fiber },
  ];

  return (
    <div className="card chart-card">
      <h3>Macro Split</h3>
      <div className="chart-wrap">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10 }}>
            <XAxis dataKey="name" stroke="#b6b0a1" />
            <YAxis stroke="#b6b0a1" />
            <Tooltip
              cursor={{ fill: "rgba(255, 215, 0, 0.08)" }}
              contentStyle={{
                background: "#151515",
                border: "1px solid rgba(255, 215, 0, 0.2)",
              }}
            />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {chartData.map((entry) => (
                <Cell key={entry.name} fill={COLORS[entry.name]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
