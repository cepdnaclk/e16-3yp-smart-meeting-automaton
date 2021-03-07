// import "date-fns";
// import React from "react";
// import Grid from "@material-ui/core/Grid";
// import DateFnsUtils from "@date-io/date-fns";
// import {
//   MuiPickersUtilsProvider,
//   KeyboardTimePicker,
//   KeyboardDatePicker,
// } from "@material-ui/pickers";
// //

import React, { useState, useContext } from "react";
import { lecRoomData } from "../data";
import { useParams } from "react-router-dom";
import axios from "axios";
import AlertContext from "../../../context/alert/alertContext";

//import AuthContext from "../../../context/auth/authContext";

const AdminAddMeeting = () => {
  ////const authContext = useContext(AuthContext);
  // const { isAuthenticated, logout, user, isadmin } = authContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const [searchDate, setsearchDate] = useState("");
  //new Date().toLocaleDateString().split("-").reverse().join("-")
  const params = useParams();
  const [meetings, setmeetings] = useState([]);
  // const data = [
  //   {
  //     meetingId: "1",
  //     userId: "e16022",
  //     subject: "CO227",
  //     startTime: "08.00 AM",
  //     endTime: "10.00 AM",
  //   },
  //   {
  //     meetingId: "2",
  //     userId: "e16222",
  //     subject: "EE286",
  //     startTime: "10.00 AM",
  //     endTime: "12.00 PM",
  //   },
  //   {
  //     meetingId: "3",
  //     userId: "e16025",
  //     subject: "CO324",
  //     startTime: "02.30 PM",
  //     endTime: "04.00 PM",
  //   },
  // ];
  const datePicker = (e) => {
    console.log(`in FUNCTION ${searchDate}`);
    setsearchDate(e.target.value);
    console.log(`EV VALL ${e.target.value}`);
  };

  const getMeetings = () => {
    console.log(`GETMEETINGS ${searchDate}`);
    axios
      .post("/main/get/schedule/date", {
        date: searchDate,
        roomName: params.roomName,
      })
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
        setAlert("Shedule is Not added", "danger");
        alert(error);
      });
  };

  const reservemeeting = () => {
    // const roomId = params._id;
    console.log(`params id ${params._id}`);
    console.log(`xzczxczxczxczxcxz`);
    //  console.log(`GETMEETINGS ${searchDate}`);
    axios
      .post("/main/add/schedule/", {
        userId,
        date: searchDate,
        startTime,
        endTime,
        subject,
        roomName: params.roomName,
      }) //date yawanna
      .then(function (response) {
        console.log(response);

        //  setRoomInsert({ name: "", category: "" });
        //    setAlertState(true);
        setAlert("Shedule is Added", "success");
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
        setAlert("Shedule is Not added", "danger");
        alert(error);
      });
  };

  console.log(`serchadte ${searchDate}`);
  const [onemeeting, setMeeting] = useState({
    userId: "",
    subject: "",
    startTime: "",
    endTime: "",
  });
  const { userId, subject, startTime, endTime } = onemeeting;
  // const lecRoomName = "Lecture Room 1";
  // const [lecRooms, setLecRooms] = useState(lecRoomData);

  const addmeetingfun = (e) => {
    setMeeting({ ...onemeeting, [e.target.name]: e.target.value });
  };
  console.log(startTime, endTime, subject, endTime);
  const renderTableData = () => {
    return meetings.map((schedule, index) => {
      const { meetingId, userId, subject, startTime, endTime } = schedule;
      return (
        <tr key={meetingId}>
          <td className="dateSorted-meetings-table-data">{userId}</td>
          <td className="dateSorted-meetings-table-data">{subject}</td>
          <td className="dateSorted-meetings-table-data">{startTime}</td>
          <td className="dateSorted-meetings-table-data">{endTime}</td>
        </tr>
      );
    });
  };

  return (
    <>
      <section className="indent-1">
        <section className="dateSorted-meetings-section">
          <div className="admin-add-meeting-title">
            <h3>Reserved Meetings</h3>
            <h3>{params.roomName}</h3>
          </div>
          <div className="admin-add-meeting-date">
            <label htmlFor="date">Date : </label>

            <input
              type="date"
              //placeholder={"asdasd"}
              id="meeting-date"
              required
              pattern="\d{2}-\d{2}-\d{4}"
              name="meeting-date"
              min="2018-01-01"
              max="2022-12-31"
              value={searchDate}
              onChange={datePicker}
            ></input>
            <button
              onClick={getMeetings}
              className="button-admin-add-meeting-date-search"
            >
              Search
            </button>
          </div>
          <div>
            <table className="dateSorted-meetings-table">
              <tbody>
                <tr>
                  <th className="dateSorted-meetings-table-header">
                    Meeting Owner
                  </th>
                  <th className="dateSorted-meetings-table-header">Subject</th>
                  <th className="dateSorted-meetings-table-header">
                    Start Time
                  </th>
                  <th className="dateSorted-meetings-table-header">End Time</th>
                </tr>
                {renderTableData()}
              </tbody>
            </table>
          </div>
        </section>

        <section className="admin-add-reservation-section">
          <div className="admin-add-reservation">
            <h3>Make Reservation</h3>
          </div>
          <div className="inputs-admin-add-reservation">
            <label className="lbl-admin-add-reservation" htmlFor="appt">
              Start Time :
            </label>

            <input
              type="time"
              id="appt"
              name="startTime"
              min="08:00"
              max="18:00"
              required
              onChange={addmeetingfun}
              // value={startTime}
            ></input>
          </div>
          <div className="inputs-admin-add-reservation">
            <label className="lbl-admin-add-reservation" htmlFor="appt">
              End Time :
            </label>

            <input
              type="time"
              id="appt"
              name="endTime"
              min="08:00"
              max="18:00"
              required
              onChange={addmeetingfun}
              value={endTime}
            ></input>
          </div>
          <div className="inputs-admin-add-reservation">
            <label className="lbl-admin-add-reservation" htmlFor="userId">
              Meeting Owner :{" "}
            </label>
            <input
              type="userId"
              id="userId"
              name="userId"
              value={userId}
              onChange={addmeetingfun}
            />
          </div>
          <div className="inputs-admin-add-reservation">
            <label className="lbl-admin-add-reservation" htmlFor="subject">
              Subject :{" "}
            </label>
            <input
              type="subject"
              id="subject"
              name="subject"
              value={subject}
              onChange={addmeetingfun}
              // disabled={true}
            />
          </div>
          <button onClick={reservemeeting} className="btn-red">
            ADD
          </button>
        </section>
      </section>
    </>
  );
};

export default AdminAddMeeting;
