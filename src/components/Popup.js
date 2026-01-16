import React from "react";
import "./CSS/Popup.css";

function Popup({ show, title, message, type, onConfirm, onClose }) {
  if (!show) return null;

  return (
    <div className="popup-overlay">
      <div className={`popup-box ${type}`}>
        <h3>{title}</h3>
        <p>{message}</p>

        <div className="popup-actions">
          {type === "confirm" ? (
            <>
              <button
                className="btn yes"
                onClick={() => {
                  onConfirm && onConfirm();
                  onClose();
                }}
              >
                Yes
              </button>
              <button className="btn no" onClick={onClose}>
                Cancel
              </button>
            </>
          ) : (
            <button className="btn ok" onClick={onClose}>
              OK
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Popup;
