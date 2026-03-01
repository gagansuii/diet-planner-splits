import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/calories", label: "Calories Checker" },
  { to: "/planner", label: "Diet Planner" },
  { to: "/history", label: "Diet History" },
  { to: "/achievements", label: "Achievements" },
];

export default function Navbar() {
  return (
    <header className="nav">
      <div className="brand">
        <div className="brand-mark" />
        <div>
          <div className="brand-title">AI Diet Planner</div>
          <div className="brand-sub">Black Gold Fitness</div>
        </div>
      </div>
      <nav className="nav-links">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
      <NavLink className="nav-cta" to="/calories">
        Scan Food
      </NavLink>
    </header>
  );
}
