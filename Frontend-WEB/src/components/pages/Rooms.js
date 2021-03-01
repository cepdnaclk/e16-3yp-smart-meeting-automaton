import React from "react";
// import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./uicss.css";
import "./Room.css";
const data = [
  {
    roomid: 1,
    roomname: "No 1",
    status: 1,
    activeTime: "2-5",
    meetingName: "CO222",
    meetingOwner: "Diwanga",
  },
  {
    roomid: 2,
    roomname: "No 2",
    status: 0,
    activeTime: "2-5",
    meetingName: "CO422",
    meetingOwner: "Chamath",
  },
  {
    roomid: 3,
    roomname: "No 3",
    status: 1,
    activeTime: "2-5",
    meetingName: "CO232",
    meetingOwner: "Wishwa",
  },
];

const renderTableData = () => {
  return data.map((room, index) => {
    const {
      roomid,
      roomname,
      status,
      activeTime,
      meetingName,
      meetingOwner,
    } = room; //destructuring
    return (
      <tr key={roomid}>
        <td className="tdd">{roomname}</td>
        <td className="tdd">
          {status === 1 ? (
            <div id="taken">IN MEETING</div>
          ) : (
            <div id="free">FREE</div>
          )}
        </td>
        <td className="tdd">{activeTime}</td>
        <td className="tdd">{meetingName}</td>
        <td className="tdd">{meetingOwner}</td>
      </tr>
    );
  });
};

function Rooms() {
  return (
    <div id="table-con">
      <table id="rooms">
        <tbody>
          <tr>
            <th className="table-header">Room name</th>
            <th className="table-header">Status</th>
            <th className="table-header">ActiveTime</th>
            <th className="table-header">MeetingName</th>
            <th className="table-header">meetingOwner</th>
          </tr>
          {renderTableData()}
        </tbody>
      </table>
    </div>
  );
}

export default Rooms;
