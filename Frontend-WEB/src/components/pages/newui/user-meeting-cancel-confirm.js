import React, { useState } from "react";

const UserMeetingCancelConfirm = () => {
  const [devices, setDevices] = useState([]);
  const [data, setData] = useState({
    roomName: "Lecture Room 1",
    date: "02/03/2021",
    startTime: "08.00 AM",
    endTime: "10.00 PM",
    subject: "CO528",
  });

  const handleChange = (e) => {};

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="title-addDevice">
        <h3>Confirm Meeting Cancellation</h3>
      </div>
      <div className="user-reserve-confirm-info">
        <h4>{data.subject}</h4>
        <h4>Date : {data.date}</h4>
        <h4>
          Duration : {data.startTime} - {data.endTime}
        </h4>
        <h4>{data.roomName}</h4>

        <div>
          <button className="btn-confirm" type="submit" onClick={handleSubmit}>
            Confirm
          </button>
          <button className="btn-cancel">Back to My Meetings</button>
        </div>
      </div>
    </>
  );
};

export default UserMeetingCancelConfirm;
