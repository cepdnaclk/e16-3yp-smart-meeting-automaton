import React, { useState, useEffect, useContext } from "react";
import { lecRoomData } from "../data";
import "./index.css";
import axios from "axios";

import AlertContext from "../../../context/alert/alertContext";
import { ConfirmationNumber } from "@material-ui/icons";

const AddMeeting = () => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const data = ["AC01", "PR01", "AC02", "PR02"];

  const lecRoomName = "Lecture Room 1";
  const [lecRooms, setLecRooms] = useState([]);

  const [findInfo, setfindInfo] = useState({
    // userId: "",
    startTime: "",
    endTime: "",
    date: "",
  });
  const { date, startTime, endTime } = findInfo;

  const addmeetingfun = (e) => {
    setfindInfo({ ...findInfo, [e.target.name]: e.target.value });
  };
  console.log(findInfo);

  const getrooms = () => {
    // const roomId = params._id;
    //   console.log(`params id ${params._id}`);
    console.log(`xzczxczxczxczxcxz`);
    //  console.log(`GETMEETINGS ${searchDate}`);
    axios
      .post("/main/free/rooms/custom", {
        date,
        startTime,
        endTime,
      }) //date yawanna
      .then(function (response) {
        console.log("CHALI");
        console.log(response);
        setLecRooms(response.data);

        //  setRoomInsert({ name: "", category: "" });
        //    setAlertState(true);
        setAlert("meetings come", "success");
        // setTimeout(() => {
        //   setAlertState(false);
        // }, 3000);
        //     callBack();
      })
      .catch(function (error) {
        //    setWrongState(true);
        // setAlert("Room is Added", "success");
        // setTimeout(() => {
        //  setWrongState(false);
        // }, 3000);
        setAlert("meetings not come", "danger");
        alert(error);
      });
  };

  const handelConfirmation = (data) => {
    console.log(data.roomName);
    console.log(data.date);
    console.log(data.endTime);
    console.log(data.startTime);
    console.log(data);

    axios
      .post("/main/add", data)
      .then(function (response) {
        console.log(response);
        //  setRoomInsert({ name: "", category: "" });
        //    setAlertState(true);
        setAlert("Room is Added", "success");
        // setTimeout(() => {
        //   setAlertState(false);
        // }, 3000);
      })
      .catch(function (error) {
        //    setWrongState(true);
        // setAlert("Room is Added", "success");
        // setTimeout(() => {
        //  setWrongState(false);
        // }, 3000);
        alert(error);
      });
  };
  return (
    <>
      <div className="title-add-meeting">
        <h2>Add Meeting</h2>
      </div>

      <div>
        <div className="date-time-search">
          <label htmlFor="appt">Date :</label>

          <input
            type="date"
            id="start"
            name="date"
            min="2018-01-01"
            max="2022-12-31"
            onChange={addmeetingfun}
          ></input>

          <label htmlFor="appt">Start Time :</label>

          <input
            type="time"
            id="appt"
            name="startTime"
            min="08:00"
            max="18:00"
            onChange={addmeetingfun}
            required
          ></input>
          <label htmlFor="appt">End Time :</label>

          <input
            type="time"
            id="appt"
            name="endTime"
            min="08:00"
            max="18:00"
            onChange={addmeetingfun}
            required
          ></input>
          <button onClick={getrooms}>Search</button>
        </div>
      </div>

      {lecRooms.map((lecRoom, index) => {
        const { id, roomName } = lecRoom;
        return (
          <div className="add-meeting-meeting-rooms" key={id}>
            <h4>{roomName}</h4>
            <button
              onClick={() => {
                handelConfirmation({ roomName, startTime, endTime, date });
              }}
            >
              Reserve
            </button>
          </div>
        );
      })}
    </>
  );
};

export default AddMeeting;
