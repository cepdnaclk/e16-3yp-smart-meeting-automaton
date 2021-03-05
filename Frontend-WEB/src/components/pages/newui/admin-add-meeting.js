import React, { useState, useEffect } from "react";
import { lecRoomData } from "../data";

const AdminAddMeeting = () => {
  const data = [
    {
      meetingId: "1",
      userId: "e16022",
      subject: "CO227",
      startTime: "08.00 AM",
      endTime: "10.00 AM",
    },
    {
      meetingId: "2",
      userId: "e16222",
      subject: "EE286",
      startTime: "10.00 AM",
      endTime: "12.00 PM",
    },
    {
      meetingId: "3",
      userId: "e16025",
      subject: "CO324",
      startTime: "02.30 PM",
      endTime: "04.00 PM",
    },
  ];

  const [meeting, setMeeting] = useState({
    userId: "",
    subject: "",
    startTime: "",
    endTime: "",
  });

  const lecRoomName = "Lecture Room 1";
  const [lecRooms, setLecRooms] = useState(lecRoomData);

  const renderTableData = () => {
    return data.map((schedule, index) => {
      const { meetingId, userId, subject, startTime, endTime } = schedule;
      return (
        <tr key={meetingId}>
          <td className="dateSorted-meetings-table-data">{userId}</td>
          <td className="dateSorted-meetings-table-data">{subject}</td>
          <td className="dateSorted-meetings-table-data">{startTime}</td>
          <td className="dateSorted-meetings-table-data">{endTime}</td>
        </tr>
      );
    });
  };

  return (
    <>
      <section className="indent-1">
        <section className="dateSorted-meetings-section">
          <div className="admin-add-meeting-title">
            <h3>Reserved Meetings</h3>
            <h3>{lecRoomName}</h3>
          </div>
          <div className="admin-add-meeting-date">
            <label htmlFor="date">Date : </label>

            <input
              type="date"
              id="meeting-date"
              name="meeting-date"
              min="2018-01-01"
              max="2022-12-31"
            ></input>
            <button className="button-admin-add-meeting-date-search">
              Search
            </button>
          </div>
          <div>
            <table className="dateSorted-meetings-table">
              <tbody>
                <tr>
                  <th className="dateSorted-meetings-table-header">
                    Meeting Owner
                  </th>
                  <th className="dateSorted-meetings-table-header">Subject</th>
                  <th className="dateSorted-meetings-table-header">
                    Start Time
                  </th>
                  <th className="dateSorted-meetings-table-header">End Time</th>
                </tr>
                {renderTableData()}
              </tbody>
            </table>
          </div>
        </section>

        <section className="admin-add-reservation-section">
          <div className="admin-add-reservation">
            <h3>Make Reservation</h3>
          </div>
          <div className="inputs-admin-add-reservation">
            <label className="lbl-admin-add-reservation" htmlFor="appt">
              Start Time :
            </label>

            <input
              type="time"
              id="appt"
              name="appt"
              min="08:00"
              max="18:00"
              required
            ></input>
          </div>
          <div className="inputs-admin-add-reservation">
            <label className="lbl-admin-add-reservation" htmlFor="appt">
              End Time :
            </label>

            <input
              type="time"
              id="appt"
              name="appt"
              min="08:00"
              max="18:00"
              required
            ></input>
          </div>
          <div className="inputs-admin-add-reservation">
            <label className="lbl-admin-add-reservation" htmlFor="userId">
              Meeting Owner :{" "}
            </label>
            <input
              type="userId"
              id="userId"
              name="userId"
              value={meeting.userId}
            />
          </div>
          <div className="inputs-admin-add-reservation">
            <label className="lbl-admin-add-reservation" htmlFor="subject">
              Subject :{" "}
            </label>
            <input
              type="subject"
              id="subject"
              name="subject"
              value={meeting.subject}
            />
          </div>
          <button className="btn">ADD</button>
        </section>
      </section>
    </>
  );
};

export default AdminAddMeeting;
