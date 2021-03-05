import axios from "axios";
import React, { useState, useEffect } from "react";
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

// const renderTableData = () => {
//   return rooms.map((meetingRoom, index) => {
//     const { _id, roomName, lastConfigDate } = meetingRoom;
//     return (
//       <tr key={roomName}>
//         <td className="config-divices-table-data">{roomName}</td>
//         <td className="config-divices-table-data">{lastConfigDate}</td>
//         <td className="config-divices-table-data">
//           <Link
//             type="button"
//             className="button-reserve"
//             to={`/configure/room/${meetingRoom._id}/${meetingRoom.roomName}`}
//           >
//             Configure
//           </Link>
//         </td>
//         <td className="config-divices-table-data">
//           <Link
//             type="button"
//             className="button-config"
//             to={`/addmeeting/room/${meetingRoom._id}/${meetingRoom.roomName}`}
//           >
//             Update
//           </Link>
//         </td>
//       </tr>
//     );
//   });
// };

function RoomsDashBoardNew() {
  const [rooms, setRooms] = useState([]);

  const getallrooms = () => {
    axios.get("/main/roomall/").then((responce) => {
      const roomss = responce.data;
      console.log(roomss);
      setRooms(roomss);
    });
  };

  const renderTableData = () => {
    return rooms.map((meetingRoom, index) => {
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
            <Link
              type="button"
              className="button-config"
              to={`/addmeeting/room/${meetingRoom._id}/${meetingRoom.roomName}`}
            >
              Update
            </Link>
          </td>
        </tr>
      );
    });
  };
  useEffect(() => {
    getallrooms();
  }, []);

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
            {renderTableData(rooms)}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default RoomsDashBoardNew;
