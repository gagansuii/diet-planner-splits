import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CaloriesChecker from "./pages/CaloriesChecker";
import DietPlanner from "./pages/DietPlanner";
import DietHistory from "./pages/DietHistory";
import Achievements from "./pages/Achievements";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calories" element={<CaloriesChecker />} />
            <Route path="/planner" element={<DietPlanner />} />
            <Route path="/history" element={<DietHistory />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <footer className="footer">
          <div>AI Diet Planner</div>
          <div className="footer-sub">Premium nutrition intelligence for 2026.</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}
