import "./CSS/GlassCard.css";

function GlassCard({ title, children }) {
  return (
    <div className="gc-card">
      {title && <h3 className="gc-card-title">{title}</h3>}
      <div className="gc-card-content">
        {children}
      </div>
    </div>
  );
}

export default GlassCard;
