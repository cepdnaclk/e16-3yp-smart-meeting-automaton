import React, { useState, useEffect } from "react";
import { lecRoomData } from "../data";
import "./index.css";
const AddMeeting = () => {
  const data = ["AC01", "PR01", "AC02", "PR02"];

  const lecRoomName = "Lecture Room 1";
  const [lecRooms, setLecRooms] = useState(lecRoomData);

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
            name="trip-start"
            min="2018-01-01"
            max="2022-12-31"
          ></input>

          <label htmlFor="appt">Start Time :</label>

          <input
            type="time"
            id="appt"
            name="appt"
            min="08:00"
            max="18:00"
            required
          ></input>
          <label htmlFor="appt">End Time :</label>

          <input
            type="time"
            id="appt"
            name="appt"
            min="08:00"
            max="18:00"
            required
          ></input>
          <button>Search</button>
        </div>
      </div>

      {lecRooms.map((lecRoom, index) => {
        const { id, name } = lecRoom;
        return (
          <div className="add-meeting-meeting-rooms" key={id}>
            <h4>{name}</h4>
            <button>Reserve</button>
          </div>
        );
      })}
    </>
  );
};

export default AddMeeting;
