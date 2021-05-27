import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
    // axios.get("/main/roomall/").then((responce) => {
    axios.get("/main/table/").then((responce) => {
      const roomss = responce.data;
      console.log("room array");
      console.log(roomss);

      roomss.map((room) => {
        var confdate = room.lastConfigDate;
        confdate = confdate.slice(0, 10);
        room.lastConfigDate = confdate;
        console.log(room.lastConfigDate);
      });

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
              Reserve
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
