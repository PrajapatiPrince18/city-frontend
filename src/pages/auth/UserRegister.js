import { FaUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa";
import { useState } from "react";
import Popup from "../../components/Popup"; // adjust path if needed

function UserRegister({ onSwitch }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [popup, setPopup] = useState({
    show: false,
    title: "",
    message: "",
    type: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Password match validation
    if (password !== confirmPassword) {
      setPopup({
        show: true,
        title: "Password Mismatch",
        message: "Passwords do not match. Please try again.",
        type: "error",
      });
      return;
    }

    setPopup({
      show: true,
      title: "Registration Successful",
      message: "You have successfully registered. Please login.",
      type: "success",
    });
  };

  return (
    <>
      <form className="auth-form" onSubmit={handleSubmit}>
        {/* FULL NAME */}
        <div className="input-group">
          <FaUser className="input-icon" />
          <input
            type="text"
            placeholder="Full Name"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        {/* EMAIL */}
        <div className="input-group">
          <FaEnvelope className="input-icon" />
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* CONTACT NUMBER */}
        <div className="input-group">
          <FaPhone className="input-icon" />
          <input
            type="tel"
            placeholder="Contact Number"
            pattern="[0-9]{10}"
            title="Enter 10-digit mobile number"
            required
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </div>

        {/* PASSWORD */}
        <div className="input-group">
          <FaLock className="input-icon" />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="input-group">
          <FaLock className="input-icon" />
          <input
            type="password"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {/* SUBMIT BUTTON */}
        <button type="submit">Register</button>

        {/* LEFT-ALIGNED LINK */}
        <div className="auth-links">
          <button type="button" className="link-btn" onClick={onSwitch}>
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
            onSwitch(); // go back to login after success
          }
        }}
      />
    </>
  );
}

export default UserRegister;
