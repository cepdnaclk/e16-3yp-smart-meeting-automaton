const express = require("express");
//init
const router = express.Router();

//module room
const roomschema = require("../modules/lecRoom.model");

//model ac
const acschema = require("../modules/ac.model");

//model projector
const projectorschema = require("../modules/projectors.model");

//model schedule
const scheduleschema = require("../modules/schedule.model");

//calendar api
const {
  addEvent,
  editEvent,
  deleteEvent,
  getEventListAll,
} = require("../middleware/calendarApi");
//authentication
const { authCU } = require("../middleware/authenticate");

//get room components
// authCU,
router.post("/get/roomCompData", async (req, res) => {
  console.log(req.body.roomName);
  try {
    roomschema.findOne(
      { roomName: req.body.roomName },
      async (err, resultRoom) => {
        // console.log(resultRoom);
        if (err) {
          console.log("Error in get room");
          res.status(401).send("Cannot find");
        } else {
          if (resultRoom) {
            try {
              // console.log(resultRoom.acId);
              acschema.find(
                {
                  compId: {
                    $in: resultRoom.acId,
                  },
                },
                async (errac, resultAcList) => {
                  if (errac) {
                    console.log("Error in get room");
                    res.status(401).json({
                      error: "Cannot find",
                    });
                  } else {
                    try {
                      projectorschema.find(
                        {
                          compId: {
                            $in: resultRoom.projectorId,
                          },
                        },
                        async (errproj, resultProjList) => {
                          if (errproj) {
                            console.log("Error in get room");
                            res.status(401).json({
                              error: "Cannot find",
                            });
                          } else {
                            // const sendList = [
                            // resultAcList.concat(resultProjList);
                            console.log("list", {
                              ac: resultAcList,
                              proj: resultProjList,
                            });
                            res.status(200).json({
                              ac: resultAcList,
                              proj: resultProjList,
                            });
                          }
                        }
                      );
                    } catch (error) {
                      console.log("Error in db");
                      res.status(401).json({
                        error: "Error in db",
                      });
                    }
                  }
                }
              );
            } catch (error) {
              console.log("Error in db");
              res.status(401).json({
                error: "Error in db",
              });
            }
          } else {
            console.log("No room", resultRoom);
            res.status(401).json({
              error: "No room",
            });
          }
          // console.log("send room data", resultRoom);
          // res.status(200).json(resultRoom);
        }
      }
    );
  } catch (error) {
    console.log("Error in DB");
    res.status(401).send("Error in DB");
  }
});

//authCU
router.post("/room/get/schedule", authCU, async (req, res) => {
  try {
    // console.log(req.body.roomName);
    // console.log(req.header("x-auth-token"));
    // res.status(200).json({
    //   Error: "No schedule : ",
    // });

    const startT = new Date();
    const endT = new Date(
      new Date(startT.getTime() + 60 * 60000).toISOString()
    );
    const resultCalApi = await getEventListAll({
      startTime: startT,
      endTime: endT,
    });
    console.log(resultCalApi.data.items);
    if (resultCalApi.data.items.length > 0) {
      try {
        var idList = [];
        resultCalApi.data.items.forEach((element) => {
          idList.push(element.id);
        });

        scheduleschema
          .find({
            _id: {
              $in: idList,
            },
            roomName: req.body.roomName,
          })
          .sort({ startTime: 1 })
          .exec(function (err, docs) {
            if (err) {
              res.status(400).json({
                Error: "Try again",
              });
            } else {
              console.log(docs);
              res.send(docs);
            }
          });
      } catch (error) {
        console.log("Db access faild...", error);
        res.send({
          Error: "Data base error : " + error,
        });
      }
    } else {
      console.log("No schedule");
      res.status(400).json({
        Error: "No schedule : ",
      });
    }
  } catch (error) {
    console.log("Calendar api faild...", error);
    res.status(400).json({
      Error: "Calenadar api errror : " + error,
    });
  }
});

//404
router.use((req, res) => {
  res.status(404).send("404");
});

module.exports = router;
