import React, { useState } from "react";
import { FaFilePdf, FaCheckCircle, FaExclamationCircle, FaBuilding, FaUsers } from "react-icons/fa";
import GlassCard from "../../components/GlassCard";
import Popup from "../../components/Popup"; // Add popup for notifications
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./CSS/Report.css";

function Reports() {
  const [popup, setPopup] = useState({
    show: false,
    title: "",
    message: "",
    type: "",
  });

  // Dummy data
  const complaints = [
    { id: 1, user: "John Doe", status: "Solved" },
    { id: 2, user: "Jane Smith", status: "Pending" },
    { id: 3, user: "Alice Brown", status: "Solved" },
    { id: 4, user: "Rahul Sharma", status: "Pending" },
  ];

  const properties = [
    { id: 1, number: "101", owner: "Rahul Sharma" },
    { id: 2, number: "102", owner: "Sita Patel" },
  ];

  const serviceProviders = [
    { id: 1, business: "Spark Electric", owner: "Amit Kumar" },
    { id: 2, business: "Clean Water Co.", owner: "Priya Shah" },
  ];

  const departments = ["Public Utilities", "Properties", "Tourist"];

  const totalComplaints = complaints.length;
  const solvedComplaints = complaints.filter(c => c.status === "Solved").length;
  const pendingComplaints = totalComplaints - solvedComplaints;
  const totalProperties = properties.length;
  const totalProviders = serviceProviders.length;
  const totalDepartments = departments.length;

  // PDF download function with popup
  const downloadPDF = (title, data, columns) => {
    const doc = new jsPDF();
    doc.text(title, 14, 16);
    doc.autoTable({
      startY: 20,
      head: [columns],
      body: data.map(item => columns.map(col => item[col])),
    });
    doc.save(`${title}.pdf`);

    // Show popup notification after download
    setPopup({
      show: true,
      title: "Download Successful",
      message: `${title} PDF has been downloaded!`,
      type: "success",
    });
  };

  return (
    <div className="admin-dashboard">
      <h2 className="admin-title">Reports</h2>
      <p className="admin-subtitle">Quick statistics and downloadable reports</p>

      <div className="dashboard-grid">
        {/* Complaints */}
        <GlassCard>
          <div className="card-header red"><FaFilePdf /></div>
          <h4>Total Complaints</h4>
          <p className="count">{totalComplaints}</p>
          <button className="download-btn"
            onClick={() => downloadPDF(
              "All_Complaints",
              complaints.map(c => ({ ID: c.id, User: c.user, Status: c.status })),
              ["ID", "User", "Status"]
            )}
          >
            <FaFilePdf /> Download PDF
          </button>
        </GlassCard>

        <GlassCard>
          <div className="card-header green"><FaCheckCircle /></div>
          <h4>Solved Complaints</h4>
          <p className="count">{solvedComplaints}</p>
          <button className="download-btn"
            onClick={() => downloadPDF(
              "Solved_Complaints",
              complaints.filter(c => c.status === "Solved").map(c => ({ ID: c.id, User: c.user })),
              ["ID", "User"]
            )}
          >
            <FaFilePdf /> Download PDF
          </button>
        </GlassCard>

        <GlassCard>
          <div className="card-header orange"><FaExclamationCircle /></div>
          <h4>Pending Complaints</h4>
          <p className="count">{pendingComplaints}</p>
          <button className="download-btn"
            onClick={() => downloadPDF(
              "Pending_Complaints",
              complaints.filter(c => c.status === "Pending").map(c => ({ ID: c.id, User: c.user })),
              ["ID", "User"]
            )}
          >
            <FaFilePdf /> Download PDF
          </button>
        </GlassCard>

        {/* Properties */}
        <GlassCard>
          <div className="card-header blue"><FaBuilding /></div>
          <h4>Total Properties</h4>
          <p className="count">{totalProperties}</p>
          <button className="download-btn"
            onClick={() => downloadPDF(
              "Properties_List",
              properties,
              ["id", "number", "owner"]
            )}
          >
            <FaFilePdf /> Download PDF
          </button>
        </GlassCard>

        {/* Service Providers */}
        <GlassCard>
          <div className="card-header purple"><FaUsers /></div>
          <h4>Service Providers</h4>
          <p className="count">{totalProviders}</p>
          <button className="download-btn"
            onClick={() => downloadPDF(
              "Service_Providers",
              serviceProviders,
              ["id", "business", "owner"]
            )}
          >
            <FaFilePdf /> Download PDF
          </button>
        </GlassCard>

        {/* Departments */}
        <GlassCard>
          <div className="card-header teal"><FaBuilding /></div>
          <h4>Departments</h4>
          <p className="count">{totalDepartments}</p>
          <button className="download-btn"
            onClick={() => downloadPDF(
              "Departments",
              departments.map((d, i) => ({ ID: i+1, Name: d })),
              ["ID", "Name"]
            )}
          >
            <FaFilePdf /> Download PDF
          </button>
        </GlassCard>
      </div>

      {/* Popup */}
      <Popup
        show={popup.show}
        title={popup.title}
        message={popup.message}
        type={popup.type}
        onClose={() => setPopup({ ...popup, show: false })}
      />
    </div>
  );
}

export default Reports;
