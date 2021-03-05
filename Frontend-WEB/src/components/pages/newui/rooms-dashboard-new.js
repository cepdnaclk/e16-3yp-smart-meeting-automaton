import React from "react";
import { Link } from "react-router-dom";

const data = [
  {
    _id: " 011",
    roomName: "Lecture Room 1",
    lastConfigDate: "2020/03/05",
  },

  {
    _id: " 012",
    roomName: "Seminar Room 1",
    lastConfigDate: "2020/03/10",
  },
  {
    _id: " 013",
    roomName: "Lecture Room 14",
    lastConfigDate: "2020/04/12",
  },
];

const renderTableData = () => {
  return data.map((meetingRoom, index) => {
    const { _id, roomName, lastConfigDate } = meetingRoom;
    return (
      <tr key={roomName}>
        <td className="config-divices-table-data">{roomName}</td>
        <td className="config-divices-table-data">{lastConfigDate}</td>
        <td className="config-divices-table-data">
          <Link
            type="button"
            className="button-reserve"
            to={`/configure/room/${meetingRoom._id}/${meetingRoom.roomName}`}
          >
            Configure
          </Link>
        </td>
        <td className="config-divices-table-data">
          <button className="button-config">Update</button>
        </td>
      </tr>
    );
  });
};

function RoomsDashBoardNew() {
  return (
    <>
      <div className="title-room">
        <h2>Meeting Rooms</h2>
        <button className="button-addroom">Add Meeting Room</button>
      </div>
      <div className="config-divices-table-div">
        <table className="config-divices-table">
          <tbody>
            <tr>
              <th className="config-divices-table-header">Meeting Room Name</th>
              <th className="config-divices-table-header">Last Config Date</th>
              <th className="config-divices-table-header">Configuration</th>
              <th className="config-divices-table-header">Reservation</th>
            </tr>
            {renderTableData()}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default RoomsDashBoardNew;
