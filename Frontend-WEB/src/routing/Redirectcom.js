import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../context/auth/authContext";

const Redirectcom = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading, isadmin } = authContext;
  return (
    <Route
      {...rest}
      render={(props) => {
        // !loading && !isadmin ? (
        //   <Redirect to="/login" />
        // ) : (
        //   <Component {...props} />
        // )

        if (loading) return <div>Loading...</div>;
        if (isAuthenticated && isadmin) return <Redirect to="/dashboard" />;
        if (isAuthenticated && !isadmin) return <Redirect to="/meetings" />;
        return <div>Loading...</div>;
        // return <Redirect to="/login" />;
        // return Component ? <Component {...rest} {...props} /> : null;
      }}
    />
  );
};

export default Redirectcom;
