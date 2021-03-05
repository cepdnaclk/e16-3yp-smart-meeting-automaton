import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Redirectcom from "./Redirectcom";
import Home from "../components/pages/Home";
import AddRoom from "../components/pages/AddRoom";
import AddUser from "../components/pages/AddUser";
import Configure from "../components/pages/Configure";
import Rooms from "../components/pages/Rooms";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import NotFound from "../components/pages/NotFound";
import AuthContext from "../context/auth/authContext";
import About from "../components/pages/About";
// import AdminDashboard from "../components/pages/AdminDashboard";

import Meetings from "../components/pages/newui/my-meetings";
import RoomsConfig from "../components/pages/newui/rooms-config";
import AdminDashBoard from "../components/pages/newui/rooms-dashboard-new";
import AdminAddmeetings from "../components/pages/newui/admin-add-meeting";

// import UserAddMeetings from "../components/pages/newui/add-meeting";
import Profile from "../components/pages/userpages/Profile";
import Addmeeting from "../components/pages/newui/add-meeting";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";

function AppRoutes() {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading, isadmin } = authContext;

  return (
    <section>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route exact path="/register" exact component={Register} />
        <Route exact path="/about" exact component={About} />
        <Route exact path="/login">
          {isAuthenticated ? <Redirect to="/Redirect" /> : <Login />}
        </Route>
        {/* //============================== */}

        <Route exact path="/Redirect" exact component={Redirectcom} />
        <Route
          path="/configure/room/:_id/:roomName"
          exact
          component={isadmin ? RoomsConfig : NotFound}
        />
        <Route
          path="/addmeeting/room/:_id/:roomName"
          exact
          component={isadmin ? AdminAddmeetings : NotFound}
        />
        {/* //============================== */}

        <Route path="/dashboard" exact component={AdminDashBoard} />

        <Route
          path="/meetings"
          exact
          component={isAuthenticated ? Meetings : Login}
        />
        <Route
          path="/profile"
          exact
          component={isAuthenticated ? Profile : Login}
        />

        {/* ADMIN ROUTES */}
        <Route path="/addmeeting" exact component={Addmeeting} />

        <Route path="/adduser" exact component={isadmin ? AddUser : Login} />
        <Route path="/addroom" exact component={isadmin ? AddRoom : Login} />
        <Route path="/Rooms" exact component={isadmin ? Rooms : Login} />
        <Route
          path="/configure"
          exact
          component={isadmin ? Configure : Login}
        />

        <Route path="*" exact component={NotFound} />
      </Switch>
    </section>
  );
}

export default AppRoutes;
