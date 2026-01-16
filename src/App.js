import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import AuthContainer from "./pages/auth/AuthContainer";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import StaffLayout from "./layouts/StaffLayout";
import UserProfile from "./pages/user/UserProfile";

function App() {
  return (
    <Router>
      <Switch>
        {/* Auth */}
        <Route path="/auth" component={AuthContainer} />

        {/* User Module */}
        <Route path="/user" component={UserLayout} />
        <Route path="/user-profile" component={UserProfile} />

        {/* Admin Module */}
        <Route path="/admin" component={AdminLayout} />

        {/* Staff Module */}
        {/* Use :department param so StaffLayout can read it */}
        <Route path="/staff/:department" component={StaffLayout} />
        <Route path="/staff" exact>
          {/* Redirect to a default department if none selected */}
          <Redirect to="/staff/utilities/dashboard" />
        </Route>

        {/* Default Redirect */}
        <Redirect to="/auth" />
      </Switch>
    </Router>
  );
}

export default App;
