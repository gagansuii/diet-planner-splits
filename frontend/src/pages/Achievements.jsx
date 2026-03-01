import SectionHeader from "../components/SectionHeader";
import BadgeCard from "../components/BadgeCard";

const badges = [
  {
    level: "Wood",
    condition: "First diet logged",
    achieved: true,
  },
  {
    level: "Bronze",
    condition: "7 days consistency",
    achieved: true,
  },
  {
    level: "Silver",
    condition: "30 days consistency",
    achieved: false,
  },
  {
    level: "Gold",
    condition: "Target weight achieved",
    achieved: false,
  },
  {
    level: "Platinum",
    condition: "90 days consistency",
    achieved: false,
  },
];

export default function Achievements() {
  return (
    <div className="page">
      <SectionHeader
        title="Achievements"
        subtitle="Earn badges as you stay consistent with your diet journey."
      />
      <div className="grid grid-3" style={{ marginTop: "20px" }}>
        {badges.map((badge) => (
          <BadgeCard key={badge.level} {...badge} />
        ))}
      </div>
    </div>
  );
}
