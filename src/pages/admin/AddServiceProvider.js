import React, { useState } from "react";
import GlassCard from "../../components/GlassCard";
import Popup from "../../components/Popup"; // <-- import Popup
import "./CSS/AddServiceProvider.css";

function AddServiceProvider() {
  const [provider, setProvider] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
  });

  // ---------- POPUP STATE ----------
  const [popup, setPopup] = useState({
    show: false,
    type: "alert",
    title: "",
    message: "",
    onConfirm: null,
  });

  const openPopup = (type, title, message, onConfirm = null) =>
    setPopup({ show: true, type, title, message, onConfirm });
  const closePopup = () => setPopup({ ...popup, show: false });

  const handleChange = (e) => {
    setProvider({ ...provider, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!provider.name || !provider.email || !provider.phone || !provider.service) {
      openPopup("error", "Error", "Please fill in all fields!");
      return;
    }

    openPopup(
      "success",
      "Success",
      `Service Provider "${provider.name}" added successfully!`
    );

    // Reset form
    setProvider({ name: "", email: "", phone: "", service: "" });
  };

  return (
    <div className="add-service-provider">
      <h2 className="page-title">Add Service Provider</h2>

      <GlassCard>
        <form className="provider-form" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={provider.name}
              onChange={handleChange}
              placeholder="Enter provider name"
              required
            />
          </div>

          {/* Email */}
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={provider.email}
              onChange={handleChange}
              placeholder="Enter provider email"
              required
            />
          </div>

          {/* Phone */}
          <div className="input-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={provider.phone}
              onChange={handleChange}
              placeholder="Enter provider phone"
              required
            />
          </div>

          {/* Service */}
          <div className="input-group">
            <label>Service</label>
            <input
              type="text"
              name="service"
              value={provider.service}
              onChange={handleChange}
              placeholder="Enter service provided"
              required
            />
          </div>

          {/* Submit */}
          <button type="submit" className="submit-btn">
            Add Provider
          </button>
        </form>
      </GlassCard>

      {/* POPUP */}
      <Popup
        show={popup.show}
        type={popup.type}
        title={popup.title}
        message={popup.message}
        onConfirm={popup.onConfirm}
        onClose={closePopup}
      />
    </div>
  );
}

export default AddServiceProvider;
