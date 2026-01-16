import "./CSS/Sidebar.css";
import { FaTimes } from "react-icons/fa";

function Sidebar({ menu, isOpen, onClose }) {
  return (
    <aside className={`sidebar glass ${isOpen ? "open" : ""}`}>
      {/* Close button */}
      <button className="close-btn" onClick={onClose}>
        <FaTimes />
      </button>

      <ul>
        {menu.map((item, index) => (
          <li key={index} onClick={item.onClick}>
            {item.label}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
