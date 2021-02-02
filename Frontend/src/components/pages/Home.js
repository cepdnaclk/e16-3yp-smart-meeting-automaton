import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import Rooms from "../main/Rooms";
import Configure from "../main/Configer";
import AddRoom from "../main/AddRoom";
import AddUser from "../main/AddUser";
import "./home.css";

// import React from "react";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link,
//   useRouteMatch,
//   useParams,
// } from "react-router-dom";
const renderSwitch = (param) => {
  switch (param) {
    case 0:
      return <Rooms />;
    case 1:
      return <Configure />;
    case 2:
      return <AddUser />;
    case 3:
      return <AddRoom />;
    default:
      return <Rooms />;
  }
};
export const Home = () => {
  const [pageno, setpage] = useState(0);

  // let match = useRouteMatch();
  // console.log(match);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    //eslint-disable-next-line
  }, []);
  console.log("configure page no :" + pageno);

  return (
    <div>
      {/* <Main-bar /> */}

      <div className="main-bar">
        <button
          className={
            " dashb-btn " + (pageno === 0 ? "dash-hover" : "dash-nohover")
          }
          onClick={() => {
            setpage(0);
          }}
          type="button"
        >
          {" "}
          ROOMS
        </button>

        <button
          className={
            " dashb-btn " + (pageno === 1 ? "dash-hover" : "dash-nohover")
          }
          onClick={() => {
            setpage(1);
          }}
          type="button"
        >
          {" "}
          CONFIGURE
        </button>

        <button
          className={
            " dashb-btn " + (pageno === 2 ? "dash-hover" : "dash-nohover")
          }
          onClick={() => {
            setpage(2);
          }}
          type="button"
        >
          {" "}
          ADD USER
        </button>

        <button
          className={
            " dashb-btn " + (pageno === 3 ? "dash-hover" : "dash-nohover")
          }
          onClick={() => {
            setpage(3);
          }}
          type="button"
        >
          {" "}
          ADD ROOM
        </button>
      </div>
      <hr />
      {/* <div className="main-bar">{pageno === 0 && <h1>Rooms</h1>}</div>
      <div className="main-bar">{pageno === 1 && <h1>configure</h1>}</div>
      <div className="main-bar">{pageno === 2 && <h1>addroom</h1>}</div>
      <div className="main-bar">{pageno === 3 && <h1>setAdduser</h1>}</div>
       */}
      {renderSwitch(pageno)}
    </div>
  );
};

// function Topic() {
//   let { topicId } = useParams();
//   return <h3>Requested topic ID: {topicId}</h3>;
// }
export default Home;
