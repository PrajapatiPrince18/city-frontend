import React, { useState, useMemo } from "react";
import GlassCard from "../../../components/GlassCard";
import { FaTree, FaLandmark, FaTools, FaBuilding, FaMapMarkerAlt, FaWater } from "react-icons/fa";
import { GiShop, GiElectric } from "react-icons/gi";
import "./CSS/TourismDashboard.css";

function TourismDashboard() {
  // ====== AMENITIES ======
  const [amenities, setAmenities] = useState([
    { name: "Showrooms", count: 18, icon: <GiShop />, category: "Commercial" },
    { name: "Gardens / Parks", count: 9, icon: <FaTree />, category: "Recreation" },
    { name: "Lakes", count: 2, icon: <FaWater />, category: "Recreation" },
    { name: "Theatres / Cinema", count: 4, icon: <FaLandmark />, category: "Entertainment" },
    { name: "Sports Grounds", count: 6, icon: <FaBuilding />, category: "Sports" },
  ]);

  // ====== TOURIST PLACES ======
  const [touristPlaces, setTouristPlaces] = useState([
    { name: "Annapurna Mata Temple", icon: <FaLandmark /> },
    { name: "Modhera Sun Temple", icon: <FaLandmark /> },
    { name: "Thol Lake Bird Sanctuary", icon: <FaTree /> },
  ]);

  // ====== SERVICE PROVIDERS ======
  const [services, setServices] = useState([
    {
      name: "AC Repair",
      icon: <GiElectric />,
      providers: [
        { business: "CoolTech AC", contact: "9988556677", status: "Approved" },
        { business: "AirCare Solutions", contact: "9876547788", status: "Approved" },
      ],
    },
    {
      name: "Plumber",
      icon: <FaWater />,
      providers: [
        { business: "PipeFix Services", contact: "9123456780", status: "Approved" },
        { business: "WaterFlow Experts", contact: "9870012345", status: "Approved" },
      ],
    },
    {
      name: "Electrician",
      icon: <GiElectric />,
      providers: [
        { business: "Spark Electric Co.", contact: "9876543210", status: "Approved" },
        { business: "Volt Electricians", contact: "9123456789", status: "Approved" },
      ],
    },
  ]);

  // ====== USER REQUESTS ======
  const [userRequests, setUserRequests] = useState([
    { name: "Fresh Air AC Services", contact: "9998887776", service: "AC Repair", status: "Pending" },
    { name: "QuickFix Plumbing", contact: "9123456781", service: "Plumber", status: "Pending" },
  ]);

  // ====== HANDLERS ======
  const handleApprove = (index) => {
    const req = userRequests[index];
    const serviceIndex = services.findIndex((s) => s.name === req.service);
    const updatedServices = [...services];
    updatedServices[serviceIndex].providers.push({
      business: req.name,
      contact: req.contact,
      status: "Approved",
    });
    setServices(updatedServices);

    const updatedRequests = [...userRequests];
    updatedRequests.splice(index, 1);
    setUserRequests(updatedRequests);
  };

  const handleReject = (index) => {
    const updatedRequests = [...userRequests];
    updatedRequests[index].status = "Rejected";
    setUserRequests(updatedRequests);
  };

  // ====== COUNT STATS ======
  const totalAmenities = amenities.length;
  const totalPlaces = touristPlaces.length;
  const totalProviders = services.reduce((sum, s) => sum + s.providers.length, 0);

  return (
    <div className="td-root">
      <h2 className="td-title">Tourism Department Dashboard</h2>

      {/* ====== OVERVIEW STATS ====== */}
      <div className="td-stats">
        <GlassCard className="td-stat-card" style={{ background: "rgba(255, 200, 200, 0.35)" }}>
          <div className="td-icon"><FaTree /></div>
          <div className="td-count">{totalAmenities}</div>
          <div className="td-label">Amenities</div>
        </GlassCard>

        <GlassCard className="td-stat-card" style={{ background: "rgba(200, 220, 255, 0.35)" }}>
          <div className="td-icon"><FaLandmark /></div>
          <div className="td-count">{totalPlaces}</div>
          <div className="td-label">Tourist Places</div>
        </GlassCard>

        <GlassCard className="td-stat-card" style={{ background: "rgba(220, 255, 220, 0.35)" }}>
          <div className="td-icon"><GiShop /></div>
          <div className="td-count">{totalProviders}</div>
          <div className="td-label">Service Providers</div>
        </GlassCard>
      </div>

      {/* ====== USER REQUESTS ====== */}
      {userRequests.length > 0 && (
        <div className="td-requests">
          <h3>User Requests</h3>
          <div className="td-grid">
            {userRequests.map((r, idx) => (
              <GlassCard key={idx} className="td-card" style={{ background: r.status === "Pending" ? "rgba(255,255,180,0.4)" : "rgba(220,220,220,0.3)" }}>
                <h4>{r.name}</h4>
                <p>Service: {r.service}</p>
                <p>Contact: {r.contact}</p>
                <p>Status: {r.status}</p>
                {r.status === "Pending" && (
                  <div className="td-card-buttons">
                    <button className="td-approve-btn" onClick={() => handleApprove(idx)}>Approve</button>
                    <button className="td-reject-btn" onClick={() => handleReject(idx)}>Reject</button>
                  </div>
                )}
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {/* ====== AMENITIES LIST ====== */}
      <div className="td-section">
        <h3>Amenities Overview</h3>
        <div className="td-grid">
          {amenities.map((a, idx) => (
            <GlassCard key={idx} className="td-card" style={{ background: "rgba(255,200,200,0.3)" }}>
              <div className="td-icon">{a.icon}</div>
              <h4>{a.name}</h4>
              <p>Count: {a.count}</p>
              <small>{a.category}</small>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* ====== TOURIST PLACES LIST ====== */}
      <div className="td-section">
        <h3>Tourist Places Overview</h3>
        <div className="td-grid">
          {touristPlaces.map((p, idx) => (
            <GlassCard key={idx} className="td-card" style={{ background: "rgba(200,220,255,0.3)" }}>
              <div className="td-icon">{p.icon}</div>
              <h4>{p.name}</h4>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* ====== SERVICE PROVIDERS ====== */}
      <div className="td-section">
        <h3>Service Providers Overview</h3>
        {services.map((s, idx) => (
          <div key={idx} className="td-service-group">
            <h4>{s.name} ({s.providers.length})</h4>
            <div className="td-grid">
              {s.providers.map((p, i) => (
                <GlassCard key={i} className="td-card" style={{ background: "rgba(220,255,220,0.3)" }}>
                  <div className="td-icon">{s.icon}</div>
                  <h5>{p.business}</h5>
                  <p>Contact: {p.contact}</p>
                  <p>Status: {p.status}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TourismDashboard;
