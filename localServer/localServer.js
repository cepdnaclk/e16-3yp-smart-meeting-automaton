const http = require("http");
const fs = require("fs");
const express = require("express");
const cron = require('node-cron');
const axios = require("axios");
//configer env veriable
const dotenv = require("dotenv").config();

// const bcrypt = require("bcryptjs");

const {scheduleschema} = require('./models/schedule.model');

var CronJob = require('cron').CronJob;

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

var job = new CronJob('0,30 * * * * *', function() {
  console.log('You will see this message every second');
  
  mongoose.connection.db.dropCollection('cats', function(err, result) {
    if(err)
    {
      console.log('err',err);
      
    }
    else{
      console.log(result);

    }
  });

  // axios.post('http://localhost:5000/main/today',{
  //   'roomName': 'room01',
  // }).then(
  //   respon => {
  //     console.log(respon.data);
  //     mongoose.connection.db.dropCollection('cat', function(err, result) {
  //       if(err)
  //       {
  //         console.log(err);
          
  //       }
  //       else{
  //         console.log(result);

  //       }
  //     });
  //   }
  // )
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

}, null, true, 'Asia/Colombo');
job.start();

//shedule route
const shedule = require("./routes/shedule");
app.use("/shedule", shedule);

