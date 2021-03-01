import React, { useState, useRef, useEffect, useContext } from "react";
import { FaBars, FaTwitter } from "react-icons/fa";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import "./hedermy.css";

import AuthContext from "../../context/auth/authContext";
// import { links, social } from "./data";
// import logo from "./logo.svg";

const Headermy = ({ title, icon }) => {
  const [showlinks, setshowlinks] = useState(false);

  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);
  useEffect(() => {
    const linkHeight = linksRef.current.getBoundingClientRect().height;
    console.log(linkHeight);
    if (showlinks) {
      linksContainerRef.current.style.height = `${linkHeight}px`;
    } else {
      linksContainerRef.current.style.height = "0px"; // js inline
    }
  }, [showlinks]);

  const toggleLinks = () => {
    setshowlinks(!showlinks);
  };
  const closeIfOpen = () => {
    if (showlinks) setshowlinks(false);
  };

  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout, user, isadmin } = authContext;
  // const { clearContact } = contactContext;

  const onLogout = () => {
    closeIfOpen();
    window.location.href = "/login";
    logout();
  };

  const authLinks = (
    <>
      {/* <li>Hello {user && user.name}</li> */}
      <li className="logoutshift">
        <a onClick={onLogout} href="#!">
          <i className="fas fa-sign-out-alt"></i> <span>Logout</span>
        </a>
      </li>
    </>
  );
  const userLinks = (
    <>
      <li>
        <Link onClick={closeIfOpen} to="/meetings">
          Meetings
        </Link>
      </li>
      <li>
        <Link onClick={closeIfOpen} to="/addmeeting">
          ADD Meetings
        </Link>
      </li>
      <li>
        <Link onClick={closeIfOpen} to="/profile">
          Profile
        </Link>
      </li>
    </>
  );
  const adminLinks = (
    <>
      <li>
        <Link onClick={closeIfOpen} to="/dashboard">
          Dashboard
        </Link>
      </li>
      <li>
        <Link onClick={closeIfOpen} to="/adduser">
          Add User
        </Link>
      </li>
      <li>
        <Link onClick={closeIfOpen} to="/addroom">
          Add Room
        </Link>
      </li>
      <li>
        <Link onClick={closeIfOpen} to="/rooms">
          Rooms
        </Link>
      </li>
      <li>
        <Link onClick={closeIfOpen} to="/configure">
          Configure
        </Link>
      </li>
    </>
  );

  const guessLinks = (
    <>
      <li>
        <Link onClick={closeIfOpen} to="/about">
          About
        </Link>
      </li>
      <li>
        <Link onClick={closeIfOpen} to="/register">
          Register
        </Link>
      </li>
      <li>
        <Link onClick={closeIfOpen} to="/login">
          login
        </Link>
      </li>
    </>
  );

  return (
    <nav>
      <div className="nav-center">
        <div className="nav-header">
          {/* <img src={logo} alt="logo" /> */}
          <h3>
            <i className={icon} /> {title}
          </h3>
          <button onClick={toggleLinks} className="nav-toggle">
            <FaBars />
          </button>
        </div>

        <div ref={linksContainerRef} className="links-container ">
          <ul ref={linksRef} className="links">
            {isAuthenticated && isadmin && adminLinks}
            {isAuthenticated && !isadmin && userLinks}
            {isAuthenticated ? authLinks : guessLinks}
          </ul>
        </div>

        {/* <ul className="social-icons">
          {social.map((link) => {
            const { id, url, icon } = link;
            return (
              <li key={id}>
                <a href={url}>{icon}</a>
              </li>
            );
          })}
        </ul> */}
      </div>
    </nav>
  );
};

Headermy.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Headermy.defaultProps = {
  title: "Smart Meeting Automaton",
  icon: "fas fa-id-card-alt",
};
export default Headermy;
