import React, { useState, useContext, useEffect } from "react";

// import Contacts from "../contacts/Contacts";
// import ContactForm from "../contacts/ContactForm";
// import ContactFilter from "../contacts/ContactFilter";

import AuthContext from "../../context/auth/authContext";
// import Rooms from "../main/Rooms";
// import Configure from "../main/Configure";
// import AddRoom from "./AddRoom";
// import AddUser from "../main/AddUser";
import "./home.css";

export const AdminDashboard = () => {
  const authContext = useContext(AuthContext);

  const { loading, isadmin } = authContext;

  // useEffect(() => {
  //   if (!loading) {
  //   }
  // }, [loading]);

  if (loading) {
    return (
      <div>
        <h2>LOADING</h2>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. At sit maiores
        officiis suscipit ullam blanditiis iste delectus odio saepe. Odit
        repudiandae blanditiis dolorum quibusdam quia placeat reiciendis nihil
        aperiam voluptatem!
      </div>
    );
  }
  if (isadmin) {
    return (
      <div>
        <h2>AdminDashboard</h2>
      </div>
    );
  }
  return (
    <div>
      <h2>User Dashboard {`${isadmin} ${loading}`}</h2>
    </div>
  );
};

// function Topic() {
//   let { topicId } = useParams();
//   return <h3>Requested topic ID: {topicId}</h3>;
// }
export default AdminDashboard;
