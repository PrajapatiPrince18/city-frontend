import { useState } from "react";
import { Switch, Route, useHistory, useLocation, useParams } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

// Utilities Pages
import UtilitiesDashboard from "../pages/staff/utilities/UtilitiesDashboard";
import Water from "../pages/staff/utilities/Water";
import Road from "../pages/staff/utilities/Road";
import Electricity from "../pages/staff/utilities/Electricity";

// Properties Pages
import PropertiesDashboard from "../pages/staff/Properties/PropertyDashboard";
import Property from "../pages/staff/Properties/Property";

// Tourism Pages
import TourismDashboard from "../pages/staff/Tourism/TourismDashboard";
import TouristPlaces from "../pages/staff/Tourism/TouristPlaces";
import Amenities from "../pages/staff/Tourism/Amenities";
import ServiceProviders from "../pages/staff/Tourism/ServiceProviders";

// Common
import StaffProfile from "../pages/staff/Common/StaffProfile";

import "./CSS/StaffLayout.css";

function StaffLayout() {
  const history = useHistory();
  const location = useLocation();
  const { department } = useParams(); // Get department from URL
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const basePath = "/staff";

  // Define menu for each department
  const menuPaths = {
    utilities: {
      "Dashboard": "dashboard",
      "Water Complaints": "water-complaints",
      "Road Complaints": "road-complaints",
      "Electricity Complaints": "electricity-complaints",
      "Profile": "profile"
    },
    properties: {
      "Dashboard": "dashboard",
      "Property Management": "property-management",
      "Profile": "profile"
    },
    tourism: {
      "Dashboard": "dashboard",
      "Tourist Places": "tourist-places",
      "Amenities": "amenities",
      "Service Providers": "service-providers",
      "Profile": "profile"
    }
  };

  // Determine menu items based on current department
  const staffMenu = department && menuPaths[department]
    ? Object.keys(menuPaths[department])
    : ["Dashboard", "Profile"];

  // Navigate when menu item clicked
  const handleMenuClick = (item) => {
    const path = menuPaths[department][item];
    history.push(`${basePath}/${department}/${path}`);
    setSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="staff-layout-page">
      {/* Header */}
      <Header title="Staff Panel" onMenuClick={toggleSidebar} />

      <div className="layout-body">
        {/* Sidebar */}
        <Sidebar
          menu={staffMenu.map((item) => ({
            label: item,
            onClick: () => handleMenuClick(item),
            active: location.pathname.includes(menuPaths[department]?.[item] || "")
          }))}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content */}
        <main className={`layout-content ${sidebarOpen ? "sidebar-open" : ""}`}>
          <Switch>
            {/* Utilities */}
            <Route path={`${basePath}/utilities/dashboard`} component={UtilitiesDashboard} />
            <Route path={`${basePath}/utilities/water-complaints`} component={Water} />
            <Route path={`${basePath}/utilities/road-complaints`} component={Road} />
            <Route path={`${basePath}/utilities/electricity-complaints`} component={Electricity} />

            {/* Properties */}
            <Route path={`${basePath}/properties/dashboard`} component={PropertiesDashboard} />
            <Route path={`${basePath}/properties/property-management`} component={Property} />

            {/* Tourism */}
            <Route path={`${basePath}/tourism/dashboard`} component={TourismDashboard} />
            <Route path={`${basePath}/tourism/tourist-places`} component={TouristPlaces} />
            <Route path={`${basePath}/tourism/amenities`} component={Amenities} />
            <Route path={`${basePath}/tourism/service-providers`} component={ServiceProviders} />

            {/* Profile */}
            <Route path={`${basePath}/:department/profile`} component={StaffProfile} />

            {/* Fallback if no match */}
            <Route path={basePath} exact>
              {department === "utilities" ? <UtilitiesDashboard /> :
               department === "properties" ? <PropertiesDashboard /> :
               department === "tourism" ? <TourismDashboard /> :
               <StaffProfile />}
            </Route>
          </Switch>
        </main>
      </div>
    </div>
  );
}

export default StaffLayout;
