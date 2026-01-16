import React, { useState } from "react";
import GlassCard from "../../../components/GlassCard";
import Popup from "../../../components/Popup";
import { useHistory } from "react-router-dom"; // ✅ v5
import "./CSS/StaffProfile.css";

function StaffProfile() {
  const history = useHistory(); // ✅ v5

  const [staff, setStaff] = useState({
    name: "Staff Name",
    department: "Utilities",
    email: "staff@example.com",
    password: "********",
  });

  const [editMode, setEditMode] = useState(false);
  const [tempStaff, setTempStaff] = useState({ ...staff });

  const [popup, setPopup] = useState({
    show: false,
    title: "",
    message: "",
    type: "",
    onConfirm: null,
  });

  const handleChange = (e) => {
    setTempStaff({ ...tempStaff, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setStaff({ ...tempStaff });
    setEditMode(false);

    setPopup({
      show: true,
      title: "Success",
      message: "Profile updated successfully!",
      type: "success",
    });
  };

  const handleCancel = () => {
    setTempStaff({ ...staff });
    setEditMode(false);
  };

  const handleLogout = () => {
    setPopup({
      show: true,
      title: "Logout Confirmation",
      message: "Are you sure you want to logout?",
      type: "confirm",
      onConfirm: () => {
        history.push("/auth"); // ✅ redirect (v5)
      },
    });
  };

  return (
    <div className="sp-root">
      <GlassCard>
        {/* Header */}
        <div className="sp-header">
          <h2 className="sp-title">Staff Profile</h2>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* Profile Form */}
        <form className="profile-form" onSubmit={handleSave}>
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={editMode ? tempStaff.name : staff.name}
              onChange={handleChange}
              readOnly={!editMode}
              required
            />
          </div>

          <div className="input-group">
            <label>Department</label>
            <input type="text" value={staff.department} readOnly />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input type="email" value={staff.email} readOnly />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={editMode ? tempStaff.password : staff.password}
              onChange={handleChange}
              readOnly={!editMode}
              required
            />
          </div>

          {editMode && (
            <div className="sp-action-buttons">
              <button type="submit" className="save-btn">
                Save
              </button>
              <button type="button" className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          )}
        </form>

        {!editMode && (
          <div className="sp-edit-container">
            <button className="edit-btn" onClick={() => setEditMode(true)}>
              Edit Profile
            </button>
          </div>
        )}
      </GlassCard>

      {/* Popup */}
      <Popup
        show={popup.show}
        title={popup.title}
        message={popup.message}
        type={popup.type}
        onConfirm={popup.onConfirm}
        onClose={() => setPopup({ ...popup, show: false })}
      />
    </div>
  );
}

export default StaffProfile;
