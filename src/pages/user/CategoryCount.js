import React from "react";
import GlassCard from "../../components/GlassCard";
import "./CSS/CategoryCount.css";

function CategoryCount() {
  return (
    <div>
      <GlassCard>
        <h2>Category Overview</h2>
        <div className="category-list">
          <div className="category-item">
            <span>Amenities:</span>
            <span>20</span>
          </div>
          <div className="category-item">
            <span>Tourist Places:</span>
            <span>8</span>
          </div>
          <div className="category-item">
            <span>Service Providers:</span>
            <span>15</span>
          </div>
          <div className="category-item">
            <span>Properties:</span>
            <span>120</span>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

export default CategoryCount;
