import React, { useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageUsers from "../pages/admin/ManageUsers";
import ManageStaff from "../pages/admin/ManageStaff";
import Report from "../pages/admin/Report";
import AddServiceProvider from "../pages/admin/AddServiceProvider";
import AdminProfile from "../pages/admin/AdminProfile";

import "./CSS/AdminLayout.css";

function AdminLayout() {
  const history = useHistory();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const adminMenu = [
    "Dashboard",
    "Users",
    "Staff",
    "Reports",
    "Add Service Providers",
    "Profile"
  ];

  const handleMenuClick = (item) => {
    const path = item.toLowerCase().replace(/\s+/g, "");
    history.push(`/admin/${path}`);
    setSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="admin-layout-page">
      {/* Header */}
      <Header title="Admin Panel" onMenuClick={toggleSidebar} />

      <div className="admin-layout-body">
        {/* Sidebar */}
        <Sidebar
          menu={adminMenu.map((item) => ({
            label: item,
            onClick: () => handleMenuClick(item),
          }))}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content: Big white card container */}
        <main className={`admin-layout-content ${sidebarOpen ? "sidebar-open" : ""}`}>
          <div className="admin-dashboard-card">
            {/* Switch for Admin pages */}
            <Switch>
              <Route path="/admin/dashboard" component={AdminDashboard} />
              <Route path="/admin/users" component={ManageUsers} />
              <Route path="/admin/staff" component={ManageStaff} />
              <Route path="/admin/reports" component={Report} />
              <Route path="/admin/addserviceproviders" component={AddServiceProvider} />
              <Route path="/admin/profile" component={AdminProfile} />

              {/* Default Route */}
              <Route path="/admin" exact component={AdminDashboard} />
            </Switch>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
