import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../context/auth/authContext";
import Login from "../components/auth/Login";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;
  return (
    <Route
      {...rest}
      render={(props) => {
        // !isAuthenticated && !loading ? (
        //   <Redirect to="/login" />
        // ) : (
        //   <Component {...props} />
        // )

        if (!isAuthenticated) <Redirect to="/login" />;
        if (loading) return <div>Loading...</div>;
        return Component ? <Component {...rest} {...props} /> : null;
      }}
    />
  );
};

export default PrivateRoute;
