import { useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

import UserHome from "../pages/user/UserHome";
import Properties from "../pages/user/Properties";
import Amenities from "../pages/user/Amenities";
import ServiceProviders from "../pages/user/ServiceProviders";
import Complaints from "../pages/user/Complaints";
import UserProfile from "../pages/user/UserProfile";
import TouristPlaces from "../pages/user/TouristPlaces";   // ⭐ ADD THIS

import "./CSS/UserLayout.css";

function UserLayout() {
  const history = useHistory();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const userMenu = [
    "Home",
    "Properties",
    "Amenities",
    "Service Providers",
    "Tourist Places",     // ⭐ ADD THIS
    "Complaints",
    "Profile"
  ];

  const handleMenuClick = (item) => {
    const path = item.toLowerCase().replace(/\s+/g, "");
    history.push(`/user/${path}`);
    setSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="user-layout-page">
      <Header title="MEHSANA CITY" onMenuClick={toggleSidebar} />

      <div className="layout-body">
        <Sidebar
          menu={userMenu.map((item) => ({
            label: item,
            onClick: () => handleMenuClick(item)
          }))}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className={`layout-content ${sidebarOpen ? "sidebar-open" : ""}`}>
          <Switch>
            <Route path="/user/home" component={UserHome} />
            <Route path="/user/properties" component={Properties} />
            <Route path="/user/amenities" component={Amenities} />
            <Route path="/user/serviceproviders" component={ServiceProviders} />
            <Route path="/user/touristplaces" component={TouristPlaces} /> {/* ⭐ ADD THIS */}
            <Route path="/user/complaints" component={Complaints} />
            <Route path="/user/profile" component={UserProfile} />
            <Route path="/" exact component={UserHome} />
          </Switch>
        </main>
      </div>
    </div>
  );
}

export default UserLayout;
