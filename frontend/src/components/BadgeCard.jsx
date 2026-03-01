import { motion } from "framer-motion";

export default function BadgeCard({ level, condition, achieved }) {
  return (
    <motion.div
      className={`card badge ${achieved ? "badge--achieved" : ""}`}
      initial={{ scale: 0.9, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 16 }}
      viewport={{ once: true }}
    >
      <div className="badge-level">{level}</div>
      <div className="badge-condition">{condition}</div>
      <div className="status-chip">{achieved ? "Achieved" : "Locked"}</div>
    </motion.div>
  );
}
