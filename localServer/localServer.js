const http = require("http");
const fs = require("fs");
const express = require("express");
const cron = require("node-cron");
const axios = require("axios");
//configer env veriable
const dotenv = require("dotenv").config();

const mongoose = require("mongoose");

// const bcrypt = require("bcryptjs");

const scheduleSchema = require("./models/schedule.model");
const { scheduleValidation } = require("./validation/shedule");

var CronJob = require("cron").CronJob;

if (dotenv.error) {
  throw dotenv.error;
}
//data base
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

// const Db = mongoose.connection
// Db.once('open', _ => {
//   console.log('Database connected:')
// })

// Db.on('error', err => {
//   console.error('connection error:', err)
// })

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

var token;

async function saveScheduleData(data) {
  const newsh = new scheduleSchema({
    roomName: data.roomName,
    subject: data.subject,
    startTime: new Date(data.date + "T" + data.startTime),
    endTime: new Date(data.date + "T" + data.endTime),
    userId: data.userId,
  });
  try {
    const newSavedData = await newsh.save();
  } catch (err) {
    console.log("Error in saving...");
    throw err;
  }
}

var getShuduleJob = new CronJob(
  "0,30 * * * * *",
  async function () {
    try {
      console.log("You will see this message every second");

      const newData = {
        roomName: "room01",
        date: "2020-12-02",
        subject: "co222",
        startTime: "03:00:00",
        endTime: "04:00:00",
        userId: "e/12/222",
      };
      if (scheduleValidation(newData)) {
        mongoose.connection.db
          .listCollections({ name: "scheduleschemas" })
          .next(async function (err, collinfo) {
            if (err) {
              console.log("Error in checking collection name...", err);
            } else {
              if (collinfo) {
                console.log("There is a collection...");
                mongoose.connection.db.dropCollection(
                  "scheduleschemas",
                  async function (err, result) {
                    if (err) {
                      console.log("Collection dropping error...", err);
                    } else {
                      console.log("Droped the collection...");
                      try {
                        await saveScheduleData(newData);
                        console.log("Saving sucsess...");
                      } catch (error) {
                        console.log("DataBase saving error...", error);
                      }
                    }
                  }
                );
              } else {
                console.log("Now such collection...");
                try {
                  await saveScheduleData(newData);
                  console.log("Saving sucsess...");
                } catch (error) {
                  console.log("Database saving error...", error);
                }
              }
            }
          });
      } else {
        console.log("validation failed...");
      }

      // axios
      //   .post("http://localhost:5000/main/today", {
      //     roomName: "room01",
      //   })
      //   .then((respon) => {
      //     console.log(respon.data);
      //     const newData = {
      //       roomName: "room01",
      //       date: "2020-12-02",
      //       subject: "co222",
      //       startTime: "03:00:00",
      //       endTime: "04:00:00",
      //       userId: "e/12/222",
      //     };
      //     if (scheduleValidation(newData)) {
      //       mongoose.connection.db
      //         .listCollections({ name: "scheduleschemas" })
      //         .next(function (err, collinfo) {
      //           if (err) {
      //             console.log(err);
      //           } else {
      //             if (collinfo) {
      //               console.log(collinfo);
      //               mongoose.connection.db.dropCollection(
      //                 "scheduleschemas",
      //                 function (err, result) {
      //                   if (err) {
      //                     console.log(err);
      //                   } else {
      //                     console.log(result);
      //                     try {
      //                       saveScheduleData(newData);
      //                     } catch (error) {
      //                       console.log(error);
      //                     }
      //                   }
      //                 }
      //               );
      //             } else {
      //               try {
      //                 saveScheduleData(newData);
      //               } catch (error) {
      //                 console.log(error);
      //               }
      //             }
      //           }
      //         });
      //     } else {
      //       console.log("failed");
      //     }
      //   }).catch((err)=>{
      //     console.log('Error in connection...');
      //   });

      // var options = {
      //   host: 'localhost',
      //   path: 'main/today',
      //   port: '5000',
      //   method: 'POST',
      //   headers: {'custom': 'Custom Header Demo works'}
      // };
      // const data = JSON.stringify({
      //   'roomName': 'ro01',
      // });
      // callback = function(response) {
      //   var str = ''
      //   response.on('data', function (chunk) {
      //     str += chunk;
      //   });

      //   response.on('end', function () {
      //     console.log('dt',str);
      //   });
      // }

      // var req = http.request(options, callback);
      // req.on('error', error => {
      //   console.error('err',error)
      // })
      // req.end();
    } catch (error) {
      console.log("Error in function...", error);
    }
  },
  null,
  true,
  "Asia/Colombo"
);
getShuduleJob.start();

var authJob = new CronJob(
  "0 0 7 * * *",
  async function () {
    try {
      axios
        .post("http://localhost:5000/login/controlUnit", {
          roomName: "room01",
          password: "password",
        })
        .then((response) => {
          token = response.data.token;
          console.log("Sucessfully loged...");
        });
    } catch (error) {
      console.log("Error in login function...", error);
    }
  },
  null,
  true,
  "Asia/Colombo"
);
authJob.start();

var getComponentsJob = new CronJob(
  "0 0 7 * * *",
  async function () {
    try {
      axios
        .post("http://localhost:5000/main/get/roomCompData", {
          roomName: "room01",
        })
        .then((response) => {
          token = response.data.token;
          console.log("Sucessfully loged...");
        });
    } catch (error) {
      console.log("Error in login function...", error);
    }
  },
  null,
  true,
  "Asia/Colombo"
);
getComponentsJob.start();

//shedule route
const shedule = require("./routes/shedule");

app.use("/shedule", shedule);

const compControl = require("./routes/componentControl");
app.use("/components", compControl);
