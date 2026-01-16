import React, { useState, useMemo } from "react";
import GlassCard from "../../../components/GlassCard";
import Popup from "../../../components/Popup";
import "./CSS/Amenities.css";

function Amenities() {
  const [amenities, setAmenities] = useState([
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
  ]);

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
    "Religious",
  ];

  /* FILTER STATES */
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortAZ, setSortAZ] = useState(true);

  /* FORM STATES */
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    count: "",
    icon: "",
    category: "All",
  });
  const [editIndex, setEditIndex] = useState(null);

  /* POPUP STATE */
  const [popup, setPopup] = useState({
    show: false,
    title: "",
    message: "",
    type: "",
    onConfirm: null,
  });

  /* FILTER LOGIC */
  const filteredAmenities = useMemo(() => {
    let data = [...amenities];

    if (category !== "All") data = data.filter(a => a.category === category);
    if (search.trim())
      data = data.filter(a =>
        a.name.toLowerCase().includes(search.toLowerCase())
      );

    return data.sort((a, b) =>
      sortAZ ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
  }, [amenities, category, search, sortAZ]);

  /* FORM HANDLERS */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.count || !formData.icon || !formData.category) {
      setPopup({
        show: true,
        title: "Validation Error",
        message: "All fields are required.",
        type: "error",
      });
      return;
    }

    if (editIndex !== null) {
      const updated = [...amenities];
      updated[editIndex] = formData;
      setAmenities(updated);

      setPopup({
        show: true,
        title: "Updated",
        message: "Amenity updated successfully.",
        type: "success",
      });
    } else {
      setAmenities([...amenities, formData]);

      setPopup({
        show: true,
        title: "Added",
        message: "Amenity added successfully.",
        type: "success",
      });
    }

    setEditIndex(null);
    setFormData({ name: "", count: "", icon: "", category: "All" });
    setShowForm(false);
  };

  const handleEdit = (index) => {
    setFormData(amenities[index]);
    setEditIndex(index);
    setShowForm(true);
  };

  // ✅ FIXED DELETE: pass the actual amenity object
  const handleDelete = (item) => {
    setPopup({
      show: true,
      title: "Delete Amenity",
      message: `Are you sure you want to delete "${item.name}"?`,
      type: "confirm",
      onConfirm: () => {
        setAmenities(prev => prev.filter(a => a !== item));
        setPopup(prev => ({ ...prev, show: false }));
      },
    });
  };

  return (
    <div className="sa-root">
      <h2 className="sa-title">Amenities Management (Staff)</h2>

      {/* FILTER BAR */}
      <div className="sa-filter-bar">
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

        <button
          className="sa-add-btn"
          onClick={() => {
            setShowForm(true);
            setEditIndex(null);
            setFormData({ name: "", count: "", icon: "", category: "All" });
          }}
        >
          + Add Amenity
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <GlassCard>
          <form className="sa-form" onSubmit={handleSubmit}>
            <input name="name" placeholder="Amenity Name" value={formData.name} onChange={handleChange} />
            <input name="count" type="number" placeholder="Count" value={formData.count} onChange={handleChange} />
            <input name="icon" placeholder="Icon (emoji)" value={formData.icon} onChange={handleChange} />
            <select name="category" value={formData.category} onChange={handleChange}>
              {categories.filter(c => c !== "All").map((c, i) => (
                <option key={i} value={c}>{c}</option>
              ))}
            </select>

            <div className="sa-form-actions">
              <button type="submit" className="sa-submit-btn">
                {editIndex !== null ? "Update" : "Add"}
              </button>
              <button type="button" className="sa-cancel-btn" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </form>
        </GlassCard>
      )}

      {/* GRID */}
      <div className="sa-grid">
        {filteredAmenities.map((a, index) => (
          <div key={index} className="sa-card">
            <div className="sa-icon">{a.icon}</div>
            <h3>{a.name}</h3>
            <p>{a.count} available</p>
            <small>{a.category}</small>
            <div className="sa-card-buttons">
              <button className="sa-edit-btn" onClick={() => handleEdit(amenities.indexOf(a))}>Edit</button>
              <button className="sa-delete-btn" onClick={() => handleDelete(a)}>Delete</button>
            </div>
          </div>
        ))}

        {filteredAmenities.length === 0 && (
          <p className="sa-no-results">No results found</p>
        )}
      </div>

      {/* POPUP */}
      <Popup
        show={popup.show}
        title={popup.title}
        message={popup.message}
        type={popup.type}
        onConfirm={popup.onConfirm}
        onClose={() => setPopup({ ...popup, show: false })}
      />
    </div>
  );
}

export default Amenities;
