import React from "react";
import RoomItem from "./RoomItem";
function RoomList({ rooms }) {
  return (
    <div>
      {rooms.map((room) => {
        return <RoomItem key={room.id} {...room} />;
      })}
    </div>
  );
}

export default RoomList;
