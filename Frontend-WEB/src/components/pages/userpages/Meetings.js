import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../../context/auth/authContext";
export const Meetings = () => {
  const authContext = useContext(AuthContext);

  const { loading } = authContext;
  // const [load, setload] = useState(true);
  useEffect(() => {
    if (!loading) {
    }
  }, [loading]);

  if (loading)
    return (
      <div>
        <p>LOADING</p>
        sdfffffffffffffff sdfsdfsdfsdf sdfsdfsdf
      </div>
    );
  return (
    <div>
      <h1>USER MEETINGS</h1>
    </div>
  );
};

export default Meetings;
