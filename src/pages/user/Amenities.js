import React, { useState, useMemo } from "react";
import GlassCard from "../../components/GlassCard";
import "./CSS/Amenities.css";

function Amenities() {
  const amenities = [
    { name: "Showrooms", count: 18, icon: "🏬", category: "Commercial" },
    { name: "Gardens / Parks", count: 9, icon: "🌳", category: "Recreation" },
    { name: "Lakes", count: 2, icon: "🌊", category: "Recreation" },
    { name: "Theatres / Cinema", count: 4, icon: "🎬", category: "Entertainment" },
    { name: "Sports Grounds", count: 6, icon: "🏏", category: "Sports" },
    { name: "Gyms", count: 12, icon: "💪", category: "Sports" },
    { name: "Swimming Pools", count: 3, icon: "🏊‍♂️", category: "Sports" },
    { name: "Community Halls", count: 5, icon: "🏛️", category: "Public" },
    { name: "Libraries", count: 3, icon: "📚", category: "Education" },
    { name: "Playgrounds", count: 10, icon: "⚽", category: "Sports" },

    { name: "Hospitals", count: 15, icon: "🏥", category: "Health" },
    { name: "Clinics & Dispensaries", count: 25, icon: "🩺", category: "Health" },
    { name: "Pharmacies", count: 30, icon: "💊", category: "Health" },
    { name: "Blood Banks", count: 2, icon: "🩸", category: "Health" },

    { name: "Markets / Bazaars", count: 20, icon: "🛍", category: "Commercial" },
    { name: "Shopping Malls", count: 2, icon: "🏢", category: "Commercial" },
    { name: "Restaurants", count: 35, icon: "🍽", category: "Food" },
    { name: "Cafés", count: 14, icon: "☕", category: "Food" },
    { name: "Street Food Zones", count: 10, icon: "🌮", category: "Food" },

    { name: "Schools", count: 45, icon: "🏫", category: "Education" },
    { name: "Colleges", count: 12, icon: "🎓", category: "Education" },
    { name: "Universities", count: 3, icon: "🎒", category: "Education" },

    { name: "Hotels & Lodges", count: 16, icon: "🏨", category: "Hospitality" },
    { name: "Resorts", count: 4, icon: "🏝", category: "Hospitality" },
    { name: "Hostels / PG", count: 8, icon: "🛏", category: "Hospitality" },

    { name: "Banks", count: 25, icon: "🏦", category: "Finance" },
    { name: "ATMs", count: 40, icon: "💳", category: "Finance" },

    { name: "Police Stations", count: 5, icon: "👮", category: "Public" },
    { name: "Fire Stations", count: 2, icon: "🚒", category: "Public" },
    { name: "Post Offices", count: 6, icon: "📮", category: "Public" },

    { name: "Bus Stands", count: 3, icon: "🚍", category: "Transport" },
    { name: "Railway Stations", count: 1, icon: "🚆", category: "Transport" },
    { name: "Parking Areas", count: 12, icon: "🅿️", category: "Transport" },
    { name: "EV Charging Stations", count: 4, icon: "🔌", category: "Transport" },

    { name: "Temples", count: 50, icon: "🛕", category: "Religious" },
    { name: "Mosques", count: 6, icon: "🕌", category: "Religious" },
    { name: "Churches", count: 2, icon: "⛪", category: "Religious" },

    { name: "Convention / Event Halls", count: 7, icon: "🎤", category: "Public" },
    { name: "Clubs", count: 5, icon: "🎯", category: "Entertainment" },
    { name: "Youth & Sports Clubs", count: 6, icon: "🤸", category: "Sports" }
  ];

  // ---------- FILTER + SORT STATES ----------
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortAZ, setSortAZ] = useState(true);

  // ---------- CATEGORY LIST ----------
  const categories = [
    "All",
    "Health",
    "Education",
    "Transport",
    "Sports",
    "Food",
    "Commercial",
    "Entertainment",
    "Hospitality",
    "Finance",
    "Recreation",
    "Public",
    "Religious"
  ];

  // ---------- FILTER + SORT LOGIC ----------
  const filteredAmenities = useMemo(() => {
    let data = amenities;

    if (category !== "All") {
      data = data.filter(a => a.category === category);
    }

    if (search.trim() !== "") {
      data = data.filter(a =>
        a.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    data = data.sort((a, b) =>
      sortAZ ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );

    return data;
  }, [category, search, sortAZ, amenities]);

  return (
    <div className="am-root">
      <div className="am-container">

        <div className="am-header">
          <h1>Amenities</h1>
          <p>Explore public services, facilities and places across the city</p>
        </div>

        {/* FILTER BAR */}
        <div className="am-filter-bar">
          <input
            type="text"
            placeholder="Search amenities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((c, i) => (
              <option key={i} value={c}>{c}</option>
            ))}
          </select>

          <button onClick={() => setSortAZ(!sortAZ)}>
            Sort: {sortAZ ? "A → Z" : "Z → A"}
          </button>
        </div>

        {/* GRID */}
        <div className="am-amenities-section">
          {filteredAmenities.map((a, index) => (
            <div key={index} className="am-card">
              <div className="am-icon">{a.icon}</div>
              <h3>{a.name}</h3>
              <p>{a.count} available</p>
              <small>{a.category}</small>
            </div>
          ))}

          {filteredAmenities.length === 0 && (
            <p>No results found</p>
          )}
        </div>

      </div>
    </div>
  );
}

export default Amenities;
