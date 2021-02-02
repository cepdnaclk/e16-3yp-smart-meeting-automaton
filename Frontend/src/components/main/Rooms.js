import React from "react";
// import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./uicss.css";
import "./Room.css";

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
