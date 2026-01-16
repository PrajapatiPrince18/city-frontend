import React from "react";
import { useHistory } from "react-router-dom";
import { FaWater, FaRoad, FaBolt, FaClipboardList } from "react-icons/fa";
import GlassCard from "../../../components/GlassCard";
import "./CSS/UtilitiesDashboard.css";

function UtilitiesDashboard() {
  const history = useHistory();

  const stats = [
    { label: "Total Complaints", value: 120, icon: <FaClipboardList />, color: "#4a90e2" },
    { label: "Pending", value: 35, icon: <FaClipboardList />, color: "#f5a623" },
    { label: "In Progress", value: 50, icon: <FaClipboardList />, color: "#50e3c2" },
    { label: "Resolved", value: 35, icon: <FaClipboardList />, color: "#7ed321" },
  ];

  const recent = [
    { id: 1, type: "Water", issue: "No Water Supply", area: "Sector 12", status: "Pending" },
    { id: 2, type: "Road", issue: "Potholes", area: "City Center", status: "In Progress" },
    { id: 3, type: "Electricity", issue: "Power Cut", area: "Lake View", status: "Resolved" }
  ];

  const quickLinks = [
    { title: "Water Complaints", desc: "View all water supply complaints.", icon: <FaWater />, path: "/staff/utilities/water-complaints" },
    { title: "Road Complaints", desc: "View road maintenance complaints.", icon: <FaRoad />, path: "/staff/utilities/road-complaints" },
    { title: "Electricity Complaints", desc: "Track electricity complaints.", icon: <FaBolt />, path: "/staff/utilities/electricity-complaints" },
  ];

  return (
    <div className="ud-root">
      <div className="ud-container">
        {/* Header */}
        <div className="ud-header">
          <h1>Utilities Dashboard</h1>
          <p>Monitor and manage Water, Road, and Electricity complaints efficiently.</p>
        </div>

        {/* Stats Cards */}
        <div className="ud-grid">
          {stats.map((s, i) => (
            <GlassCard key={i} className="ud-card ud-stat-card" style={{ borderTop: `5px solid ${s.color}` }}>
              <div className="ud-card-icon" style={{ color: s.color }}>{s.icon}</div>
              <h3>{s.label}</h3>
              <p className="ud-stat-value">{s.value}</p>
            </GlassCard>
          ))}
        </div>

        {/* Quick Links */}
        <div className="ud-section-title">Quick Actions</div>
        <div className="ud-grid">
          {quickLinks.map((q, i) => (
            <GlassCard key={i} className="ud-card ud-quick-card" onClick={() => history.push(q.path)}>
              <div className="ud-card-icon" style={{ color: "#1e3c72" }}>{q.icon}</div>
              <h3>{q.title}</h3>
              <p>{q.desc}</p>
            </GlassCard>
          ))}
        </div>

        {/* Recent Complaints Table */}
        <div className="ud-section-title">Recent Complaints</div>
        <GlassCard className="ud-card">
          <table className="ud-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Type</th>
                <th>Issue</th>
                <th>Area</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.type}</td>
                  <td>{r.issue}</td>
                  <td>{r.area}</td>
                  <td>
                    <span className={`ud-status ${r.status === "Resolved" ? "ud-ok" : r.status === "In Progress" ? "ud-warn" : "ud-bad"}`}>
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>
      </div>
    </div>
  );
}

export default UtilitiesDashboard;
