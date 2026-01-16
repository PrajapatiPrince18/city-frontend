import { FaEnvelope, FaLock } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import Popup from "../../components/Popup"; // adjust path if needed

function AdminLogin({ onForgot }) {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [popup, setPopup] = useState({
    show: false,
    title: "",
    message: "",
    type: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔹 TEMP frontend-only validation
    if (email === "admin@gmail.com" && password === "admin123") {
      setPopup({
        show: true,
        title: "Login Successful",
        message: "Welcome Admin! Redirecting to dashboard.",
        type: "success",
      });
    } else {
      setPopup({
        show: true,
        title: "Login Failed",
        message: "Invalid email or password",
        type: "error",
      });
    }
  };

  return (
    <>
      <form className="auth-form" onSubmit={handleSubmit}>
        {/* EMAIL INPUT WITH ICON */}
        <div className="input-group">
          <FaEnvelope className="input-icon" />
          <input
            type="email"
            placeholder="Admin Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* PASSWORD INPUT WITH ICON */}
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

        {/* SUBMIT BUTTON */}
        <button type="submit">Login</button>

        {/* LINKS BELOW BUTTON */}
        <div className="auth-links">
          <button
            type="button"
            className="link-btn"
            onClick={onForgot}
          >
            Forgot Password?
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

          // redirect ONLY on success
          if (popup.type === "success") {
            history.push("/admin/dashboard");
          }
        }}
      />
    </>
  );
}

export default AdminLogin;
