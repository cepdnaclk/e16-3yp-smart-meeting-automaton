import axios from "axios";
import React, { useState } from "react";
// import AlertContext from "../../context/alert/alertContext";

function AddRoom() {
  //   const alertContext = useContext(AlertContext);
  const [userInsert, setUserInsert] = useState({
    email: "",
    name: "",
  });
  const [alertstate, setAlertState] = useState(false);
  const [wrongstate, setWrongState] = useState(false);
  //   const { setAlert } = alertContext;

  const handleChange = (event) => {
    setUserInsert({
      ...userInsert,
      [event.target.name]: event.target.value,
    });
  };
  //  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/users/new", userInsert)
      .then(function (response) {
        console.log(response);
        setUserInsert({ name: "", email: "" });
        setAlertState(true);
        // setAlert("Room is Added", "success");
        setTimeout(() => {
          setAlertState(false);
        }, 3000);
      })
      .catch(function (error) {
        setWrongState(true);
        // setAlert("Room is Added", "success");
        setTimeout(() => {
          setWrongState(false);
        }, 3000);
        console.log(error);
      });
  };

  return (
    <div className="form-container">
      <form className="white" onSubmit={handleSubmit}>
        <h1>
          <span className="text-primary">Add</span> User
        </h1>
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
        <div className="input-field">
          <button className="btn btn-primary btn-block" type="submit">
            Add User
          </button>
          <div>
            {alertstate && (
              <h3 className="colorgreen room-add-alert">User is Added</h3>
            )}
          </div>
          <div>
            {wrongstate && (
              <h3 className="colorred room-add-alert">Error : User exist</h3>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
export default AddRoom;
