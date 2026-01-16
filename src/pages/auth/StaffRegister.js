import { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa";
import Popup from "../../components/Popup"; // adjust path if needed

function StaffRegister({ onBack }) {
  const [staff, setStaff] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    department: "",
  });

  const [popup, setPopup] = useState({
    show: false,
    title: "",
    message: "",
    type: "",
  });

  const handleChange = (e) =>
    setStaff({ ...staff, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple frontend validation (optional but clean)
    if (
      !staff.name ||
      !staff.email ||
      !staff.contact ||
      !staff.password ||
      !staff.department
    ) {
      setPopup({
        show: true,
        title: "Missing Fields",
        message: "Please fill all the required fields.",
        type: "error",
      });
      return;
    }

    setPopup({
      show: true,
      title: "Registration Successful",
      message: "Staff registered successfully. You can now login.",
      type: "success",
    });
  };

  return (
    <>
      <form className="auth-form" onSubmit={handleSubmit}>
        {/* Name */}
        <div className="input-group">
          <FaUser className="input-icon" />
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={staff.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Department */}
        <div className="input-group">
          <select
            className="auth-select"
            name="department"
            value={staff.department}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            <option value="utilities">Public Utilities Dept (Complaints)</option>
            <option value="properties">Properties & Billing Dept</option>
            <option value="tourism">Tourism & Community Services Dept</option>
          </select>
        </div>

        {/* Email */}
        <div className="input-group">
          <FaEnvelope className="input-icon" />
          <input
            type="email"
            name="email"
            placeholder="Official Staff Email"
            value={staff.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Contact */}
        <div className="input-group">
          <FaPhone className="input-icon" />
          <input
            type="tel"
            name="contact"
            placeholder="Contact Number"
            value={staff.contact}
            onChange={handleChange}
            pattern="[0-9]{10}"
            title="Enter 10 digit mobile number"
            required
          />
        </div>

        {/* Password */}
        <div className="input-group">
          <FaLock className="input-icon" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={staff.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit */}
        <button type="submit">Register</button>

        {/* Back */}
        <div className="auth-links">
          <button type="button" className="link-btn" onClick={onBack}>
            Already Registered? Login
          </button>
        </div>
      </form>

      {/* POPUP */}
      <Popup
        show={popup.show}
        title={popup.title}
        message={popup.message}
        type={popup.type}
        onClose={() => {
          setPopup({ ...popup, show: false });
          if (popup.type === "success") {
            onBack(); // go back to login after success
          }
        }}
      />
    </>
  );
}

export default StaffRegister;
