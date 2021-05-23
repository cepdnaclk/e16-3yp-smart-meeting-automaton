const express = require("express");
const scheduleschema = require('../models/schedule.model');
const { scheduleValidation } = require('../validation/shedule');

//init
const router = express.Router();


router.post('/add',async(req, res)=>{
    console.log('in add');

    //authAdmin,
router.post("/add/schedule", scheduleValidation, async (req, res) => {
    scheduleschema.find(
      { },
      async (err, result) => {
        if (err) {
          res.status(400).json({
            Error: "Try again",
          });
        } else {
          try {
            if (result.length > 0) {
              console.log("arry : ", result);
              result.forEach((element) => {
                const dateStart = new Date(element.startTime);
                const dateStartNew = new Date(
                  req.body.date + "T" + req.body.startTime
                );
                const dateEnd = new Date(element.endTime);
                const dateEndNew = new Date(
                  req.body.date + "T" + req.body.endTime
                );
  
                if (
                  (dateStartNew >= dateStart && dateStartNew <= dateEnd) ||
                  (dateEndNew >= dateStart && dateEndNew <= dateEnd) ||
                  dateStartNew > dateEndNew
                ) {
                  console.log(
                    dateStartNew >= dateStart && dateStartNew <= dateEnd
                  );
                  console.log(dateEndNew >= dateStart && dateEndNew <= dateEnd);
                  console.log(dateStartNew > dateEndNew);
                  throw new Error("Already exist event...");
                }
                console.log("here");
  
                // if(((dateStart > dateStartNew)&&(dateStart < dateEndNew))||((dateStart < dateStartNew)&&(dateEnd > dateEndNew))){
  
                // }
              });
            }
            console.log("...");
            const newSchedule = new scheduleschema({
              roomName: req.body.roomName,
              subject: req.body.subject,
              startTime: new Date(req.body.date + "T" + req.body.startTime),
              endTime: new Date(req.body.date + "T" + req.body.endTime),
              userId: req.body.userId,
            });
  
            try {
              newSchedule.save(async (err, result) => {
                if (err) {
                  console.log("Saving faild...", err);
                  res.status(400).json({
                    Error: "saving feild. try again",
                  });
                } else {
                  console.log('saved shedul to the db...');
                  res.send(result._id);
                }
              });
            } catch (error) {
              console.log("Saving faild...", error);
              res.status(400).json({
                Error: "Saving error" + error,
              });
            }
          } catch (error) {
            console.log("Already exist event...");
            res.status(400).json({
              Error: "Saving error" + error,
            });
          }
        }
      }
    );
  });

});

module.exports = router;