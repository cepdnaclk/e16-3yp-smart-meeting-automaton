import React, { useState, useEffect } from "react";
import { lecRoomData } from "../data";

const RoomsDashBoard = () => {
  const [lecRooms, setLecRooms] = useState(lecRoomData);

  return (
    <>
      <article>
        <div className="title-room">
          <h2>Meeting Rooms</h2>
          <button className="button-addroom">Add Meeting Room</button>
        </div>

        {lecRooms.map((lecRoom, index) => {
          const { id, name } = lecRoom;
          return (
            <div className="room-dashboard-div-item" key={id}>
              <h4>{name}</h4>
              <button className="button-config">Config</button>
              <button className="button-reserve">Reserve</button>
            </div>
          );
        })}
      </article>
    </>
  );
};

export default RoomsDashBoard;
