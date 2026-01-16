import React, { useState } from "react";
import { FaUsers, FaTrash, FaSort } from "react-icons/fa";
import GlassCard from "../../components/GlassCard";
import Popup from "../../components/Popup"; // make sure path is correct
import "./CSS/manageUsers.css";

function ManageUsers() {
  // Dummy user data
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", contact: "9876543210" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", contact: "9123456780" },
    { id: 3, name: "Alice Brown", email: "alice@example.com", contact: "9988776655" },
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

  const totalUsers = users.length;

  // Delete user with popup
  const handleDelete = (user) => {
    setPopup({
      show: true,
      title: "Delete User",
      message: `Are you sure you want to delete ${user.name}?`,
      type: "confirm",
      onConfirm: () => {
        // Close confirmation popup first
        setPopup({ show: false });

        // Remove user and show success popup
        setTimeout(() => {
          setUsers(prev => prev.filter(u => u.id !== user.id));
          setPopup({
            show: true,
            title: "Deleted",
            message: `${user.name} has been deleted successfully.`,
            type: "info",
          });
        }, 100); // slight delay to let React render
      },
    });
  };

  // Filter users by search
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.contact.includes(search)
  );

  // Sort users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortBy) return 0;
    return a[sortBy].toString().localeCompare(b[sortBy].toString());
  });

  return (
    <div className="admin-dashboard">
      <h2 className="admin-title">Manage Users</h2>
      <p className="admin-subtitle">View and manage all registered users</p>

      {/* Stats */}
      <h3 className="section-title">Overview</h3>
      <div className="dashboard-grid">
        <GlassCard>
          <div className="card-header blue">
            <FaUsers />
          </div>
          <h4>Total Users</h4>
          <p className="count">{totalUsers}</p>
        </GlassCard>
      </div>

      {/* Users Table */}
      <h3 className="section-title">User List</h3>
      <GlassCard style={{ gridColumn: "1 / -1" }}>
        <div className="table-actions">
          <input
            type="text"
            placeholder="Search by Name, Email or Contact"
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.contact}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(user)}>
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}
            {sortedUsers.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "12px" }}>
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </GlassCard>

      {/* Popup */}
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

export default ManageUsers;
