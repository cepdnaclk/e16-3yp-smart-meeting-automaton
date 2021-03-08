import axios from "axios";
import React, { useState } from "react";
// import AlertContext from "../../context/alert/alertContext";

function AddRoom() {
  //   const alertContext = useContext(AlertContext);
  const [roomInsert, setRoomInsert] = useState({
    category: "",
    roomName: "",
    controlUnitId: "",
    acId: [],
    projectorId: [],
  });
  const [wrongstate, setWrongState] = useState(false);
  const [alertstate, setAlertState] = useState(false);
  //   const { setAlert } = alertContext;

  const handleChange = (event) => {
    console.log(roomInsert.controlUnitId);
    setRoomInsert({
      ...roomInsert,
      [event.target.name]: event.target.value,
    });
  };
  //  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);

  const handleSubmit = (e) => {
    console.log(roomInsert.controlUnitId);
    e.preventDefault();

    axios
      // .post("/api/room/", roomInsert)
      .post("/main/add/room/", roomInsert)
      .then(function (response) {
        console.log(response);
        setRoomInsert({ roomName: "", category: "", controlUnitId: "" });
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
          <span className="text-primary">Add</span> Room
        </h1>
        <div className="form-group">
          <label htmlFor="Name">Room Name</label>
          <input
            type="text"
            name="roomName"
            value={roomInsert.roomName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            name="category"
            value={roomInsert.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Control Unit ID</label>
          <input
            type="text"
            name="controlUnitId"
            value={roomInsert.controlUnitId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-field">
          <button className="btn btn-primary btn-block" type="submit">
            Add Room
          </button>
        </div>
        <div>
          {alertstate && (
            <h3 className=" colorgreen room-add-alert">Room is added</h3>
          )}
        </div>
        <div>
          {wrongstate && <h3 className="colorred room-add-alert">Error</h3>}
        </div>
      </form>
    </div>
  );
}
export default AddRoom;
