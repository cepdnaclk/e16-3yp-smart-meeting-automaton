import React, { useEffect, useState, useContext } from "react";
// import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./uicss.css";
import "./Room.css";
import { getDefaultNormalizer } from "@testing-library/react";

import axios from "axios";
import AlertContext from "../../context/alert/alertContext";

const data = [
  {
    roomid: 1,
    roomName: "No 1",
    status: 1,
    activeTime: "2-5",
    subject: "CO222",
    userId: "Diwanga",
  },
  {
    roomid: 2,
    roomName: "No 2",
    status: 0,
    activeTime: "2-5",
    subject: "CO422",
    userId: "Chamath",
  },
  {
    roomid: 3,
    roomName: "No 3",
    status: 1,
    activeTime: "2-5",
    subject: "CO232",
    userId: "Wishwa",
  },
];

function Rooms() {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const [meetings, setmeetings] = useState([]);

  const getdata = () => {
    axios
      .post("main/rooms/status")
      .then(function (response) {
        console.log(response.data);
        const myMeetings = response.data;

        //    console.log("room array");
        console.log(myMeetings);
        myMeetings.map((meeting) => {
          if (meeting.startTime) {
            // const dd = new Date(meeting.startTime);
            // console.log(dd.getTime().toLocaleString());
            const todate = meeting.startTime;
            var invdate = new Date(
              todate.toLocaleString("en-US", {
                timeZone: "America/Toronto",
              })
            );
            console.log("invdate");
            console.log(invdate.toISOString().slice(0, 10));

            // console.log(invdate.getHours());
            // console.log(invdate.getMinutes());
            var h = invdate.getHours();
            h = h > 9 ? h : "0" + h;
            var m = invdate.getMinutes();
            m = m > 9 ? m : "0" + m;

            //meeting.date = todate.slice(0, 10);
            meeting.date = invdate.toISOString().slice(0, 10);
            meeting.startTime = `${h}:${m}`;
            // meeting.startTime = todate.slice(11, 16);
          }
          if (meeting.endTime) {
            const toend = meeting.endTime;
            var invdate = new Date(
              toend.toLocaleString("en-US", {
                timeZone: "America/Toronto",
              })
            );
            console.log("invdate");
            console.log(invdate.toISOString().slice(0, 10));

            // console.log(invdate.getHours());
            // console.log(invdate.getMinutes());
            var h = invdate.getHours();
            h = h > 9 ? h : "0" + h;
            var m = invdate.getMinutes();
            m = m > 9 ? m : "0" + m;

            //meeting.date = todate.slice(0, 10);
            // meeting.date = invdate.toISOString().slice(0, 10);
            meeting.endTime = `${h}:${m}`;
            // meeting.startTime = todate.slice(11, 16);
          }

          //  console.log();
        });
        //  setRoomInsert({ name: "", category: "" });
        setmeetings(myMeetings);
        //    setAlertState(true);
        //setAlert("Shedule is Added", "success");
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
        setAlert("no data", "danger");
        //alert(error);
      });
  };

  const renderTableData = () => {
    return meetings.map((meetingroom, index) => {
      const {
        roomName,
        state,
        subject,
        startTime,
        endTime,
        userId,
      } = meetingroom; //destructuring
      if (startTime) {
        var duration = `${startTime}-${endTime}`;
      }
      return (
        <tr key={index}>
          <td className="tdd">{roomName}</td>
          <td className="tdd">
            {state === true ? (
              <div id="taken">IN MEETING</div>
            ) : (
              <div id="free">FREE</div>
            )}
          </td>
          <td className="tdd">{duration}</td>
          <td className="tdd">{subject}</td>
          <td className="tdd">{userId}</td>
        </tr>
      );
    });
  };
  useEffect(() => {
    getdata();
    return () => {};
  }, []);

  return (
    <>
      <div className="title-addDevice">
        <h3>Room Status</h3>
      </div>
      <div id="table-con">
        <table id="rooms">
          <tbody>
            <tr>
              <th className="table-header">Room name</th>
              <th className="table-header">Status</th>
              <th className="table-header">Duration</th>
              <th className="table-header">MeetingName</th>
              <th className="table-header">Meeting Owner</th>
            </tr>
            {renderTableData()}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Rooms;
