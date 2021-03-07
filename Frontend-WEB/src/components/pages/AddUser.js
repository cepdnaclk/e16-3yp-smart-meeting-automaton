import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import AlertContext from "../../context/alert/alertContext";
// import UserContext from "../../context/alert/alertContext";
import UserContext from "../../context/user/userContext";

function AddRoom() {
  const alertContext = useContext(AlertContext);
  const userContext = useContext(UserContext);
  const { error, clearuserErrors, addUser } = userContext;
  const { setAlert } = alertContext;
  const [userInsert, setUserInsert] = useState({
    workerId: "",
    onetimeId: "",
    email: "",
    name: "",
  });
  const { workerId, onetimeId, email, name } = userInsert;
  // const [onetimeid, setonetimeid] = useState("");
  // const [alertstate, setAlertState] = useState(false);
  // const [wrongstate, setWrongState] = useState(false);
  //   const { setAlert } = alertContext;

  useEffect(() => {
    if (error === "User already exists.") {
      setAlert(error, "danger");
      clearuserErrors();
    }
    if (error === "User Added") {
      setAlert(error, "success");
      clearuserErrors();
    }
    //eslint-disable-next-line
  }, [error]);

  const handleChange = (event) => {
    setUserInsert({
      ...userInsert,
      [event.target.name]: event.target.value,
    });
  };
  //  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);

  const genNewid = () => {
    var d = new Date();
    var n = d.valueOf();
    setUserInsert({ ...userInsert, onetimeId: n });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("sdsdfsdffewf i i i ");
    if (workerId === "" || onetimeId === "" || email === "" || name === "") {
      setAlert("Please in all fields", "danger");
    } else {
      console.log(workerId);
      addUser({
        workerId,
        email,
        name,
        onetimeId,
      });
    }
    // axios
    //   .post("/api/newuser/", userInsert)
    //   .then(function (response) {
    //     console.log(response);
    //     //  setUserInsert({ name: "", email: "" });
    //     //   setAlertState(true);
    //     setAlert("Room is Added", "success");
    //     // setTimeout(() => {
    //     //   setAlertState(false);
    //     // }, 3000);
    //   })
    //   .catch(function (error) {
    //     //  setWrongState(true);
    //     // setAlert("Room is Added", "success");
    //     // setTimeout(() => {
    //     //   setWrongState(false);
    //     // }, 3000);

    //     console.log(error);
    //   });
  };

  return (
    <div className="form-container">
      <form className="white" onSubmit={handleSubmit}>
        <h1>
          <span className="text-primary">Add</span> User
        </h1>
        <div className="form-group">
          <label htmlFor="workerId">Username</label>
          <input
            type="text"
            name="workerId"
            value={userInsert.workerId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="Name">Name</label>
          <input
            type="text"
            name="name"
            value={userInsert.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={userInsert.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="onetimeId">OnetimeId</label>
          <input
            type="text"
            name="onetimeId"
            value={userInsert.onetimeId}
            onChange={handleChange}
            disabled={true}
            required
          />
        </div>

        <div className="form-group-btn-gen">
          <button type="button" className="form-btn-success" onClick={genNewid}>
            Generate
          </button>
        </div>
        <div className="input-field" id="adduserid">
          <button className="btn btn-primary btn-block" type="submit">
            Add User
          </button>
          {/* <div>
            {alertstate && (
              <h3 className="colorgreen room-add-alert">User is Added</h3>
            )}
          </div>
          <div>
            {wrongstate && (
              <h3 className="colorred room-add-alert">Error : User exist</h3>
            )}
          </div> */}
        </div>
      </form>
    </div>
  );
}
export default AddRoom;
