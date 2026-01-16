import { FaEnvelope, FaLock } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import Popup from "../../components/Popup"; // adjust path if needed

function UserLogin({ onForgot, onSwitch }) {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [popup, setPopup] = useState({
    show: false,
    title: "",
    message: "",
    type: "",
  });

  // ===== DEMO USER ACCOUNT =====
  const demoUser = {
    email: "user@example.com",
    password: "123456",
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setPopup({
        show: true,
        title: "Missing Fields",
        message: "Please enter both email and password.",
        type: "error",
      });
      return;
    }

    if (email === demoUser.email && password === demoUser.password) {
      setPopup({
        show: true,
        title: "Login Successful",
        message: "You have successfully logged in!",
        type: "success",
      });
    } else {
      setPopup({
        show: true,
        title: "Login Failed",
        message: "Incorrect email or password. Please try again.",
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
            placeholder="Email"
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

        {/* LINKS */}
        <div className="auth-links">
          <button type="button" className="link-btn" onClick={onForgot}>
            Forgot Password?
          </button>
          <button type="button" className="link-btn" onClick={onSwitch}>
            New User? Register
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

          // Navigate only if login successful
          if (popup.type === "success") {
            history.push("/user/home");
          }
        }}
      />
    </>
  );
}

export default UserLogin;
