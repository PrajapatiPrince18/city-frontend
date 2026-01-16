import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import GlassCard from "../../components/GlassCard";
import Popup from "../../components/Popup";
import "./CSS/UserProfile.css";

function UserProfile({ onLogout }) {
  const history = useHistory();
  const redirectTimerRef = useRef(null);

  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    contact: "9876543210",
    photo: null,
  });

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [tempData, setTempData] = useState(user);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const fileInputRef = useRef(null);

  // 🔔 POPUP STATE
  const [popup, setPopup] = useState({
    show: false,
    title: "",
    message: "",
    type: "info",
    onConfirm: null,
  });

  // ================= CLEANUP REDIRECT TIMER =================
  useEffect(() => {
    return () => clearTimeout(redirectTimerRef.current);
  }, []);

  // ================= EDIT MODE =================
  const handleEdit = () => {
    setTempData(user);
    setPassword("");
    setConfirm("");
    setErr("");
    setMsg("");
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
    setErr("");
    setMsg("");
  };

  // ================= SAVE =================
  const handleSave = (e) => {
    e.preventDefault();

    if (!tempData.name.trim()) {
      setErr("Name cannot be empty");
      return;
    }
    if (!tempData.email.trim()) {
      setErr("Email cannot be empty");
      return;
    }
    if (password && password.length < 6) {
      setErr("Password must be at least 6 characters");
      return;
    }
    if (password !== confirm) {
      setErr("Passwords do not match");
      return;
    }

    setUser({ ...tempData });
    setEditMode(false);
    setErr("");
    setMsg("");

    // 🎉 SUCCESS POPUP WITH AUTO + MANUAL REDIRECT
    setPopup({
      show: true,
      title: "Profile Updated",
      message: "Your profile has been updated successfully 🎉",
      type: "success",
      onConfirm: () => {
        clearTimeout(redirectTimerRef.current);
        setPopup(prev => ({ ...prev, show: false }));
        history.push("/user/profile");
      },
    });

    redirectTimerRef.current = setTimeout(() => {
      setPopup(prev => ({ ...prev, show: false }));
      history.push("/user/profile");
    }, 3000);
  };

  // ================= LOGOUT =================
  const handleLogout = () => {
    // Step 1: Show confirmation popup
    setPopup({
      show: true,
      title: "Confirm Logout",
      message: "Are you sure you want to logout?",
      type: "confirm",
      onConfirm: () => {
        // Step 2: Close confirm popup
        setPopup(prev => ({ ...prev, show: false }));

        // Step 3: Perform logout logic
        if (onLogout) onLogout();

        // Step 4: Show success popup for logout
        setTimeout(() => {
          setPopup({
            show: true,
            title: "Logged Out",
            message: "You have been logged out successfully 🎉",
            type: "success",
            onConfirm: () => {
              clearTimeout(redirectTimerRef.current);
              setPopup(prev => ({ ...prev, show: false }));
              history.push("/auth"); // ✅ redirect to auth page
            },
          });

          // Auto redirect after 3 seconds if user doesn't click OK
          redirectTimerRef.current = setTimeout(() => {
            setPopup(prev => ({ ...prev, show: false }));
            history.push("/auth");
          }, 1000);
        }, 200);
      },
    });
  };

  // ================= PHOTO UPLOAD =================
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setTempData({ ...tempData, photo: reader.result });
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    setTempData({ ...tempData, photo: null });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="up-root">
      <GlassCard>
        {/* 🔔 POPUP */}
        <Popup
          show={popup.show}
          title={popup.title}
          message={popup.message}
          type={popup.type}
          onConfirm={popup.onConfirm}
          onClose={() => setPopup(prev => ({ ...prev, show: false }))}
        />

        {/* HEADER */}
        <div className="up-header">
          <h2 className="up-title">User Profile</h2>
          <button className="up-logout" onClick={handleLogout}>Logout</button>
        </div>

        {/* STATUS */}
        {msg && <div className="up-success">{msg}</div>}
        {err && <div className="up-error">{err}</div>}

        {/* PHOTO */}
        <div className="up-photo-section">
          <div className="up-photo-frame">
            {editMode ? (
              tempData.photo ? <img src={tempData.photo} alt="profile" /> :
              <span className="up-placeholder">Add Photo</span>
            ) : user.photo ? <img src={user.photo} alt="profile" /> :
              <span className="up-placeholder">{user.name[0]}</span>
            }
          </div>

          {editMode && (
            <div className="up-photo-actions">
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handlePhotoChange}
              />
              <button onClick={() => fileInputRef.current.click()}>Upload</button>
              {tempData.photo && <button className="danger" onClick={removePhoto}>Remove</button>}
            </div>
          )}
        </div>

        {/* VIEW / EDIT */}
        {!editMode ? (
          <div className="up-view">
            <div className="up-row"><label>Full Name</label><p>{user.name}</p></div>
            <div className="up-row"><label>Email</label><p>{user.email}</p></div>
            <div className="up-row"><label>Contact</label><p>{user.contact}</p></div>
            <div className="up-row"><label>Password</label><p>********</p></div>
            <button className="up-edit" onClick={handleEdit}>Edit Profile</button>
          </div>
        ) : (
          <form className="up-form" onSubmit={handleSave}>
            <label>Full Name</label>
            <input
              type="text"
              value={tempData.name}
              onChange={(e) => setTempData({ ...tempData, name: e.target.value })}
            />

            <label>Email</label>
            <input
              type="email"
              value={tempData.email}
              onChange={(e) => setTempData({ ...tempData, email: e.target.value })}
            />

            <label>Contact (Not Editable)</label>
            <input type="text" value={user.contact} disabled />

            <label>New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label>Confirm Password</label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />

            <div className="up-actions">
              <button type="button" className="up-cancel" onClick={handleCancel}>Cancel</button>
              <button type="submit" className="up-save">Save</button>
            </div>
          </form>
        )}
      </GlassCard>
    </div>
  );
}

export default UserProfile;
