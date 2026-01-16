import React from "react";
import {
  FaUsers,
  FaUserTie,
  FaHome,
  FaExclamationTriangle,
  FaCheckCircle,
  FaMapMarkedAlt,
  FaCity,
  FaStore
} from "react-icons/fa";
import GlassCard from "../../components/GlassCard";
import "./CSS/AdminDashboard.css";

function AdminDashboard() {
  // ===== MOCK DATA (replace with backend later) =====
  const stats = {
    users: 120,
    staff: 18,
    properties: 689,
    complaintsTotal: 42,
    complaintsPending: 9,
    complaintsResolved: 33,
    touristPlaces: 18,
    amenities: 47,
    serviceProviders: 63,
  };

  return (
    <div className="admin-dashboard">

      {/* ========= PAGE HEADER ========= */}
      <h2 className="admin-title">Admin Dashboard</h2>
      <p className="admin-subtitle">
        Overview of city operations, users & performance statistics
      </p>


      {/* ========= SECTION 1 — USERS & STAFF ========= */}
      <h3 className="section-title">Users & Staff</h3>

      <div className="dashboard-grid">
        <GlassCard>
          <div className="card-header blue">
            <FaUsers />
          </div>
          <h4>Total Users</h4>
          <p className="count">{stats.users}</p>
        </GlassCard>

        <GlassCard>
          <div className="card-header purple">
            <FaUserTie />
          </div>
          <h4>Total Staff</h4>
          <p className="count">{stats.staff}</p>
        </GlassCard>
      </div>


      {/* ========= SECTION 2 — CITY DATA ========= */}
      <h3 className="section-title">City Resources & Records</h3>

      <div className="dashboard-grid">

        <GlassCard>
          <div className="card-header teal">
            <FaHome />
          </div>
          <h4>Total Properties</h4>
          <p className="count">{stats.properties}</p>
        </GlassCard>

        <GlassCard>
          <div className="card-header orange">
            <FaMapMarkedAlt />
          </div>
          <h4>Tourist Places</h4>
          <p className="count">{stats.touristPlaces}</p>
        </GlassCard>

        <GlassCard>
          <div className="card-header green">
            <FaCity />
          </div>
          <h4>Total Amenities</h4>
          <p className="count">{stats.amenities}</p>
        </GlassCard>

        <GlassCard>
          <div className="card-header pink">
            <FaStore />
          </div>
          <h4>Service Providers / Businesses</h4>
          <p className="count">{stats.serviceProviders}</p>
        </GlassCard>

      </div>


      {/* ========= SECTION 3 — COMPLAINT STATUS ========= */}
      <h3 className="section-title">Complaint Summary</h3>

      <div className="dashboard-grid">

        <GlassCard>
          <div className="card-header red">
            <FaExclamationTriangle />
          </div>
          <h4>Pending Complaints</h4>
          <p className="count">{stats.complaintsPending}</p>
        </GlassCard>

        <GlassCard>
          <div className="card-header green">
            <FaCheckCircle />
          </div>
          <h4>Resolved Complaints</h4>
          <p className="count">{stats.complaintsResolved}</p>
        </GlassCard>

        <GlassCard>
          <div className="card-header navy">
            <FaExclamationTriangle />
          </div>
          <h4>Total Complaints</h4>
          <p className="count">{stats.complaintsTotal}</p>
        </GlassCard>

      </div>

    </div>
  );
}

export default AdminDashboard;
