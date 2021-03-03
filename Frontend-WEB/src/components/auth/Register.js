import React, { useState, useContext, useEffect } from "react";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";

export const Register = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { register, error, clearErrors, isAuthenticated } = authContext;
  const { setAlert } = alertContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }
    if (error === "You are not Authorize to system.Please inform to Admin") {
      setAlert(error, "danger");
      clearErrors();
    }
    console.log(error);
    if (error === "You are Registerd Please Loging to system") {
      setAlert(error, "success");
      props.history.push("/login");
      clearErrors();
    }
    //eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    workerId: "",
    onetimeId: "",
    password: "",
    password2: "",
    phone: "",
    address1: "",
    address2: "",
    address3: "",
  });

  const {
    workerId,
    onetimeId,
    password,
    password2,
    phone,
    address1,
    address2,
    address3,
  } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (workerId === "" || onetimeId === "" || password === "") {
      setAlert("Please enter all fields", "danger");
    } else if (password !== password2) {
      setAlert("Password do not match", "danger");
    } else {
      register({
        workerId,
        onetimeId,
        password,
        address1,
        address2,
        address3,
        phone,
        //   password2,
      });
    }
  };

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="workerId">WorkerID</label>
          <input
            type="text"
            name="workerId"
            value={workerId}
            onChange={onChange}
          />
        </div>
        {/* <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} onChange={onChange} />
        </div> */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            minLength="5"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={onChange}
            minLength="5"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            name="phone"
            value={phone}
            onChange={onChange}
            minLength="5"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">address1</label>
          <input
            type="text"
            name="address1"
            value={address1}
            onChange={onChange}
            minLength="5"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">address2</label>
          <input
            type="text"
            name="address2"
            value={address2}
            onChange={onChange}
            minLength="5"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">address3</label>
          <input
            type="text"
            name="address3"
            value={address3}
            onChange={onChange}
            minLength="5"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">onetimeId</label>
          <input
            type="password"
            name="onetimeId"
            value={onetimeId}
            onChange={onChange}
            minLength="5"
          />
        </div>
        <input
          type="submit"
          value="Register"
          className="btn btn-primary btn-block"
        ></input>
      </form>
    </div>
  );
};

export default Register;
