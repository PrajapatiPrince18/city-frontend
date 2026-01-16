import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useHistory } from "react-router-dom"; // React-Router v5
import "./CSS/Header.css";

function Header({ title, onMenuClick }) {
  const history = useHistory();

  // Navigate to the user profile page
  const goToProfile = () => {
    // Replace '/user-profile' with the exact route path where your UserProfile component is rendered
    history.push("/user-profile");
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-btn" onClick={onMenuClick}>
          ☰
        </button>
        <h2>{title}</h2>
      </div>

      <div className="header-right">
        <button className="profile-btn" onClick={goToProfile}>
          <FaUserCircle className="profile-icon" />
        </button>
      </div>
    </header>
  );
}

export default Header;
