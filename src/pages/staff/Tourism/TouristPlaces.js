import React, { useState } from "react";
import GlassCard from "../../../components/GlassCard";
import Popup from "../../../components/Popup"; // custom popup component
import "./CSS/TouristPlaces.css";

function StaffTouristPlaces() {
  const [places, setPlaces] = useState([
    {
      name: "Annapurna Mata Temple, Modipur",
      description:
        "Famous spiritual temple and annual fair (Melo) in Modipur, visited by thousands.",
      query: "Annapurna Mata Temple, Modipur, Mehsana, Gujarat",
      image: "/assetes/Images/Tourist/Annapurna.jpeg",
    },
    {
      name: "Modhera Sun Temple",
      description:
        "Ancient Sun Temple built in 1026–27 CE, great architecture & history.",
      query: "Modhera Sun Temple, Mehsana, Gujarat",
      image: "/assetes/Images/Tourist/modhera.png",
    },
    {
      name: "Dharoi Dam & Adventure Fest",
      description:
        "Dam with water views and adventure activities (parasailing, trekking).",
      query: "Dharoi Dam, Mehsana, Gujarat",
      image: "/assetes/Images/Tourist/Dharoi.png",
    },
    {
      name: "Thol Lake Bird Sanctuary",
      description: "Birdwatching and nature spot with migratory birds.",
      query: "Thol Lake Bird Sanctuary, Mehsana, Gujarat",
      image: "/assetes/Images/Tourist/Thol.png",
    },
    {
      name: "Taranga Hills & Temple",
      description: "Scenic hills with ancient temple trails.",
      query: "Taranga Hills, Mehsana, Gujarat",
      image: "/assetes/Images/Tourist/Taranga.png",
    },
    {
      name: "Kirti Toran, Vadnagar",
      description: "Historic toran (ornamental arch) in Vadnagar.",
      query: "Kirti Toran, Vadnagar, Mehsana, Gujarat",
      image: "/assetes/Images/Tourist/KirtiToran.png",
    },
    {
      name: "Sharmishtha Talav",
      description: "Serene historic water tank and regeneration spot.",
      query: "Sharmishtha Talav, Mehsana, Gujarat",
      image: "/assetes/Images/Tourist/Sharmstha.png",
    },
    {
      name: "Bahuchar Mata Temple, Becharaji",
      description: "Important spiritual temple in Mehsana district.",
      query: "Bahuchar Mata Temple, Becharaji, Mehsana, Gujarat",
      image: "/assetes/Images/Tourist/Bahucharaji.jpg",
    },
  ]);

  // ===== STATE FOR FORM =====
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    query: "",
    image: "",
  });

  const [preview, setPreview] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // ===== POPUP STATE =====
  const [popup, setPopup] = useState({
    show: false,
    title: "",
    message: "",
    type: "", // 'confirm' | 'success' | 'error'
    onConfirm: null,
  });

  // ===== HANDLE CHANGE FOR TEXT INPUT =====
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ===== ADD / UPDATE =====
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setPopup({
        show: true,
        title: "Validation Error",
        message: "Place name is required",
        type: "error",
      });
      return;
    }

    if (editIndex !== null) {
      const updated = [...places];
      updated[editIndex] = formData;
      setPlaces(updated);
      setEditIndex(null);
    } else {
      setPlaces([...places, formData]);
    }

    setFormData({ name: "", description: "", query: "", image: "" });
    setPreview("");
    setShowForm(false);

    setPopup({
      show: true,
      title: "Success",
      message: editIndex !== null ? "Place updated successfully" : "Place added successfully",
      type: "success",
    });
  };

  // ===== EDIT BUTTON =====
  const handleEdit = (index) => {
    setFormData(places[index]);
    setPreview(places[index].image);
    setEditIndex(index);
    setShowForm(true);
  };

  // ===== DELETE BUTTON =====
  const handleDelete = (index) => {
    setPopup({
      show: true,
      title: "Delete Place",
      message: `Are you sure you want to delete "${places[index].name}"?`,
      type: "confirm",
      onConfirm: () => {
        setPlaces(places.filter((_, i) => i !== index));
        setPopup({
          show: true,
          title: "Deleted",
          message: "Place deleted successfully",
          type: "success",
        });
      },
    });
  };

  return (
    <div className="tp-root">
      <h2 className="tp-title">Tourist Places Management (Staff)</h2>

      {/* ================= TOTAL PLACES STAT ================= */}
      <div className="tp-stats-container">
        <div className="tp-stat-card">
          <div className="tp-stat-icon">🏛️</div>
          <div className="tp-stat-value">{places.length}</div>
          <div className="tp-stat-title">Total Tourist Places</div>
        </div>
      </div>

      {/* ================= ACTION BUTTON ================= */}
      <button
        onClick={() => {
          setShowForm(true);
          setEditIndex(null);
          setFormData({ name: "", description: "", query: "", image: "" });
          setPreview("");
        }}
        className="tp-add-btn"
      >
        + Add New Place
      </button>

      {/* ================= FORM ================= */}
      {showForm && (
        <GlassCard title={editIndex !== null ? "Edit Place" : "Add New Place"}>
          <form onSubmit={handleSubmit} className="tp-form">
            <input
              type="text"
              name="name"
              placeholder="Place Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <textarea
              name="description"
              placeholder="Short Description"
              value={formData.description}
              onChange={handleChange}
            />
            <input
              type="text"
              name="query"
              placeholder="Google Maps Search Query"
              value={formData.query}
              onChange={handleChange}
            />

            <label style={{ fontWeight: "bold" }}>Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const imageURL = URL.createObjectURL(file);
                  setPreview(imageURL);
                  setFormData({ ...formData, image: imageURL });
                }
              }}
            />

            {preview && (
              <img
                src={preview}
                alt="Preview"
                style={{
                  width: "140px",
                  borderRadius: "10px",
                  marginTop: "10px",
                }}
              />
            )}

            <div style={{ display: "flex", gap: "10px" }}>
              <button type="submit" className="tp-directions-btn">
                {editIndex !== null ? "Update" : "Add Place"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setPreview("");
                }}
                className="tp-cancel-btn"
              >
                Cancel
              </button>
            </div>
          </form>
        </GlassCard>
      )}

      {/* ================= TOURIST PLACE CARDS ================= */}
      <div className="tp-cards-container">
        {places.map((place, index) => (
          <GlassCard key={index} className="tp-card">
            <img src={place.image} alt={place.name} className="tp-card-img" />
            <div className="tp-card-content">
              <h3>{place.name}</h3>
              <p>{place.description}</p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  place.query
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="tp-directions-btn"
              >
                View in Maps
              </a>

              <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
                <button
                  onClick={() => handleEdit(index)}
                  className="tp-directions-btn"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="tp-delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* ================= POPUP ================= */}
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

export default StaffTouristPlaces;
