const http = require("http");
const fs = require("fs");
const express = require("express");
const cron = require("node-cron");
const axios = require("axios");
//configer env veriable
const dotenv = require("dotenv").config();

const mongoose = require("mongoose");

// const bcrypt = require("bcryptjs");

//ac model
const acschema = require("./models/ac.model");
//pro model
const projectorschema = require("./models/projector.model");

const scheduleSchema = require("./models/schedule.model");
const { scheduleValidation } = require("./validation/shedule");
const {acStateOperation, proStateOperation} = require("./controler/componentsControler");

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
    acschema.find({}, (err, resultAcs)=>{
      if(err){
        console.log("Error in finding...");
      }else{
        if(resultAcs){
          console.log("There is Acs...");
          resultAcs.forEach(element => {
              acStateOperation(false, element._id);
              // console.log(element._id); 
          });
        }
        else{
          console.log("There is no Acs...");
        }
      }
    });
    projectorschema.find({}, (err, resultProjs)=>{
      if(err){
        console.log("Error in finding...");
      }else{
        if(resultProjs){
          // console.log("There is Projectors...",resultProjs);
          resultProjs.forEach(element => {
              proStateOperation(false, element._id); 
          });
        }
        else{
          console.log("There is no Projectors...");
        }
      }
    });
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

var token = null;

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
      if(token){
        console.log("You will see this message every 30 second");

      // const newData = {
      //   roomName: "room01",
      //   date: "2020-12-02",
      //   subject: "co222",
      //   startTime: "03:00:00",
      //   endTime: "04:00:00",
      //   userId: "e/12/222",
      // };

      axios
        .post("http://localhost:5000/controlUnit/room/get/schedule", {
          roomName: process.env.ROOM_NAME,
        },{
          headers: {
            "x-auth-token": token,
          },
        })
        .then((respon) => {
          console.log(respon.data);

          var responseData;

          if (respon.data && respon.data.length > 0) {
            console.log(respon.data.length);
            if (respon.data.length > 1) {
              responseData = respon.data[0];
            } else {
              responseData = respon.data;
            }
            const newData = {
              roomName: responseData.roomName,
              date: responseData.data,
              subject: responseData.subject,
              startTime: responseData.startTime,
              endTime: responseData.endTime,
              userId: responseData.userId,
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
                      console.log("Now such collection to drop ...");
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
          } else {
            console.log("There is no data...");
          }
        })
        .catch((err) => {
          console.log("Error in connection...");
        });
      }
      else{
        console.log("Need to loging first...");
      }
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
  "25 20 * * * *",
  async function () {
    try {
      axios
        .post("http://localhost:5000/login/controlUnit", {
          roomName: process.env.ROOM_NAME,
          password: process.env.PASSWORD,
        })
        .then((response) => {
          token = response.data.token;
          console.log("Sucessfully loged...", token);
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

var runScheduleJob = new CronJob(
  "0 50 * * * *",
  async function () {
    try {
      scheduleSchema.find({},(err, schedul)=>{
        if(err){
          console.log("Error in serching...");
        }else{
          if(schedul){
            const startT = new Date(schedul.startTime);
            const endT = new Date(schedul.endTime);
            // setTimeout(myFunc, 1500, ());
            acStateOperation(true, 'idAC');
            proStateOperation(true, 'idPro');
            setTimeout(acStateOperation, (endT-startT), true, 'idAC');
          }
          else{
            console.log("No schedule...");
          }
        }
      });
      
    } catch (error) {
      console.log("Error in getting schedules...", error);
    }
  },
  null,
  true,
  "Asia/Colombo"
);
runScheduleJob.start();

var isFetch = false;
var getComponentsJob = new CronJob(
  "0,30 * * * * *",
  async function () {
    if(isFetch){
      isFetch = true;
    try {
      if(!token){
        axios
        .post(
          "http://localhost:5000/controlUnit/get/roomCompData",
          {
            roomName: process.env.ROOM_NAME,
          },
          {
            headers: {
              "x-auth-token": token,
            },
          }
        )
        .then((response) => {
          // console.log(response.data);
          //response.data
          if (response.data) {
            if (response.data.ac) {
              console.log("There are Acs...");
              try {
                acschema.insertMany(response.data.ac, (err, resultSavedAcs) => {
                  if (err) {
                    console.log("There is an error in insert many...");
                  } else {
                    console.log("Saved Acs");
                  }
                });
              } catch (error) {
                console.log("Error in saving ac list...");
              }
              
              if(response.data.proj){
                console.log("There is projectors...");
                try {
                  projectorschema.insertMany(
                    response.data.proj,
                    (err, resultSavedProj) => {
                      if (err) {
                        console.log("There is an error in insert many...");
                      } else {
                        console.log("Saved Projectors");
                      }
                    }
                  );
                } catch (error) {
                  console.log("Error in saving projector list...");
                }
              }
              else{
                console.log("There is no projectors...");
              }
            } else {
              console.log("No acs");
            }
          } else {
            console.log("No data...");
          }
        });
      }else{
        console.log("Need to loging first...");
      }
    } catch (error) {
      console.log("Error in login function...", error);
    }
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

//404
app.use((req, res) => {
  res.status(404).send("404");
});


//anoter way of http request
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
