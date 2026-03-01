export default function DietCard({ title, description, points, image }) {
  return (
    <article className="card diet-card">
      <div className="diet-media" style={{ backgroundImage: `url(${image})` }} />
      <div className="diet-body">
        <h3>{title}</h3>
        <p>{description}</p>
        <ul className="list">
          {points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
