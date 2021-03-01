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

export const Home = () => {
  const [load, setload] = useState(true);
  const authContext = useContext(AuthContext);
  const { loading } = authContext;

  useEffect(() => {
    if (!loading) {
    }
  }, [loading]);
  return (
    <div>
      <h1>PUBLIC HOME PAGE</h1>
    </div>
  );
};

// function Topic() {
//   let { topicId } = useParams();
//   return <h3>Requested topic ID: {topicId}</h3>;
// }
export default Home;
