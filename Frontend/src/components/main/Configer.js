import axios from "axios";
import React, { useState, useEffect } from "react";
import "./uicss.css";
import "./Room.css";

function Configure() {
  const [rooms, getRooms] = useState([]);

  // const renderTableData = (rooms) => {
  //   return rooms.map((room, index) => {
  //     const {
  //       _id,
  //       name,
  //       status,
  //       lastConfigDate, // 1 room eka config karala
  //     } = room; //destructuring
  //     // const date = new Date(lastConfigDate);
  //     // = date.getMonth();
  //     // console.log(dates);
  //     // room = { ...room, lastConfigDate: date.toDateString() };
  //     return (
  //       <tr key={_id}>
  //         <td className="tdd">{name}</td>
  //         <td className="tdd">{}</td>

  //         <td>
  //           <button
  //             className={
  //               status === 1
  //                 ? "NotConfigured"
  //                 : status === 2
  //                 ? "configured"
  //                 : "BreakDown"
  //             }
  //           >
  //             Configure
  //           </button>
  //         </td>
  //       </tr>
  //     );
  //   });
  // };
  const getallrooms = () => {
    axios.get("/api/room").then((responce) => {
      const rooms = responce.data;
      console.log(rooms);
      getRooms(rooms);
    });
  };

  useEffect(() => {
    getallrooms();
  }, []);

  return (
    <div id="table-con">
      <table id="rooms">
        <tbody>
          <tr>
            <th className="table-header">Room name</th>
            <th className="table-header">Last Config.Date</th>
            <th className="table-header">Config/Status</th>
          </tr>
          {rooms.map((room) => {
            const {
              _id,
              name,
              status,
              lastConfigDate, // 1 room eka config karalah
            } = room; //destructuring

            room = { ...room, lastConfigDate: "qwqw" };
            return (
              <tr key={_id}>
                <td className="tdd">{name}</td>
                <td className="tdd">{lastConfigDate}</td>

                <td>
                  <button
                    className={
                      status === 1
                        ? "NotConfigured"
                        : status === 2
                        ? "configured"
                        : "BreakDown"
                    }
                  >
                    Configure
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default Configure;
