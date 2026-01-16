import React, { useState } from "react";
import GlassCard from "../../components/GlassCard";
import "./CSS/Properties.css";

function Properties() {
  const currentUserPhone = "9876543210"; // Simulate logged-in user's phone

  const [filter, setFilter] = useState("all");

  const properties = [
    { id: 1, type: "House", number: "101", owner: "Rahul Sharma", bill: "Water", amount: "₹450", status: "Paid", phone: "9876543210" },
    { id: 2, type: "House", number: "102", owner: "Rahul Sharma", bill: "Electricity", amount: "₹780", status: "Pending", phone: "9876543210" },
    { id: 3, type: "Shop", number: "S-12", owner: "Amit Shah", bill: "Property Tax", amount: "₹2200", status: "Overdue", phone: "9123456789" },
    { id: 4, type: "House", number: "103", owner: "Karan Singh", bill: "Water", amount: "₹500", status: "Paid", phone: "9876501234" },
    { id: 5, type: "Apartment", number: "A-205", owner: "Neha Verma", bill: "Maintenance", amount: "₹950", status: "Pending", phone: "9876543210" },
  ];

  // Filter properties automatically for logged-in user
  const userProperties = properties.filter(p => p.phone === currentUserPhone);

  const filtered =
    filter === "all"
      ? userProperties
      : userProperties.filter((p) => p.status.toLowerCase() === filter);

  return (
    <div className="prop-root">
      <div className="properties-page">

        {/* ========= HEADER ========= */}
        <GlassCard>
          <h2 className="page-title">🏠 My Properties & Billing</h2>
          <p className="page-subtitle">
            View all your registered properties and bill payment status.
          </p>
        </GlassCard>

        {/* ========= SUMMARY ========= */}
        <div className="summary-grid">
          <GlassCard>
            <h3>Total Properties</h3>
            <p className="summary-number">{userProperties.length}</p>
          </GlassCard>

          <GlassCard>
            <h3>Paid Bills</h3>
            <p className="summary-number green">
              {userProperties.filter((p) => p.status === "Paid").length}
            </p>
          </GlassCard>

          <GlassCard>
            <h3>Pending Bills</h3>
            <p className="summary-number orange">
              {userProperties.filter((p) => p.status === "Pending").length}
            </p>
          </GlassCard>

          <GlassCard>
            <h3>Overdue Bills</h3>
            <p className="summary-number red">
              {userProperties.filter((p) => p.status === "Overdue").length}
            </p>
          </GlassCard>
        </div>

        {/* ========= FILTER + TABLE ========= */}
        <GlassCard>
          <div className="filter-tabs">
            <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>
              All
            </button>
            <button className={filter === "paid" ? "active" : ""} onClick={() => setFilter("paid")}>
              Paid
            </button>
            <button className={filter === "pending" ? "active" : ""} onClick={() => setFilter("pending")}>
              Pending
            </button>
            <button className={filter === "overdue" ? "active" : ""} onClick={() => setFilter("overdue")}>
              Overdue
            </button>
          </div>

          <div className="table-wrapper">
            <table className="properties-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Type</th>
                  <th>Number</th>
                  <th>Owner</th>
                  <th>Bill Type</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, index) => (
                  <tr key={p.id}>
                    <td>{index + 1}</td>
                    <td>{p.type}</td>
                    <td>{p.number}</td>
                    <td>{p.owner}</td>
                    <td>{p.bill}</td>
                    <td>{p.amount}</td>
                    <td>
                      <span className={`status ${p.status.toLowerCase()}`}>
                        {p.status}
                      </span>
                    </td>
                    <td>
                      <button className="pay-btn">
                        {p.status === "Paid" ? "View Receipt" : "Pay Now"}
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan="8" style={{ textAlign: "center" }}>
                      You have no properties registered.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </GlassCard>

      </div>
    </div>
  );
}

export default Properties;
