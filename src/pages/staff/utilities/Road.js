import React, { useState } from "react";
import GlassCard from "../../../components/GlassCard";
import "./CSS/Complaints.css";

function Road() {
  const initialComplaints = [
    { id: 1, area: "Main Road", issue: "Potholes", status: "In Progress" },
    { id: 2, area: "Lake View", issue: "Cracks", status: "Pending" },
    { id: 3, area: "Sector 8", issue: "Street lights broken", status: "Resolved" }
  ];

  const [complaints, setComplaints] = useState(initialComplaints);

  // Update status dynamically
  const updateStatus = (id, newStatus) => {
    const updated = complaints.map(c => 
      c.id === id ? { ...c, status: newStatus } : c
    );
    setComplaints(updated);
  };

  // Status badge class
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
      <h2>Road Complaints</h2>
      <p>Track all road-related complaints like potholes, cracks, and street issues.</p>

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
              <th>Area</th>
              <th>Issue</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map(c => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.area}</td>
                <td>{c.issue}</td>
                <td><span className={`wc-status ${statusClass(c.status)}`}>{c.status}</span></td>
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

export default Road;
