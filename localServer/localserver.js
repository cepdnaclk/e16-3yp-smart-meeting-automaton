const http = require("http");
const fs = require("fs");
const express = require("express");
// const cron = require('node-cron');
//configer env veriable
const dotenv = require("dotenv").config();

const bcrypt = require("bcryptjs");

if (dotenv.error) {
  throw dotenv.error;
}

//data base
// const mongoose = require("mongoose");
// const db = mongoose
//   .connect(process.env.DB_CONNECT, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//   })
//   .then(() => {
//     console.log("Connected to the db...");
//   })
//   .catch((error) => {
//     console.log("Failed to connect db...", error);
//   });

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


app.use('/add', require('./routes/add'));