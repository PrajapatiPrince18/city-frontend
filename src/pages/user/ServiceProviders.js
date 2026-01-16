import React, { useState } from "react";
import GlassCard from "../../components/GlassCard";
import Popup from "../../components/Popup";
import "./CSS/ServiceProviders.css";

function ServiceProviders() {

  const shuffle = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const services = [
    { name: "AC Repair", icon: "❄️", providers: [{ business: "CoolTech AC Services", contact: "9988556677" }, { business: "AirCare Solutions", contact: "9876547788" }] },
    { name: "Car Mechanic", icon: "🚗", providers: [{ business: "Mehsana AutoCare", contact: "9877766554" }, { business: "DriveFix Garage", contact: "9122334455" }] },
    { name: "Carpenter", icon: "🪚", providers: [{ business: "WoodWorks", contact: "9871122334" }, { business: "HandyCarpentry", contact: "9122334455" }] },
    { name: "Electrician", icon: "💡", providers: [{ business: "Spark Electric Co.", contact: "9876543210" }, { business: "Volt Electricians", contact: "9123456789" }] },
    { name: "Gardener", icon: "🌿", providers: [{ business: "GreenThumb", contact: "9900112233" }, { business: "LawnPro", contact: "9988112233" }] },
    { name: "House Cleaning", icon: "🧹", providers: [{ business: "Sparkle Cleaners", contact: "9988773344" }, { business: "ShinyHomes", contact: "9122003344" }] },
    { name: "Internet Provider", icon: "🌐", providers: [{ business: "FiberNet", contact: "9988776655" }, { business: "QuickConnect", contact: "9876541122" }] },
    { name: "Laundry & Dry Cleaning", icon: "🧺", providers: [{ business: "Fresh Laundry", contact: "9877778899" }, { business: "Clean & Dry", contact: "9122336677" }] },
    { name: "Painter", icon: "🎨", providers: [{ business: "ColorMasters", contact: "9988771122" }, { business: "ProPainters", contact: "9122445566" }] },
    { name: "Plaster & Masonry", icon: "🧱", providers: [{ business: "Stone & Brick", contact: "9876541123" }, { business: "Masonry Experts", contact: "9123445566" }] },
    { name: "Plumber", icon: "🔧", providers: [{ business: "PipeFix Services", contact: "9123456780" }, { business: "WaterFlow Experts", contact: "9870012345" }] },
    { name: "Security Services", icon: "🛡️", providers: [{ business: "SafeGuard Security", contact: "9988776655" }, { business: "Watchful Eyes", contact: "9876655443" }] }
  ];

  const [selectedService, setSelectedService] = useState(null);

  const [newBusiness, setNewBusiness] = useState({
    name: "",
    contact: "",
    service: services[0].name,
  });

  const [registeredBusinesses, setRegisteredBusinesses] = useState([]);

  // 🔔 Popup State
  const [popup, setPopup] = useState({
    show: false,
    title: "",
    message: "",
    type: "info",
  });

  const handleBack = () => setSelectedService(null);

  const handleChange = (e) => {
    setNewBusiness({ ...newBusiness, [e.target.name]: e.target.value });
  };

  const handleSubmitBusiness = (e) => {
    e.preventDefault();

    // 🔴 Validation error popup
    if (!newBusiness.name || !newBusiness.contact) {
      setPopup({
        show: true,
        title: "Error",
        message: "Please fill all fields",
        type: "error",
      });
      return;
    }

    setRegisteredBusinesses([
      ...registeredBusinesses,
      { ...newBusiness, status: "Pending" }
    ]);

    setNewBusiness({ name: "", contact: "", service: services[0].name });

    // 🟢 Success popup
    setPopup({
      show: true,
      title: "Request Submitted",
      message: "Your business request has been submitted for approval!",
      type: "success",
    });
  };

  return (
    <div className="sep-root">
      <div className="sep-container">

        {/* 🔔 Popup */}
        <Popup
          show={popup.show}
          title={popup.title}
          message={popup.message}
          type={popup.type}
          onClose={() => setPopup({ ...popup, show: false })}
        />

        {/* Header */}
        <div className="sep-header">
          <h1>Service Providers - Mehsana City</h1>
          <p>Contact professionals in your city instantly</p>
        </div>

        {/* Services Grid */}
        {!selectedService ? (
          <div className="sep-services-grid">
            {services.map((s, index) => (
              <div
                key={index}
                className="sep-card"
                onClick={() =>
                  setSelectedService({ ...s, providers: shuffle(s.providers) })
                }
              >
                <div className="sep-icon">{s.icon}</div>
                <h3>{s.name}</h3>
                <p>{s.providers.length} providers</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="sep-details-section">
            <button className="sep-back-btn" onClick={handleBack}>
              ← Back to Services
            </button>
            <h2>{selectedService.name} Providers</h2>
            <div className="sep-providers-list">
              {selectedService.providers.map((p, index) => (
                <div key={index} className="sep-card">
                  <h3>{p.business}</h3>
                  <p>Contact: {p.contact}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="sep-extra-info">
          <h2>Tips for Hiring a Professional</h2>
          <ul>
            <li>Always check reviews before hiring.</li>
            <li>Compare multiple providers for best rates.</li>
            <li>Ensure proper licensing where applicable.</li>
            <li>Ask for warranty or service guarantee.</li>
          </ul>
        </div>

        {/* Register Business */}
        <GlassCard className="sep-card">
          <h2 className="sep-form-heading">Register Your Business</h2>
          <form className="sep-form" onSubmit={handleSubmitBusiness}>
            <label>
              Business Name:
              <input
                type="text"
                name="name"
                value={newBusiness.name}
                onChange={handleChange}
              />
            </label>

            <label>
              Contact Number:
              <input
                type="text"
                name="contact"
                value={newBusiness.contact}
                onChange={handleChange}
              />
            </label>

            <label>
              Service Type:
              <select name="service" value={newBusiness.service} onChange={handleChange}>
                {services.map((s, idx) => (
                  <option key={idx} value={s.name}>{s.name}</option>
                ))}
              </select>
            </label>

            <button type="submit" className="sep-submit-btn">
              Submit Business
            </button>
          </form>

          {registeredBusinesses.length > 0 && (
            <div className="sep-registered-list">
              <h3>Your Submitted Requests</h3>
              <ul>
                {registeredBusinesses.map((b, idx) => (
                  <li key={idx}>
                    {b.name} ({b.service}) - Status: {b.status}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </GlassCard>

      </div>
    </div>
  );
}

export default ServiceProviders;
 