import { Link } from "react-router-dom";
import SectionHeader from "../components/SectionHeader";

const visuals = [
  "https://images.openai.com/static-rsc-3/M_bDi2NWSyHF14DmzSaZ_fNV9bJRnuKLaX0T2neDBtLG8G8X5SH0nNrQgB4ocZ99UgKa5ot6vsBX8TA5aonQi-dxsnAxQjz1ZmRcF-U_LeY?purpose=fullsize&v=1",
  "https://p16-oec-general-useast5.ttcdn-us.com/tos-useast5-i-omjb5zjo8w-tx/607713f7914e4e7a9a51ca3e1ce32a4a~tplv-fhlh96nyum-resize-jpeg:800:800.jpeg",
  "https://media.slidesgo.com/storage/29652378/conversions/2-black-and-gold-pitch-deck-infographics-thumb.jpg",
  "https://media.slidesgo.com/storage/29652373/conversions/0-black-and-gold-pitch-deck-infographics-thumb.jpg",
];

const dietTypes = [
  {
    title: "Weight Loss",
    summary: "Calorie deficit with high fiber, steady protein, and low saturated fat.",
  },
  {
    title: "Mass Gaining",
    summary: "Calorie surplus with high carbs, dense meals, and recovery-focused timing.",
  },
  {
    title: "Bodybuilding",
    summary: "High protein, timed carbs, and controlled fats for lean growth.",
  },
  {
    title: "Athletic",
    summary: "Balanced macros, hydration priority, and performance carb cycling.",
  },
  {
    title: "Diabetic",
    summary: "Low GI foods, controlled carbs, and high fiber for stable glucose.",
  },
  {
    title: "Cardiac",
    summary: "Low sodium, healthy fats, and omega-3 rich meals.",
  },
];

export default function Home() {
  return (
    <div className="page">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Premium AI Diet Planning</h1>
          <p className="hero-subtitle">
            Scan meals, decode nutrition, and follow elite diet frameworks with a
            black-and-gold training experience built for precision fitness.
          </p>
          <div className="hero-actions">
            <Link className="btn primary" to="/calories">
              Start Food Scan
            </Link>
            <Link className="btn secondary" to="/planner">
              Explore Diet Plans
            </Link>
          </div>
        </div>
        <div className="hero-card">
          <div className="stat-grid">
            <div className="stat">
              <div className="stat-value">98%</div>
              <div className="stat-label">Meal clarity</div>
            </div>
            <div className="stat">
              <div className="stat-value">6</div>
              <div className="stat-label">Diet types</div>
            </div>
            <div className="stat">
              <div className="stat-value">24/7</div>
              <div className="stat-label">Nutrition tracking</div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-2">
        <div className="card">
          <SectionHeader
            title="What is a Calorie?"
            subtitle="A calorie is a unit of energy. Your daily calorie target decides whether you lose, maintain, or gain weight."
          />
        </div>
        <div className="card">
          <SectionHeader
            title="How Weight Loss Works"
            subtitle="Sustained calorie deficit plus high-protein intake encourages fat loss while preserving muscle."
          />
        </div>
      </section>

      <section>
        <SectionHeader
          title="Fitness and Diet Visual"
          subtitle="A premium overview of performance nutrition, progress, and accountability."
        />
        <div className="image-grid" style={{ marginTop: "20px" }}>
          {visuals.map((src) => (
            <div className="image-frame" key={src}>
              <img src={src} alt="Fitness visual" />
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader
          title="Types of Diets"
          subtitle="Switch plans based on your goal and let the planner handle macros and calorie targets."
        />
        <div className="grid grid-3" style={{ marginTop: "20px" }}>
          {dietTypes.map((diet) => (
            <div className="card" key={diet.title}>
              <h3>{diet.title}</h3>
              <p className="section-subtitle">{diet.summary}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
