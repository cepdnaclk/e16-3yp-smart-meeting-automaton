const http = require("http");
const fs = require("fs");
const express = require("express");
// const cron = require('node-cron');
const User = require("./modules/user.model");
//configer env veriable
const dotenv = require("dotenv").config();
const bcrypt = require("bcryptjs");
if (dotenv.error) {
  throw dotenv.error;
}

//data base
const mongoose = require("mongoose");
const db = mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected to the db...");
  })
  .catch((error) => {
    console.log("Failed to connect db...", error);
  });

//init express
const app = express();

//port
const PORT = process.env.PORT || 3000;

//server initiating
const ser = http.createServer(app).listen(PORT, "localhost", function () {
  console.log(`Server is listening on port ${PORT}`);
});

// //need to impl
// cron.schedule('* * /2 * *', ()=>{
//     //run background task

// });

//middleware
app.use(express.json());

////////////////////////////////////////////

// AUTH ROUTES
app.use("/api/auth", require("./route/auth"));
app.use("/api/newuser", require("./route/newuser"));

/////////////////////////////////////////////////

// app.get("/main/room/:_id", (req, res) => {
//   console.log("get room devices");
//   res.json({
//     ac: [
//       {
//         componentId: "AC01",
//         category: "Air Conditioner",
//         brand: "Hitachi",
//         model: "333338",
//       },
//       {
//         componentId: "AC02",
//         category: "Air Conditioner",
//         brand: "Sony",
//         model: "SAC4530",
//       },
//     ],
//     projector: [
//       {
//         componentId: "PR01",
//         category: "Projector",
//         brand: "DJdiwanga",
//         model: "P58418278790810",
//       },

//       {
//         componentId: "PR02",
//         category: "Projector",
//         brand: "Hitachi",
//         model: "P5002",
//       },
//     ],
//   });
//   console.log(req.params._id);
// });
// app.post("/main/add/", (req, res) => {
//   console.log("post room devices");
//   console.log(req.body.roomId);
//   res.send("diwanga");
//   //console.log(req.params._id);
// });
// app.post("/main/get/shedule/", (req, res) => {
//   console.log("post shedule");
//   console.log(req.body.date);
//   console.log(req.body._id);
//   //   console.log(req.body);
//   res.json([
//     {
//       meetingId: "1",
//       userId: "e16022",
//       subject: "CO227",
//       startTime: "08.00 AM",
//       endTime: "10.00 AM",
//     },
//     {
//       meetingId: "2",
//       userId: "e16222",
//       subject: "EE286",
//       startTime: "10.00 AM",
//       endTime: "12.00 PM",
//     },
//     {
//       meetingId: "3",
//       userId: "e16025",
//       subject: "CO324",
//       startTime: "02.30 PM",
//       endTime: "04.00 PM",
//     },
//   ]);
//   //console.log(req.params._id);
// });
// // app.post("/main/add/shedule/", (req, res) => {
// //   console.log("post shedule");

// //   console.log(req.body.userId);
// //   console.log(req.body.subject);
// //   console.log(req.body.startTime);
// //   console.log(req.body._id);
// //   console.log(req.body.date);
// //   console.log(req.body.endTime);
// //   res.send("schedule is added");
// //   //console.log(req.params._id);
// // });
// app.get("/main/roomall", (req, res) => {
//   console.log("ssssssssssss get all rooms");

//   res.json([
//     {
//       _id: " 011",
//       roomName: "Lecture Room 1",
//       lastConfigDate: "2020/03/05",
//     },

//     {
//       _id: " 012",
//       roomName: "Seminar Room 1",
//       lastConfigDate: "2020/03/10",
//     },
//     {
//       _id: " 013",
//       roomName: "Lecture Room 14",
//       lastConfigDate: "2020/04/12",
//     },
//   ]);
//   //console.log(req.params._id);
// });
// //////////////////////////////////////////////

// app.post("/abcd", async (req, res, next) => {
//   console.log("www");
//   // console.log(req.body.workerId);
//   try {
//     const userId = "Admin";
//     const name = "Admin";
//     const password = "q12345";
//     const email = "diwangaamasith@gmail.com";
//     //const onetimeId = req.body.onetimeId;
//     // const address1 = req.body.address1;
//     // const address2 = req.body.address2;
//     // const address3 = req.body.address3;
//     const role = 1;
//     const phone = "0776029720";
//     const salt = await bcrypt.genSalt(10);

//     user = new User({
//       userId,
//       name,
//       email,
//       password,
//       phone,
//       role,
//     });
//     user.password = await bcrypt.hash(password, salt);
//     console.log(user.password);
//     await user.save();

//     console.log("www");
//     res.send("useradded");
//   } catch (err) {
//     return res.status(500).json({ msg: err });
//   }
// });

//user signup route
const signup = require("./Route/signup");
app.use("/signup", signup);

//admin//user login route
const login = require("./Route/login");
app.use("/login", login);

// //admin route
const main = require("./Route/main");
app.use("/main", main);

// //route user
// const user = require('./Route/user');
// app.use('/user', user);

// 404
app.use((req, res) => {
  res.status(404).send("404");
});
