import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../../context/auth/authContext";
import AlertContext from "../../../context/alert/alertContext";
function UserMyMeetings() {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout, user, isadmin } = authContext;
  const userId = user.userId;
  console.log(user.userId);
  const [meetings, setMeetings] = useState([]);
  const [callback, setcallback] = useState(false);

  const getallmeetings = (userr) => {
    console.log(userr.userId);
    // axios.get("/main/roomall/").then((responce) => {
    axios
      .post("/main/get/schedule/user/all/", { userId: userr.userId })
      .then((responce) => {
        const myMeetings = responce.data;

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

        const { startTime } = myMeetings;

        console.log(startTime);

        setMeetings(myMeetings);
      })
      .catch(function (error) {
        //    setWrongState(true);
        setAlert("Server Error. Please Retry", "success");
        // setTimeout(() => {
        //  setWrongState(false);
        // }, 3000);
        // alert(error);
      });
  };
  const cancelMeeting = (id) => {
    console.log(id.id);

    axios
      .delete(`/main/delete/schedule/${id.id}`)
      .then(function (response) {
        console.log("diwanga");
        console.log(response.message);
        console.log(response);
        //  setRoomInsert({ name: "", category: "" });
        //    setAlertState(true);
        setAlert("Meeting is Canceled", "success");
        setcallback(!callback);
        // getallmeetings();
        // setTimeout(() => {
        //   setAlertState(false);
        // }, 3000);
        // callBack();
      })
      .catch(function (error) {
        //    setWrongState(true);
        setAlert("Meeting is Not Deleted", "success");
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
    getallmeetings({ userId: userId });
  }, [userId, callback]);
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
