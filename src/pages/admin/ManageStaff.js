import React, { useState } from "react";
import { FaUsers, FaBuilding, FaTrash, FaSort } from "react-icons/fa";
import GlassCard from "../../components/GlassCard";
import Popup from "../../components/Popup"; // adjust path if needed
import "./CSS/ManageStaff.css";

function ManageStaff() {
  const [staff, setStaff] = useState([
    { id: 1, name: "Rahul Kumar", email: "rahul@example.com", contact: "9876543210", department: "Public Utilities" },
    { id: 2, name: "Sneha Patel", email: "sneha@example.com", contact: "9123456780", department: "Properties" },
    { id: 3, name: "Amit Sharma", email: "amit@example.com", contact: "9988776655", department: "Tourist" },
    { id: 4, name: "Meera Joshi", email: "meera@example.com", contact: "9988123456", department: "Public Utilities" },
    { id: 5, name: "Kiran Desai", email: "kiran@example.com", contact: "9876501234", department: "Properties" },
  ]);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState(null);

  // Popup state
  const [popup, setPopup] = useState({
    show: false,
    title: "",
    message: "",
    type: "",
    onConfirm: null,
  });

  const totalStaff = staff.length;
  const totalDepartments = new Set(staff.map(s => s.department)).size;

  const deptCounts = {
    "Public Utilities": staff.filter(s => s.department === "Public Utilities").length,
    Properties: staff.filter(s => s.department === "Properties").length,
    Tourist: staff.filter(s => s.department === "Tourist").length,
  };

  // Delete staff with popup confirmation
  const handleDelete = (staffMember) => {
    setPopup({
      show: true,
      title: "Delete Staff",
      message: `Are you sure you want to delete ${staffMember.name}?`,
      type: "confirm",
      onConfirm: () => {
        // Close the confirm popup first
        setPopup({ show: false });

        // Wait a tiny moment to show success popup
        setTimeout(() => {
          setStaff(prev => prev.filter(s => s.id !== staffMember.id));
          setPopup({
            show: true,
            title: "Deleted",
            message: `${staffMember.name} has been deleted successfully.`,
            type: "info",
          });
        }, 100); // 100ms delay ensures previous popup closed
      },
    });
  };

  const filteredStaff = staff.filter(
    s =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.contact.includes(search) ||
      s.department.toLowerCase().includes(search.toLowerCase())
  );

  const sortedStaff = [...filteredStaff].sort((a, b) => {
    if (!sortBy) return 0;
    return a[sortBy].toString().localeCompare(b[sortBy].toString());
  });

  return (
    <div className="admin-dashboard">
      <h2 className="admin-title">Manage Staff</h2>
      <p className="admin-subtitle">View and manage all staff members by department</p>

      <h3 className="section-title">Overview</h3>
      <div className="dashboard-grid">
        <GlassCard>
          <div className="card-header purple"><FaUsers /></div>
          <h4>Total Staff</h4>
          <p className="count">{totalStaff}</p>
        </GlassCard>

        <GlassCard>
          <div className="card-header teal"><FaBuilding /></div>
          <h4>Total Departments</h4>
          <p className="count">{totalDepartments}</p>
        </GlassCard>

        <GlassCard>
          <div className="card-header blue"><FaUsers /></div>
          <h4>Public Utilities</h4>
          <p className="count">{deptCounts["Public Utilities"]}</p>
        </GlassCard>

        <GlassCard>
          <div className="card-header green"><FaUsers /></div>
          <h4>Properties</h4>
          <p className="count">{deptCounts["Properties"]}</p>
        </GlassCard>

        <GlassCard>
          <div className="card-header orange"><FaUsers /></div>
          <h4>Tourist</h4>
          <p className="count">{deptCounts["Tourist"]}</p>
        </GlassCard>
      </div>

      <h3 className="section-title">Staff List</h3>

      <GlassCard style={{ gridColumn: "1 / -1" }}>
        <div className="table-actions">
          <input
            type="text"
            placeholder="Search by Name, Email, Contact, or Department"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <table className="users-table">
          <thead>
            <tr>
              <th onClick={() => setSortBy("id")}>ID <FaSort className="sort-icon" /></th>
              <th onClick={() => setSortBy("name")}>Name <FaSort className="sort-icon" /></th>
              <th onClick={() => setSortBy("email")}>Email <FaSort className="sort-icon" /></th>
              <th onClick={() => setSortBy("contact")}>Contact <FaSort className="sort-icon" /></th>
              <th onClick={() => setSortBy("department")}>Department <FaSort className="sort-icon" /></th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedStaff.map(s => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{s.contact}</td>
                <td>{s.department}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(s)}>
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}
            {sortedStaff.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "12px" }}>
                  No staff found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </GlassCard>

      {/* POPUP */}
      <Popup
        show={popup.show}
        title={popup.title}
        message={popup.message}
        type={popup.type}
        onClose={() => setPopup({ ...popup, show: false })}
        onConfirm={popup.onConfirm}
      />
    </div>
  );
}

export default ManageStaff;
