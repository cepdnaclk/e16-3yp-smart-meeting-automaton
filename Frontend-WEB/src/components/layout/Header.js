import React, { useState, Fragment, useContext } from "react";
// import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import "./header.css";

// import ContactContext from "../../context/contact/contactContext";
// import {
//   Collapse,
//   Navbar,
//   NavbarToggler,
//   NavbarBrand,
//   Nav,
//   NavItem,
//   NavLink,
//   UncontrolledDropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
//   NavbarText,
// } from "reactstrap";
import { Nav, NavDropdown, Navbar } from "react-bootstrap";

// import { Button } from "reactstrap";

export const Header = ({ title, icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  const authContext = useContext(AuthContext);

  // const contactContext = useContext(ContactContext);

  const { isAuthenticated, logout, user, isadmin } = authContext;
  // const { clearContact } = contactContext;

  const onLogout = () => {
    logout();
  };

  const authLinks = (
    <Fragment>
      <div className="login-con">
        <li>Hello {user && user.name}</li>
        <li>
          <a onClick={onLogout} href="#!">
            <i className="fas fa-sign-out-alt"></i>{" "}
            <span className="hide-sm">Logout</span>
          </a>
        </li>
      </div>
    </Fragment>
  );
  const userLinks = (
    <>
      <li class="nav-item">
        <Nav.Link href="#meetings"> MEETINGS</Nav.Link>
      </li>
    </>
  );
  const adminLinks = (
    <>
      <Nav.Link href="#features"> DASHBORD</Nav.Link>
      <Nav.Link href="#features"> DASHBORD</Nav.Link>
      <Nav.Link href="#features"> DASHBORD</Nav.Link>
      <Nav.Link href="#features"> ADD USER</Nav.Link>
    </>
  );

  const guessLinks = (
    <Fragment>
      <div className="login-con">
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </div>
    </Fragment>
  );

  return (
    <Navbar className="asd" collapseOnSelect expand="lg" variant="dark">
      <Navbar.Brand href="#home">Smart meeting Automaton</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          {/* <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link> */}
          {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown> */}
          {/* </Nav>
        <Nav> */}
          {/* <Nav.Link href="#deets">More deets</Nav.Link>
          <Nav.Link eventKey={1} href="#memes">
            Dank memes
          </Nav.Link> */}
          {isAuthenticated && isadmin && adminLinks}
          {isAuthenticated && !isadmin && userLinks}
          {isAuthenticated ? authLinks : guessLinks}
        </Nav>
      </Navbar.Collapse>
    </Navbar>

    // <div className="navbar bg-primary">
    //   <h1>
    //     <i className={icon} /> {title}
    //   </h1>
    //   <ul>
    //     {/* {isadmin ? adminLinks : null} */}
    //     {isAuthenticated && isadmin && adminLinks}
    //     {isAuthenticated && !isadmin && userLinks}
    //     {isAuthenticated ? authLinks : guessLinks}
    //   </ul>
    // </div>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Header.defaultProps = {
  title: "Smart Meeting Automaton",
  icon: "fas fa-chalkboard-teacher colorize",
};

export default Header;
