import { useState } from "react";
import SectionHeader from "../components/SectionHeader";
import UploadPanel from "../components/UploadPanel";
import MacroChart from "../components/MacroChart";
import { analyzeFood } from "../services/api";

const defaultNutrition = {
  calories: 0,
  protein: 0,
  carbs: 0,
  fats: 0,
  fiber: 0,
};

export default function CaloriesChecker() {
  const [nutrition, setNutrition] = useState(defaultNutrition);
  const [foodName, setFoodName] = useState("No food analyzed");
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileSelect = async (file) => {
    setError("");
    setLoading(true);
    setPreviewUrl(URL.createObjectURL(file));
    try {
      const result = await analyzeFood(file);
      const nutritionData = result.nutrition || result;
      setFoodName(result.food || "Unknown");
      setNutrition({ ...defaultNutrition, ...nutritionData });
    } catch (err) {
      setError("Unable to analyze food right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <SectionHeader
        title="Calories Checker"
        subtitle="Upload a meal photo to identify the food and reveal its macro profile."
      />

      <div className="grid grid-2">
        <UploadPanel
          onFileSelect={handleFileSelect}
          previewUrl={previewUrl}
          loading={loading}
          error={error}
        />
        <div className="card">
          <h3>Analysis</h3>
          <p className="section-subtitle">Detected food: {foodName}</p>
          <div className="macro-grid" style={{ marginTop: "16px" }}>
            <div className="macro-card">
              <div className="macro-value">{nutrition.calories}</div>
              <div className="upload-sub">Calories</div>
            </div>
            <div className="macro-card">
              <div className="macro-value">{nutrition.protein}g</div>
              <div className="upload-sub">Protein</div>
            </div>
            <div className="macro-card">
              <div className="macro-value">{nutrition.carbs}g</div>
              <div className="upload-sub">Carbs</div>
            </div>
            <div className="macro-card">
              <div className="macro-value">{nutrition.fats}g</div>
              <div className="upload-sub">Fats</div>
            </div>
            <div className="macro-card">
              <div className="macro-value">{nutrition.fiber}g</div>
              <div className="upload-sub">Fiber</div>
            </div>
          </div>
        </div>
      </div>

      <MacroChart data={nutrition} />
    </div>
  );
}
