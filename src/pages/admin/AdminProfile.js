import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import GlassCard from "../../components/GlassCard";
import Popup from "../../components/Popup";
import "./CSS/AdminProfile.css";

function AdminProfile() {
  const history = useHistory();

  const [admin, setAdmin] = useState({
    name: "Admin Name",
    email: "admin@example.com",
    phone: "1234567890",
  });

  const [editMode, setEditMode] = useState(false); // toggle edit mode
  const [tempAdmin, setTempAdmin] = useState({ ...admin });

  const [popup, setPopup] = useState({
    show: false,
    title: "",
    message: "",
    type: "",
    onConfirm: null,
  });

  // handle input change in edit mode
  const handleChange = (e) => {
    setTempAdmin({ ...tempAdmin, [e.target.name]: e.target.value });
  };

  // Save changes
  const handleSave = () => {
    setAdmin({ ...tempAdmin });
    setEditMode(false);

    setPopup({
      show: true,
      title: "Profile Updated",
      message: "Your profile has been updated successfully.",
      type: "success",
    });
  };

  // Cancel editing
  const handleCancel = () => {
    setTempAdmin({ ...admin }); // revert changes
    setEditMode(false);
  };

  // Logout with confirmation popup
  const handleLogout = () => {
    setPopup({
      show: true,
      title: "Logout",
      message: "Are you sure you want to logout?",
      type: "confirm",
      onConfirm: () => {
        // redirect to auth page
        history.push("/auth/login");
      },
    });
  };

  return (
    <div className="admin-profile">
      <h2 className="page-title">Admin Profile</h2>

      <GlassCard>
        <form className="profile-form" onSubmit={(e) => e.preventDefault()}>
          {/* Name */}
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={editMode ? tempAdmin.name : admin.name}
              onChange={handleChange}
              disabled={!editMode}
              required
            />
          </div>

          {/* Email */}
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={editMode ? tempAdmin.email : admin.email}
              onChange={handleChange}
              disabled={!editMode}
              required
            />
          </div>

          {/* Phone */}
          <div className="input-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={editMode ? tempAdmin.phone : admin.phone}
              onChange={handleChange}
              disabled={!editMode}
              required
            />
          </div>

          {/* Buttons */}
          <div className="profile-buttons">
            {editMode ? (
              <>
                <button type="button" className="save-btn" onClick={handleSave}>
                  Save
                </button>
                <button type="button" className="cancel-btn" onClick={handleCancel}>
                  Cancel
                </button>
              </>
            ) : (
              <button
                type="button"
                className="edit-btn"
                onClick={() => setEditMode(true)}
              >
                Edit
              </button>
            )}

            <button type="button" className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </form>
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

export default AdminProfile;
