import React, { useState, useEffect } from "react";
import axios from "axios";

const data = [
  {
    meetingId: "1",
    subject: "CO222",
    roomName: "Lecture Room 1",
    date: "2021/03/05",
    startTime: "08.00 AM",
    endTime: "10.00 AM",
  },

  {
    meetingId: "1",
    subject: "CO225",
    roomName: "Seminar Room 1",
    date: "2021/03/10",
    startTime: "11.00 AM",
    endTime: "11.55 AM",
  },
  {
    meetingId: "1",
    subject: "EE385",
    roomName: "Lecture Room 14",
    date: "2021/04/12",
    startTime: "02.00 PM",
    endTime: "04.00 PM",
  },
];

function UserMyMeetings() {
  const [meetings, setMeetings] = useState([]);

  const getallmeetings = () => {
    // axios.get("/main/roomall/").then((responce) => {
    axios.get("/main/diwanga/").then((responce) => {
      const roomss = responce.data;
      console.log("room array");
      console.log(roomss);
      setMeetings(roomss);
    });
  };
  const cancelMeeting = (id) => {
    console.log(id.id);

    axios
      .post("/main/batha/", { _id: id.id })
      .then(function (response) {
        console.log(response);
        //  setRoomInsert({ name: "", category: "" });
        //    setAlertState(true);
        alert("Room is Added", "success");
        // setTimeout(() => {
        //   setAlertState(false);
        // }, 3000);
        // callBack();
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
  const renderTableData = () => {
    return meetings.map((meeting, index) => {
      const { _id, subject, roomName, date, startTime, endTime } = meeting;
      return (
        <tr key={index}>
          <td className="my-meetings-table-data">{subject}</td>

          <td className="my-meetings-table-data">{startTime}</td>
          <td className="my-meetings-table-data">{endTime}</td>
          <td className="my-meetings-table-data">{date}</td>
          <td className="my-meetings-table-data">{roomName}</td>
          <td className="my-meetings-table-data">
            <button
              onClick={() => {
                cancelMeeting({ id: _id });
              }}
              className="btn-meeting-cancel"
            >
              Cancel
            </button>
          </td>
        </tr>
      );
    });
  };
  useEffect(() => {
    getallmeetings();
  }, []);
  return (
    <>
      <div className="title-addDevice">
        <h3>My Meetings</h3>
      </div>
      <div className="table-div">
        <table className="my-meetings-table">
          <tbody>
            <tr>
              <th className="my-meetings-table-header">Subject</th>
              <th className="my-meetings-table-header">Start Time</th>
              <th className="my-meetings-table-header">End Time</th>
              <th className="my-meetings-table-header">Date</th>
              <th className="my-meetings-table-header">Room Name</th>
              <th className="my-meetings-table-header">Cancellation</th>
            </tr>
            {renderTableData()}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default UserMyMeetings;
