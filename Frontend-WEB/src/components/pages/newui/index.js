import React, { useState, useReducer } from "react";
import RoomsDashBoard from "./rooms-dashboard";
import RoomsDashBoardNew from "./rooms-dashboard-new";
import RoomsConfig from "./rooms-config";
import AddDevice from "./add-device";
import AddMeeting from "./add-meeting";
import UserReserveConfirm from "./user-reserve-confirm";
import UserMyMeetings from "./my-meetings";
import UserMeetingCancelConfirm from "./user-meeting-cancel-confirm";
import AdminAddMeeting from "./admin-add-meeting";
import Mymeetings from "./my-meetings";

// reducer function

const Index = () => {
  return (
    <>
      <RoomsConfig />
    </>
  );
};

export default Index;
