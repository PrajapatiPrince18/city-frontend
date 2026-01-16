import { useState, useCallback } from "react";
import AdminLogin from "./AdminLogin";
import UserLogin from "./UserLogin";
import UserRegister from "./UserRegister";
import StaffLogin from "./StaffLogin";
import StaffRegister from "./StaffRegister";
import ForgotPassword from "./ForgotPassword";
import "./CSS/AuthContainer.css";

function AuthContainer() {
  const [role, setRole] = useState("User");        // Current role tab
  const [authType, setAuthType] = useState("Login"); // Login/Register/Forgot

  // Handle Forgot Password
  const handleForgot = useCallback(() => setAuthType("Forgot"), []);

  // Go back to login
  const handleBack = useCallback(() => setAuthType("Login"), []);

  // Switch between User Login/Register
  const handleSwitchAuth = useCallback(() => {
    setAuthType((prev) => (prev === "Login" ? "Register" : "Login"));
  }, []);

  // Render the appropriate form based on role and authType
  const renderForm = useCallback(() => {
    if (authType === "Forgot") return <ForgotPassword onBack={handleBack} />;

    if (role === "Admin") return <AdminLogin onForgot={handleForgot} />;

    if (role === "Staff") {
      return authType === "Login" ? (
        <StaffLogin
          onForgot={handleForgot}
          onRegister={() => setAuthType("Register")}
        />
      ) : (
        <StaffRegister onBack={handleBack} />
      );
    }

    if (role === "User") {
      return authType === "Login" ? (
        <UserLogin onForgot={handleForgot} onSwitch={handleSwitchAuth} />
      ) : (
        <UserRegister onSwitch={handleSwitchAuth} />
      );
    }

    return null;
  }, [authType, role, handleBack, handleForgot, handleSwitchAuth]);

  // Dynamically set page title
  const getPageTitle = () => {
    if (authType === "Forgot") return "Forgot Password";
    if (role === "Admin") return "Admin Login";
    if (role === "Staff") return authType === "Login" ? "Staff Login" : "Staff Registration";
    return authType === "Login" ? "User Login" : "User Registration";
  };

  return (
    <div className="auth-container">
      <div className="glass-card">

        {/* Role Tabs */}
        <div className="role-tabs">
          {["User", "Admin", "Staff"].map((r) => (
            <button
              key={r}
              className={`role-tab ${role === r ? "active" : ""}`}
              onClick={() => {
                setRole(r);
                setAuthType("Login"); // reset to login when switching tabs
              }}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Page Title */}
        <h2 className="page-title">{getPageTitle()}</h2>

        {/* Render the correct form */}
        <div className="form-section">{renderForm()}</div>
      </div>
    </div>
  );
}

export default AuthContainer;
