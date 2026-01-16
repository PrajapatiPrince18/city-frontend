import React, { useState } from "react";
import GlassCard from "../../components/GlassCard";
import Popup from "../../components/Popup";
import "./CSS/Complaints.css";

function Complaints() {
  const staffDepartments = ["Sanitation", "Electricity", "Water", "Roads", "Security"];

  // Sample complaints
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      issue: "Streetlight not working",
      address: "Main Road, Mehsana",
      department: "Electricity",
      status: "Pending",
      date: "2025-12-25",
    },
    {
      id: 2,
      issue: "Garbage collection issue",
      address: "Sector 5, Mehsana",
      department: "Sanitation",
      status: "Resolved",
      date: "2025-12-20",
    },
    {
      id: 3,
      issue: "Water leakage",
      address: "Sector 3, Mehsana",
      department: "Water",
      status: "In Progress",
      date: "2025-12-28",
    },
  ]);

  const [formData, setFormData] = useState({
    issue: "",
    address: "",
    department: staffDepartments[0],
  });

  // 🔔 Popup State
  const [popup, setPopup] = useState({
    show: false,
    title: "",
    message: "",
    type: "alert",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ❌ alert replaced with popup
    if (!formData.issue || !formData.address) {
      setPopup({
        show: true,
        title: "Validation Error",
        message: "Please fill all fields!",
        type: "error",
      });
      return;
    }

    const newComplaint = {
      id: complaints.length + 1,
      ...formData,
      status: "Pending",
      date: new Date().toISOString().split("T")[0],
    };

    setComplaints([newComplaint, ...complaints]);
    setFormData({ issue: "", address: "", department: staffDepartments[0] });

    // ✅ Success popup
    setPopup({
      show: true,
      title: "Success",
      message: "Complaint submitted successfully!",
      type: "success",
    });
  };

  return (
    <div className="complaints-root">
      {/* 🔔 Custom Popup */}
      <Popup
        show={popup.show}
        title={popup.title}
        message={popup.message}
        type={popup.type}
        onClose={() => setPopup({ ...popup, show: false })}
      />

      {/* Register Complaint */}
      <GlassCard className="complaints-card">
        <h2>Register a Complaint</h2>
        <form className="complaints-form" onSubmit={handleSubmit}>
          <label>
            Issue:
            <input
              type="text"
              name="issue"
              value={formData.issue}
              onChange={handleChange}
              placeholder="Describe your problem"
            />
          </label>

          <label>
            Address:
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Where the issue is located"
            />
          </label>

          <label>
            Department:
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
            >
              {staffDepartments.map((dept, idx) => (
                <option key={idx} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </label>

          <button type="submit" className="complaint-submit-btn">
            Submit Complaint
          </button>
        </form>
      </GlassCard>

      {/* Complaint Tracker */}
      <GlassCard className="complaints-card">
        <h2>Your Complaints</h2>
        {complaints.length === 0 ? (
          <p>No complaints submitted yet.</p>
        ) : (
          <table className="complaints-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Issue</th>
                <th>Address</th>
                <th>Department</th>
                <th>Status</th>
                <th>Date Submitted</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.issue}</td>
                  <td>{c.address}</td>
                  <td>{c.department}</td>
                  <td className={`status ${c.status.toLowerCase().replace(" ", "-")}`}>
                    {c.status}
                  </td>
                  <td>{c.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </GlassCard>
    </div>
  );
}

export default Complaints;
