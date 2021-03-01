import React, { Fragment } from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import About from "./components/pages/About";
import AuthState from "./context/auth/AuthState";
import UserState from "./context/user/UserState";
import Register from "./components/auth/Register";

import AlertState from "./context/alert/AlertState";
import Alert from "./components/layout/Alert";
import setAuthToken from "./utilis/setAuthToken";

import Header from "./components/layout/Headermy";
import AppRoutes from "./routing/AppRoutes";

if (localStorage) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <UserState>
        <AlertState>
          <Router>
            <Fragment>
              <Header />
              <div className="alert-con">
                <Alert />
              </div>
              <div className=".container_app "></div>
              <AppRoutes />
            </Fragment>
          </Router>
        </AlertState>
      </UserState>
    </AuthState>
  );
};

export default App;
