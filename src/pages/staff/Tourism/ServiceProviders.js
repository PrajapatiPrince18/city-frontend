import React, { useState, useMemo } from "react";
import GlassCard from "../../../components/GlassCard";
import Popup from "../../../components/Popup";
import "./CSS/ServiceProviders.css";

function StaffServiceProviders() {
  // ---------- All services + pre-populated businesses ----------
  const initialServices = [
    { name: "AC Repair", icon: "❄️", providers: [
      { business: "CoolTech AC Services", contact: "9988556677", status: "Approved" },
      { business: "AirCare Solutions", contact: "9876547788", status: "Approved" }
    ]},
    { name: "Car Mechanic", icon: "🚗", providers: [
      { business: "Mehsana AutoCare", contact: "9877766554", status: "Approved" },
      { business: "DriveFix Garage", contact: "9122334455", status: "Approved" }
    ]},
    { name: "Carpenter", icon: "🪚", providers: [
      { business: "WoodWorks", contact: "9871122334", status: "Approved" },
      { business: "HandyCarpentry", contact: "9122334455", status: "Approved" }
    ]},
    { name: "Electrician", icon: "💡", providers: [
      { business: "Spark Electric Co.", contact: "9876543210", status: "Approved" },
      { business: "Volt Electricians", contact: "9123456789", status: "Approved" }
    ]},
    { name: "Gardener", icon: "🌿", providers: [
      { business: "GreenThumb", contact: "9900112233", status: "Approved" },
      { business: "LawnPro", contact: "9988112233", status: "Approved" }
    ]},
    { name: "House Cleaning", icon: "🧹", providers: [
      { business: "Sparkle Cleaners", contact: "9988773344", status: "Approved" },
      { business: "ShinyHomes", contact: "9122003344", status: "Approved" }
    ]},
    { name: "Internet Provider", icon: "🌐", providers: [
      { business: "FiberNet", contact: "9988776655", status: "Approved" },
      { business: "QuickConnect", contact: "9876541122", status: "Approved" }
    ]},
    { name: "Laundry & Dry Cleaning", icon: "🧺", providers: [
      { business: "Fresh Laundry", contact: "9877778899", status: "Approved" },
      { business: "Clean & Dry", contact: "9122336677", status: "Approved" }
    ]},
    { name: "Painter", icon: "🎨", providers: [
      { business: "ColorMasters", contact: "9988771122", status: "Approved" },
      { business: "ProPainters", contact: "9122445566", status: "Approved" }
    ]},
    { name: "Plaster & Masonry", icon: "🧱", providers: [
      { business: "Stone & Brick", contact: "9876541123", status: "Approved" },
      { business: "Masonry Experts", contact: "9123445566", status: "Approved" }
    ]},
    { name: "Plumber", icon: "🔧", providers: [
      { business: "PipeFix Services", contact: "9123456780", status: "Approved" },
      { business: "WaterFlow Experts", contact: "9870012345", status: "Approved" }
    ]},
    { name: "Security Services", icon: "🛡️", providers: [
      { business: "SafeGuard Security", contact: "9988776655", status: "Approved" },
      { business: "Watchful Eyes", contact: "9876655443", status: "Approved" }
    ]}
  ];

  // ---------- User-submitted requests (Pending) ----------
  const initialUserRequests = [
    { name: "Fresh Air AC Services", contact: "9998887776", service: "AC Repair", status: "Pending" },
    { name: "Eco Lawn Care", contact: "9900112233", service: "Gardener", status: "Pending" },
    { name: "QuickFix Plumbing", contact: "9123456781", service: "Plumber", status: "Pending" },
    { name: "Bright Painters", contact: "9988771133", service: "Painter", status: "Pending" }
  ];

  // ---------- States ----------
  const [services, setServices] = useState(initialServices);
  const [userRequests, setUserRequests] = useState(initialUserRequests);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editService, setEditService] = useState(null);

  const [formData, setFormData] = useState({
    business: "",
    contact: "",
    service: initialServices[0].name,
    status: "Approved",
  });

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortAZ, setSortAZ] = useState(true);

  // ---------- POPUP STATE ----------
  const [popup, setPopup] = useState({
    show: false,
    title: "",
    message: "",
    type: "",
    onConfirm: null
  });

  // ---------- Handlers ----------
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.business || !formData.contact || !formData.service) {
      setPopup({
        show: true,
        title: "Validation Error",
        message: "All fields are required.",
        type: "error"
      });
      return;
    }

    const updatedServices = [...services];
    const serviceIndex = services.findIndex(s => s.name === formData.service);

    if (editIndex !== null && editService) {
      updatedServices[serviceIndex].providers[editIndex] = formData;
      setEditIndex(null);
      setEditService(null);
    } else {
      updatedServices[serviceIndex].providers.push(formData);
    }

    setServices(updatedServices);
    setFormData({ business: "", contact: "", service: initialServices[0].name, status: "Approved" });
    setShowForm(false);
  };

  const handleEdit = (serviceName, index) => {
    const serviceIndex = services.findIndex(s => s.name === serviceName);
    setFormData(services[serviceIndex].providers[index]);
    setEditIndex(index);
    setEditService(serviceName);
    setShowForm(true);
  };

  const handleDelete = (serviceName, index) => {
    const serviceIndex = services.findIndex(s => s.name === serviceName);
    const provider = services[serviceIndex].providers[index];

    setPopup({
      show: true,
      title: "Delete Provider",
      message: `Are you sure you want to delete "${provider.business}"?`,
      type: "confirm",
      onConfirm: () => {
        const updatedServices = [...services];
        updatedServices[serviceIndex].providers.splice(index, 1);
        setServices(updatedServices);
        setPopup({ ...popup, show: false });
      }
    });
  };

  // ---------- Approve / Reject User Requests ----------
  const handleApprove = (index) => {
    const req = userRequests[index];
    setPopup({
      show: true,
      title: "Approve Request",
      message: `Approve "${req.name}" for ${req.service}?`,
      type: "confirm",
      onConfirm: () => {
        const updatedServices = [...services];
        const serviceIndex = services.findIndex(s => s.name === req.service);
        updatedServices[serviceIndex].providers.push({
          business: req.name,
          contact: req.contact,
          service: req.service,
          status: "Approved"
        });

        const updatedRequests = [...userRequests];
        updatedRequests.splice(index, 1);

        setServices(updatedServices);
        setUserRequests(updatedRequests);
        setPopup({ ...popup, show: false });
      }
    });
  };

  const handleReject = (index) => {
    const req = userRequests[index];
    setPopup({
      show: true,
      title: "Reject Request",
      message: `Reject "${req.name}" for ${req.service}?`,
      type: "confirm",
      onConfirm: () => {
        const updatedRequests = [...userRequests];
        updatedRequests[index].status = "Rejected";
        setUserRequests(updatedRequests);
        setPopup({ ...popup, show: false });
      }
    });
  };

  // ---------- Filter + Sort ----------
  const filteredServices = useMemo(() => {
    return services.map(service => ({
      ...service,
      providers: service.providers
        .filter(p => p.business.toLowerCase().includes(search.toLowerCase()))
        .filter(p => filterStatus === "All" || p.status === filterStatus)
        .sort((a, b) => sortAZ ? a.business.localeCompare(b.business) : b.business.localeCompare(a.business))
    }));
  }, [services, search, sortAZ, filterStatus]);

  return (
    <div className="ssp-root">
      <h2 className="ssp-title">Service Providers Management (Staff)</h2>

      {/* FILTER BAR */}
      <div className="ssp-filter-bar">
        <input type="text" placeholder="Search providers..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
        <button onClick={() => setSortAZ(!sortAZ)}>Sort: {sortAZ ? "A → Z" : "Z → A"}</button>
        <button className="ssp-add-btn" onClick={() => setShowForm(true)}>+ Add Provider</button>
      </div>

      {/* FORM */}
      {showForm && (
        <GlassCard>
          <form className="ssp-form" onSubmit={handleSubmit}>
            <input type="text" name="business" placeholder="Business Name" value={formData.business} onChange={handleChange} required />
            <input type="text" name="contact" placeholder="Contact Number" value={formData.contact} onChange={handleChange} required />
            <select name="service" value={formData.service} onChange={handleChange}>
              {initialServices.map((s, idx) => <option key={idx} value={s.name}>{s.name}</option>)}
            </select>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button type="submit" className="ssp-submit-btn">{editIndex !== null ? "Update" : "Add"}</button>
              <button type="button" className="ssp-cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </GlassCard>
      )}

      {/* USER REQUESTS */}
      {userRequests.length > 0 && (
        <div className="ssp-requests-section">
          <h3>User Submitted Requests</h3>
          <div className="ssp-grid">
            {userRequests.map((r, idx) => (
              <div key={idx} className="ssp-card">
                <h4>{r.name}</h4>
                <p>Contact: {r.contact}</p>
                <p>Service: {r.service}</p>
                <p>Status: {r.status}</p>
                {r.status === "Pending" && (
                  <div className="ssp-card-buttons">
                    <button className="ssp-approve-btn" onClick={() => handleApprove(idx)}>Approve</button>
                    <button className="ssp-delete-btn" onClick={() => handleReject(idx)}>Reject</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SERVICES */}
      {filteredServices.map((s, sIdx) => (
        <div key={sIdx} className="ssp-service-section">
          <h3>{s.name} ({s.providers.length})</h3>
          <div className="ssp-grid">
            {s.providers.map((p, idx) => (
              <div key={idx} className="ssp-card">
                <h4>{p.business}</h4>
                <p>Contact: {p.contact}</p>
                <p>Status: {p.status}</p>
                <div className="ssp-card-buttons">
                  <button onClick={() => handleEdit(s.name, idx)} className="ssp-edit-btn">Edit</button>
                  <button onClick={() => handleDelete(s.name, idx)} className="ssp-delete-btn">Delete</button>
                </div>
              </div>
            ))}
            {s.providers.length === 0 && <p>No providers found</p>}
          </div>
        </div>
      ))}

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

export default StaffServiceProviders;
