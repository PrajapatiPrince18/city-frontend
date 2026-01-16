import React, { useState } from "react";
import GlassCard from "../../../components/GlassCard";
import Popup from "../../../components/Popup"; // centralized popup
import "./CSS/Property.css";

function Property() {
  const [properties, setProperties] = useState([
    { id: 1, number: "P-101", type: "House", owner: "Rahul Sharma", mobile: "9876543210", address: "Sector 12, City" },
    { id: 2, number: "P-102", type: "Land", owner: "Anita Patel", mobile: "9123456780", address: "Sector 5, City" },
    { id: 3, number: "P-103", type: "Apartment", owner: "Sunil Verma", mobile: "9988776655", address: "Lake View Apartments, City" },
  ]);

  const [newProperty, setNewProperty] = useState({
    number: "",
    type: "",
    owner: "",
    mobile: "",
    address: "",
  });

  const [editId, setEditId] = useState(null);
  const [tempEdit, setTempEdit] = useState({});

  // ===== Popup State =====
  const [popup, setPopup] = useState({
    show: false,
    title: "",
    message: "",
    type: "", // success, error, info
  });

  // ===== Add Form Input Change =====
  const handleChange = (e) => {
    setNewProperty({ ...newProperty, [e.target.name]: e.target.value });
  };

  // ===== Edit Form Input Change =====
  const handleEditChange = (e) => {
    setTempEdit({ ...tempEdit, [e.target.name]: e.target.value });
  };

  // ===== Add New Property =====
  const handleAdd = (e) => {
    e.preventDefault();
    const { number, type, owner, mobile } = newProperty;

    if (!number || !type || !owner || !mobile) {
      setPopup({
        show: true,
        title: "Error",
        message: "Please fill all required fields!",
        type: "error",
      });
      return;
    }

    if (properties.some((p) => p.number === number)) {
      setPopup({
        show: true,
        title: "Error",
        message: "Property number must be unique!",
        type: "error",
      });
      return;
    }

    const newProp = { id: properties.length + 1, ...newProperty };
    setProperties([...properties, newProp]);
    setNewProperty({ number: "", type: "", owner: "", mobile: "", address: "" });

    setPopup({
      show: true,
      title: "Success",
      message: "Property added successfully!",
      type: "success",
    });
  };

  // ===== Edit Property =====
  const handleEdit = (prop) => {
    setEditId(prop.id);
    setTempEdit({ ...prop });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!tempEdit.owner || !tempEdit.mobile) {
      setPopup({
        show: true,
        title: "Error",
        message: "Owner name and mobile cannot be empty!",
        type: "error",
      });
      return;
    }

    setProperties(
      properties.map((p) => (p.id === tempEdit.id ? { ...tempEdit } : p))
    );
    setEditId(null);

    setPopup({
      show: true,
      title: "Success",
      message: "Property updated successfully!",
      type: "success",
    });
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setPopup({
      show: true,
      title: "Info",
      message: "Edit cancelled.",
      type: "info",
    });
  };

  return (
    <div className="property-page">
      <h2 className="page-title">Property Management</h2>
      <p className="page-subtitle">
        Add, allocate, and manage properties assigned to users.
      </p>

      {/* ===== Add Property Form ===== */}
      <GlassCard className="alloc-card">
        <h3>Add New Property</h3>
        <form className="alloc-form" onSubmit={handleAdd}>
          <label>Property Number</label>
          <input
            type="text"
            name="number"
            value={newProperty.number}
            onChange={handleChange}
            placeholder="Unique property number"
            required
          />

          <label>Property Type</label>
          <select
            name="type"
            value={newProperty.type}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            <option value="House">House</option>
            <option value="Land">Land</option>
            <option value="Apartment">Apartment</option>
            <option value="Commercial">Commercial</option>
          </select>

          <label>Owner Name</label>
          <input
            type="text"
            name="owner"
            value={newProperty.owner}
            onChange={handleChange}
            placeholder="Owner name"
            required
          />

          <label>Owner Mobile</label>
          <input
            type="text"
            name="mobile"
            value={newProperty.mobile}
            onChange={handleChange}
            placeholder="Contact number"
            required
          />

          <label>Correspondence Address</label>
          <input
            type="text"
            name="address"
            value={newProperty.address}
            onChange={handleChange}
            placeholder="Optional address"
          />

          <button type="submit" className="allocate-btn">
            Add & Allocate
          </button>
        </form>
      </GlassCard>

      {/* ===== Properties List ===== */}
      <div className="property-list">
        {properties.map((prop) => (
          <GlassCard key={prop.id} className="property-card">
            {editId === prop.id ? (
              <form className="edit-form" onSubmit={handleSaveEdit}>
                <label>Property Number</label>
                <input type="text" value={tempEdit.number} disabled />

                <label>Property Type</label>
                <input type="text" value={tempEdit.type} disabled />

                <label>Owner Name</label>
                <input
                  type="text"
                  name="owner"
                  value={tempEdit.owner}
                  onChange={handleEditChange}
                  required
                />

                <label>Owner Mobile</label>
                <input
                  type="text"
                  name="mobile"
                  value={tempEdit.mobile}
                  onChange={handleEditChange}
                  required
                />

                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={tempEdit.address}
                  onChange={handleEditChange}
                />

                <div className="edit-buttons">
                  <button type="submit" className="save-btn">Save</button>
                  <button type="button" className="cancel-btn" onClick={handleCancelEdit}>
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <p><strong>Property No:</strong> {prop.number}</p>
                <p><strong>Type:</strong> {prop.type}</p>
                <p><strong>Owner:</strong> {prop.owner}</p>
                <p><strong>Mobile:</strong> {prop.mobile}</p>
                {prop.address && <p><strong>Address:</strong> {prop.address}</p>}
                <button className="edit-btn" onClick={() => handleEdit(prop)}>
                  Edit Owner Details
                </button>
              </>
            )}
          </GlassCard>
        ))}
      </div>

      {/* ===== Popup ===== */}
      <Popup
        show={popup.show}
        title={popup.title}
        message={popup.message}
        type={popup.type}
        onClose={() => setPopup({ ...popup, show: false })}
      />
    </div>
  );
}

export default Property;
