import { FaEnvelope, FaKey, FaLock } from "react-icons/fa";
import { useState, useEffect } from "react";
import Popup from "../../components/Popup";

function ForgotPassword({ onBack }) {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [timeLeft, setTimeLeft] = useState(0);
  const [resendTime, setResendTime] = useState(0);

  const [popup, setPopup] = useState({
    show: false,
    title: "",
    message: "",
    type: "",
  });

  /* ================= TIMERS ================= */

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (resendTime <= 0) return;
    const timer = setInterval(() => setResendTime((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [resendTime]);

  /* ================= OTP ================= */

  const generateOtp = () => {
    const otpValue = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otpValue);
    setTimeLeft(300);    // 5 min
    setResendTime(30);  // 30 sec
    console.log("OTP (demo):", otpValue);
  };

  /* ================= HANDLERS ================= */

  const handleSendOtp = (e) => {
    e.preventDefault();
    generateOtp();
    setPopup({
      show: true,
      title: "OTP Sent",
      message: "OTP sent to your email. Valid for 5 minutes.",
      type: "success",
    });
    setStep(2);
  };

  const handleResendOtp = () => {
    generateOtp();
    setPopup({
      show: true,
      title: "OTP Resent",
      message: "New OTP has been sent.",
      type: "info",
    });
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();

    if (otp !== generatedOtp) {
      setPopup({
        show: true,
        title: "Invalid OTP",
        message: "Entered OTP is incorrect.",
        type: "error",
      });
      return;
    }

    setPopup({
      show: true,
      title: "OTP Verified",
      message: "OTP verified successfully.",
      type: "success",
    });
    setStep(3);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setPopup({
        show: true,
        title: "Password Mismatch",
        message: "Passwords do not match.",
        type: "error",
      });
      return;
    }

    setPopup({
      show: true,
      title: "Password Changed",
      message: "Password changed successfully.",
      type: "success",
    });
  };

  /* ================= UI ================= */

  return (
    <>
      {/* STEP 1 */}
      {step === 1 && (
        <form className="auth-form" onSubmit={handleSendOtp}>
          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button type="submit">Send OTP</button>

          <div className="auth-links">
            <button type="button" className="link-btn" onClick={onBack}>
              Back to Login
            </button>
          </div>
        </form>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <form className="auth-form" onSubmit={handleVerifyOtp}>
          <div className="input-group">
            <FaKey className="input-icon" />
            <input
              type="text"
              placeholder="Enter OTP"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>

          <p style={{ fontSize: "14px" }}>
            OTP expires in:{" "}
            <strong>
              {Math.floor(timeLeft / 60)}:
              {("0" + (timeLeft % 60)).slice(-2)}
            </strong>
          </p>

          {/* VERIFY BUTTON DISABLED */}
          <button
            type="submit"
            disabled={timeLeft === 0}
            style={{
              opacity: timeLeft === 0 ? 0.5 : 1,
              cursor: timeLeft === 0 ? "not-allowed" : "pointer",
            }}
          >
            {timeLeft === 0 ? "OTP Expired" : "Verify OTP"}
          </button>

          <button
            type="button"
            className="link-btn"
            onClick={handleResendOtp}
            disabled={resendTime > 0}
            style={{
              marginTop: "10px",
              opacity: resendTime > 0 ? 0.5 : 1,
            }}
          >
            Resend OTP {resendTime > 0 && `(${resendTime}s)`}
          </button>
        </form>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <form className="auth-form" onSubmit={handleResetPassword}>
          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="New Password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

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

          <button type="submit">Change Password</button>
        </form>
      )}

      {/* POPUP */}
      <Popup
        show={popup.show}
        title={popup.title}
        message={popup.message}
        type={popup.type}
        onClose={() => {
          setPopup({ ...popup, show: false });
          if (popup.type === "success" && step === 3) onBack();
        }}
      />
    </>
  );
}

export default ForgotPassword;
