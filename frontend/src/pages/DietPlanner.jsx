import SectionHeader from "../components/SectionHeader";
import DietCard from "../components/DietCard";

const diets = [
  {
    title: "Weight Loss Diet",
    description: "Focused on calorie deficit and fiber-rich meals to cut fat while preserving strength.",
    points: ["Calorie deficit", "High fiber", "Moderate protein", "Low fats"],
    image:
      "https://images.openai.com/static-rsc-3/dp00Lwe-1dSMt4JPS3Ct3M2Msz0zz30AXHsNX-P-sgMYDlZ_IOhJ--qZZsFTqishQurYqym8pBmtfjjHhU3E3_zO0J99Ko20qDz_SvayS9Q?purpose=fullsize&v=1",
  },
  {
    title: "Mass Gaining Diet",
    description: "Calorie surplus with dense carbohydrates and recovery-focused protein timing.",
    points: ["Calorie surplus", "High carbs", "High protein", "Recovery meals"],
    image:
      "https://www.myprotein.com/images?auto=avif&fit=crop&height=282&url=https%3A%2F%2Fblogscdn.thehut.net%2Fapp%2Fuploads%2Fsites%2F478%2F2024%2F03%2FMYP-Rebrand-23-Blog-Thumbnail-Templates-New-Page_1711634113.jpeg&width=500",
  },
  {
    title: "Bodybuilding Diet",
    description: "Lean gains with high protein, timed carbs, and controlled fats.",
    points: ["High protein", "Timed carbs", "Controlled fats", "Lean recovery"],
    image:
      "https://images.openai.com/static-rsc-3/MPUHE1ZHZ3cO4pkqyIHAtAU25RSN4MYahDc98N2LEXlzEtCVU7iZxottz_87Mwz86TFkSlprTxTM0blbI93E3QbQHQniAUZhAolHZHOlNAE?purpose=fullsize&v=1",
  },
  {
    title: "Athletic Diet",
    description: "Balance macros with hydration and carb cycling for performance.",
    points: ["Balanced macros", "High hydration", "Carb cycling", "Performance focus"],
    image:
      "https://images.openai.com/static-rsc-3/iCg_BXPa5PX5-OYwk0bNeeV_XqbtjshxrAR6d15QhpKdTWA1KtAxJmjydhzniA5bLb_SzkcXZ67dRpqrfP5tjP0QKp1vPA9wYLmmD_G3NFU?purpose=fullsize&v=1",
  },
  {
    title: "Diabetic Diet",
    description: "Low glycemic meals to stabilize glucose with consistent fiber intake.",
    points: ["Low GI foods", "Controlled carbs", "High fiber", "Stable glucose"],
    image:
      "https://images.openai.com/static-rsc-3/M_bDi2NWSyHF14DmzSaZ_fNV9bJRnuKLaX0T2neDBtLG8G8X5SH0nNrQgB4ocZ99UgKa5ot6vsBX8TA5aonQi-dxsnAxQjz1ZmRcF-U_LeY?purpose=fullsize&v=1",
  },
  {
    title: "Cardiac Diet",
    description: "Heart-friendly nutrition with low sodium and omega-3 fats.",
    points: ["Low sodium", "Low saturated fats", "High omega-3", "Heart health"],
    image:
      "https://media.slidesgo.com/storage/29652378/conversions/2-black-and-gold-pitch-deck-infographics-thumb.jpg",
  },
];

export default function DietPlanner() {
  return (
    <div className="page">
      <SectionHeader
        title="Diet Planner"
        subtitle="Choose a structured diet and keep macros aligned with your fitness goals."
      />
      <div className="grid" style={{ marginTop: "12px" }}>
        {diets.map((diet) => (
          <DietCard key={diet.title} {...diet} />
        ))}
      </div>
    </div>
  );
}
