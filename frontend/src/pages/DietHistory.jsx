import { useMemo, useState } from "react";
import SectionHeader from "../components/SectionHeader";

const historyData = [
  {
    id: 1,
    diet_type: "Weight Loss",
    total_calories: 1680,
    date: "2026-02-25",
    target_status: "On Track",
  },
  {
    id: 2,
    diet_type: "Bodybuilding",
    total_calories: 2450,
    date: "2026-02-26",
    target_status: "Over",
  },
  {
    id: 3,
    diet_type: "Athletic",
    total_calories: 2300,
    date: "2026-02-27",
    target_status: "On Track",
  },
  {
    id: 4,
    diet_type: "Diabetic",
    total_calories: 1900,
    date: "2026-02-28",
    target_status: "Under",
  },
];

export default function DietHistory() {
  const [dietType, setDietType] = useState("All");
  const [status, setStatus] = useState("All");

  const filtered = useMemo(() => {
    return historyData.filter((item) => {
      const matchType = dietType === "All" || item.diet_type === dietType;
      const matchStatus = status === "All" || item.target_status === status;
      return matchType && matchStatus;
    });
  }, [dietType, status]);

  return (
    <div className="page">
      <SectionHeader
        title="Diet History"
        subtitle="Track diet adherence, calories, and target status over time."
      />
      <div className="filters">
        <select
          className="select"
          value={dietType}
          onChange={(e) => setDietType(e.target.value)}
        >
          <option value="All">All Diets</option>
          <option value="Weight Loss">Weight Loss</option>
          <option value="Bodybuilding">Bodybuilding</option>
          <option value="Athletic">Athletic</option>
          <option value="Diabetic">Diabetic</option>
        </select>
        <select
          className="select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="On Track">On Track</option>
          <option value="Under">Under</option>
          <option value="Over">Over</option>
        </select>
      </div>
      <div className="card" style={{ marginTop: "20px" }}>
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Diet Type</th>
              <th>Total Calories</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr key={row.id}>
                <td>{row.date}</td>
                <td>{row.diet_type}</td>
                <td>{row.total_calories}</td>
                <td>
                  <span className="status-chip">{row.target_status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
