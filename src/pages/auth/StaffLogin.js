import { useState } from "react";
import { useHistory } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import Popup from "../../components/Popup"; // adjust path if needed

function StaffLogin({ onForgot, onRegister }) {
  const history = useHistory();

  const [staff, setStaff] = useState({
    email: "",
    password: "",
    department: "",
  });

  const [popup, setPopup] = useState({
    show: false,
    title: "",
    message: "",
    type: "",
    redirect: null,
  });

  const handleChange = (e) => {
    setStaff({ ...staff, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!staff.email || !staff.password || !staff.department) {
      setPopup({
        show: true,
        title: "Missing Fields",
        message: "Please fill all fields!",
        type: "error",
        redirect: null,
      });
      return;
    }

    let redirectPath = "/staff/dashboard";

    switch (staff.department) {
      case "utilities":
        redirectPath = "/staff/utilities/dashboard";
        break;
      case "properties":
        redirectPath = "/staff/properties/dashboard";
        break;
      case "tourism":
        redirectPath = "/staff/tourism/dashboard";
        break;
      default:
        break;
    }

    setPopup({
      show: true,
      title: "Login Successful",
      message: `Welcome to ${staff.department.toUpperCase()} Department`,
      type: "success",
      redirect: redirectPath,
    });
  };

  return (
    <>
      <form className="auth-form" onSubmit={handleSubmit}>
        {/* Department selection */}
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

        {/* Submit button */}
        <button type="submit">Login</button>

        {/* Links */}
        <div className="auth-links">
          <button type="button" className="link-btn" onClick={onForgot}>
            Forgot Password?
          </button>
          <button type="button" className="link-btn" onClick={onRegister}>
            New Staff? Register
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
          if (popup.redirect) {
            history.push(popup.redirect);
          }
        }}
      />
    </>
  );
}

export default StaffLogin;
