import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import AlertContext from "../../context/alert/alertContext";

export default function AddDeviceModal(props) {
  const alertContext = useContext(AlertContext);
  const [open, setOpen] = React.useState(false);
  const { setAlert } = alertContext;
  const { nextcompId, cato, _id, callBack, roomName2 } = props;
  console.log("i am in modal");
  console.log(nextcompId);

  const [device, setDevice] = useState({
    compId: "",
    category: "",
    brand: "",
    model: "",
    roomId: "",
    roomName: "",
  });

  //   useEffect(() => {
  //     setDevice({ ...device, compId: nextcompId });
  //   }, []);

  const { compId, category, brand, model, roomName } = device;

  const handleClickOpen = () => {
    setOpen(true);
    setDevice({
      ...device,
      roomName: roomName2,
      compId: nextcompId, //`${roomName2}_${nextcompId}`,
      roomId: _id,
      category: cato === "PR" ? "PROJECTER" : cato,
    });
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    setOpen(false);
    console.log(device);
    axios
      .post("/main/update/room/", device)
      .then(function (response) {
        console.log(response);
        //  setRoomInsert({ name: "", category: "" });
        //    setAlertState(true);
        setAlert("Device is Added", "success");
        setDevice({ ...device, brand: "", model: "" });
        // setTimeout(() => {
        //   setAlertState(false);
        // }, 3000);
        callBack();
      })
      .catch(function (error) {
        setAlert("Device is not Added", "danger");
        //    setWrongState(true);
        // setAlert("Room is Added", "success");
        // setTimeout(() => {
        //  setWrongState(false);
        // }, 3000);
        alert(error);
      });
  };

  const ontype = (e) =>
    setDevice({ ...device, [e.target.name]: e.target.value });

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Device Data</DialogTitle>
        <DialogContent>
          <DialogContentText>
            chamath amarasinghe wishwa diwanga diwanga wishhwa batha
          </DialogContentText>
          <TextField
            //  onChange={ontype}
            disabled={true}
            value={compId}
            autoFocus
            name="compId"
            margin="dense"
            id="name0"
            label="Component ID"
            type="text"
            fullWidth
          />
          <TextField
            onChange={ontype}
            disabled={true}
            value={category}
            name="category"
            autoFocus
            margin="dense"
            id="name1"
            label="Category"
            type="text"
            fullWidth
          />
          <TextField
            onChange={ontype}
            //  disabled={true}
            value={brand}
            autoFocus
            margin="dense"
            name="brand"
            id="name2"
            label="Brand"
            type="text"
            fullWidth
          />
          <TextField
            onChange={ontype}
            //disabled={true}
            value={model}
            autoFocus
            margin="dense"
            name="model"
            id="name3"
            label="Model"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add Device
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
