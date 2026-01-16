import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FaHome, FaPlus, FaClipboardList } from "react-icons/fa";
import GlassCard from "../../../components/GlassCard";
import Popup from "../../../components/Popup";
import "./CSS/PropertyDashboard.css";

function PropertiesDashboard() {
  const history = useHistory();

  const initialProperties = [
    { id: 1, number: "P-101", type: "House", owner: "Rahul Sharma", mobile: "9876543210", address: "Sector 12, City" },
    { id: 2, number: "P-102", type: "Apartment", owner: "Priya Verma", mobile: "9123456780", address: "Lake View Apartments" },
    { id: 3, number: "P-103", type: "Land", owner: "Amit Singh", mobile: "9988776655", address: "Sector 8, City" },
    { id: 4, number: "P-104", type: "House", owner: "Sneha Patel", mobile: "9876501234", address: "Sector 5, City" },
    { id: 5, number: "P-105", type: "Apartment", owner: "Rohan Joshi", mobile: "9123409876", address: "Green Heights, City" },
  ];

  const [properties, setProperties] = useState(initialProperties);
  const [editId, setEditId] = useState(null);
  const [tempEdit, setTempEdit] = useState({});

  /* POPUP STATE */
  const [popup, setPopup] = useState({
    show: false,
    title: "",
    message: "",
    type: "",
    onConfirm: null,
  });

  const quickLinks = [
    { title: "View All Properties", desc: "Check complete property list.", icon: <FaClipboardList />, path: "/staff/properties/list" },
    { title: "Add Property", desc: "Add new property to system.", icon: <FaPlus />, path: "/staff/properties/add" },
  ];

  const totalProperties = properties.length;
  const propertyTypes = ["House", "Apartment", "Land", "Commercial"];
  const typeStats = propertyTypes.map(type => ({
    type,
    count: properties.filter(p => p.type === type).length
  }));

  const handleEdit = (prop) => {
    setEditId(prop.id);
    setTempEdit({ ...prop });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();

    if (!tempEdit.owner || !tempEdit.mobile) {
      setPopup({
        show: true,
        title: "Validation Error",
        message: "Owner name and mobile number are required.",
        type: "error",
      });
      return;
    }

    setProperties(
      properties.map(p => (p.id === tempEdit.id ? { ...tempEdit } : p))
    );

    setEditId(null);

    setPopup({
      show: true,
      title: "Success",
      message: "Property updated successfully!",
      type: "success",
    });
  };

  const handleCancelEdit = () => {
    setPopup({
      show: true,
      title: "Cancel Edit",
      message: "Are you sure you want to discard changes?",
      type: "confirm",
      onConfirm: () => {
        setEditId(null);
      },
    });
  };

  return (
    <div className="pd-root">
      <div className="pd-container">

        {/* HEADER */}
        <div className="pd-header">
          <h1>Properties Dashboard</h1>
          <p>Manage city properties and allocate them to users.</p>
        </div>

        {/* STATS */}
        <div className="pd-grid">
          <GlassCard className="pd-card pd-stat-card">
            <div className="pd-card-icon"><FaClipboardList /></div>
            <h3>Total Properties</h3>
            <p className="pd-stat-value">{totalProperties}</p>
          </GlassCard>

          {typeStats.map((t, i) => (
            <GlassCard key={i} className="pd-card pd-stat-card">
              <div className="pd-card-icon"><FaHome /></div>
              <h3>{t.type}</h3>
              <p className="pd-stat-value">{t.count}</p>
            </GlassCard>
          ))}
        </div>

        {/* QUICK ACTIONS */}
        <div className="pd-section-title">Quick Actions</div>
        <div className="pd-grid">
          {quickLinks.map((q, i) => (
            <GlassCard
              key={i}
              className="pd-card pd-quick-card"
              onClick={() => history.push(q.path)}
            >
              <div className="pd-card-icon">{q.icon}</div>
              <h3>{q.title}</h3>
              <p>{q.desc}</p>
            </GlassCard>
          ))}
        </div>

        {/* PROPERTY LIST */}
        <div className="pd-section-title">Property List</div>
        <GlassCard className="pd-card">
          <table className="pd-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Property Number</th>
                <th>Type</th>
                <th>Owner</th>
                <th>Mobile</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {properties.map(p => (
                <tr key={p.id}>
                  {editId === p.id ? (
                    <td colSpan="7">
                      <form className="edit-form" onSubmit={handleSaveEdit}>
                        <input value={p.number} disabled />
                        <input value={p.type} disabled />
                        <input
                          value={tempEdit.owner}
                          onChange={(e) => setTempEdit({ ...tempEdit, owner: e.target.value })}
                        />
                        <input
                          value={tempEdit.mobile}
                          onChange={(e) => setTempEdit({ ...tempEdit, mobile: e.target.value })}
                        />
                        <input
                          value={tempEdit.address}
                          onChange={(e) => setTempEdit({ ...tempEdit, address: e.target.value })}
                        />
                        <div className="edit-buttons">
                          <button className="save-btn">Save</button>
                          <button type="button" className="cancel-btn" onClick={handleCancelEdit}>
                            Cancel
                          </button>
                        </div>
                      </form>
                    </td>
                  ) : (
                    <>
                      <td>{p.id}</td>
                      <td>{p.number}</td>
                      <td>{p.type}</td>
                      <td>{p.owner}</td>
                      <td>{p.mobile}</td>
                      <td>{p.address}</td>
                      <td>
                        <button className="edit-btn" onClick={() => handleEdit(p)}>
                          Edit
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>
      </div>

      {/* POPUP */}
      <Popup
        show={popup.show}
        title={popup.title}
        message={popup.message}
        type={popup.type}
        onConfirm={popup.onConfirm}
        onClose={() => setPopup({ ...popup, show: false })}
      />
    </div>
  );
}

export default PropertiesDashboard;
