import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import axios from "axios";
import AlertContext from "../../context/alert/alertContext";

export default function MeetingAddModal(props) {
  const alertContext = useContext(AlertContext);
  const [open, setOpen] = React.useState(false);
  const { setAlert } = alertContext;
  const { user, start, end, dateto, roomName2 } = props;
  console.log("i am in modal");
  console.log(user.iserId);

  const [meetingData, setMeetingData] = useState({
    userId: "",
    startTime: "",
    endTime: "",
    date: "",
    roomName: "",
    subject: "",
  });

  //   useEffect(() => {
  //     setDevice({ ...device, compId: nextcompId });
  //   }, []);

  const { userId, startTime, endTime, date, roomName, subject } = meetingData;

  const handleClickOpen = () => {
    setOpen(true);
    setMeetingData({
      ...meetingData,
      roomName: roomName2,
      userId: user,
      startTime: start,
      endTime: end,
      date: dateto,
    });
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handelSubmit = () => {
    console.log(meetingData);
    setOpen(false);
    axios
      .post("/main/add/schedule/", meetingData)
      .then(function (response) {
        console.log(response);
        //  setRoomInsert({ name: "", category: "" });
        //    setAlertState(true);
        setAlert("Meeting is Added", "success");
        // setTimeout(() => {
        //   setAlertState(false);
        // }, 3000);
        //callBack();
      })
      .catch(function (error) {
        //    setWrongState(true);
        // setAlert("Room is Added", "success");
        // setTimeout(() => {
        //  setWrongState(false);
        // }, 3000);
        setAlert("Meeting is Not Added Plz retry", "danger");
      });
  };

  const ontype = (e) =>
    setMeetingData({ ...meetingData, [e.target.name]: e.target.value });

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Reserve
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Meeting</DialogTitle>
        <DialogContent>
          <div id="duration-modal-divid">
            <div className="duration-modal-divcls">
              <div className="duration-modal-indivcls">
                <span id="duration-modal-spanid">Duration : </span>
              </div>
              <Chip
                width="25%"
                avatar={<Avatar>T</Avatar>}
                label={`${startTime} to ${endTime} `}
                // color="primary"
                //onDelete={handleDelete}
                // deleteIcon={<DoneIcon />}
              />
            </div>
            <div className="duration-modal-divcls">
              <div>
                <span id="duration-modal-spanid">Date : </span>
              </div>
              <Chip
                width="200px"
                avatar={<Avatar>D</Avatar>}
                label={`${date}`}
                //color="secondary"
                //onDelete={handleDelete}
                // deleteIcon={<DoneIcon />}
              />
            </div>

            <div className="duration-modal-divcls">
              <div>
                <span id="duration-modal-spanid">Room : </span>
              </div>
              <Chip
                avatar={<Avatar>R</Avatar>}
                label={`${roomName}  `}
                // color="primary"
                //onDelete={handleDelete}
                // deleteIcon={<DoneIcon />}
              />
            </div>
            <div className="duration-modal-divcls">
              <div>
                <span id="duration-modal-spanid">Owner : </span>
              </div>
              <Chip
                avatar={<Avatar>U</Avatar>}
                label={`${userId}  `}
                // color="primary"
                //onDelete={handleDelete}
                // deleteIcon={<DoneIcon />}
              />
            </div>
          </div>

          {/* <DialogContentText>
            csdsdc tj yutyjj rtyjty rjr hj f j jryt rhj hj yj y{" "}
          </DialogContentText> */}

          <TextField
            onChange={ontype}
            //  disabled={true}
            value={subject}
            autoFocus
            margin="dense"
            name="subject"
            id="name2"
            label="Subject"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>

          <Button onClick={handelSubmit} color="primary">
            Add Meeting
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
