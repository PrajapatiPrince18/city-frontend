import React, { useState } from "react";
import GlassCard from "../../../components/GlassCard";
import "./CSS/Complaints.css";

function Water() {
  // ===== Initial complaints (mock data) =====
  const initialComplaints = [
    { id: 1, user: "Rahul", issue: "No water supply", area: "Sector 12", status: "Pending" },
    { id: 2, user: "Priya", issue: "Low pressure", area: "Lake View", status: "Resolved" },
    { id: 3, user: "Amit", issue: "Pipe leakage", area: "Sector 8", status: "In Progress" }
  ];

  const [complaints, setComplaints] = useState(initialComplaints);

  // ===== Function to update status =====
  const updateStatus = (id, newStatus) => {
    const updated = complaints.map(c => 
      c.id === id ? { ...c, status: newStatus } : c
    );
    setComplaints(updated);
  };

  // ===== Status badge class =====
  const statusClass = (status) => {
    switch (status) {
      case "Pending": return "wc-warn";
      case "In Progress": return "wc-info";
      case "Resolved": return "wc-ok";
      default: return "";
    }
  };

  return (
    <div className="wc-root">
      <h2>Water Complaints</h2>
      <p>Manage and track all water-related complaints in the city.</p>

      {/* Stats Cards */}
      <div className="wc-stats-grid">
        <GlassCard>
          <h3>Total Complaints</h3>
          <p>{complaints.length}</p>
        </GlassCard>
        <GlassCard>
          <h3>Pending</h3>
          <p>{complaints.filter(c => c.status === "Pending").length}</p>
        </GlassCard>
        <GlassCard>
          <h3>Resolved</h3>
          <p>{complaints.filter(c => c.status === "Resolved").length}</p>
        </GlassCard>
      </div>

      {/* Complaints Table */}
      <GlassCard>
        <h3>Complaint List</h3>
        <table className="wc-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Issue</th>
              <th>Area</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map(c => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.user}</td>
                <td>{c.issue}</td>
                <td>{c.area}</td>
                <td>
                  <span className={`wc-status ${statusClass(c.status)}`}>
                    {c.status}
                  </span>
                </td>
                <td className="wc-actions">
                  {c.status === "Pending" && (
                    <button onClick={() => updateStatus(c.id, "In Progress")}>
                      Start Progress
                    </button>
                  )}
                  {c.status === "In Progress" && (
                    <button onClick={() => updateStatus(c.id, "Resolved")}>
                      Mark Resolved
                    </button>
                  )}
                  <button style={{ marginLeft: "6px" }}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>
    </div>
  );
}

export default Water;
