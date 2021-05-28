const express = require("express");
//init
const router = express.Router();

const moment = require("moment");

//bcryptjs
const bcryptjs = require("bcryptjs");

// //module administrator
// const Administrator = require('../modules/administrator.model');

//module user
const userSchema = require("../modules/user.model");

//newuser model
const newUserschema = require("../modules/newUser.model");

// //module request
// const requestSchema = require('../modules/userRequest.model');

//module room
const roomschema = require("../modules/lecRoom.model");

//model ac
const acschema = require("../modules/ac.model");

//model projector
const projectorschema = require("../modules/projectors.model");

//model schedule
const scheduleschema = require("../modules/schedule.model");

//autheratazation
const { authAdmin, authUser } = require("../middleware/authenticate");

//validation
const { newUserValidation } = require("../validation/user");

//validation room
const { roomValidation } = require("../validation/room");

//validation ac
const { acValidation } = require("../validation/ac");

//projector validation
const { projectorValidation } = require("../validation/projector");

//schedule validation
const {
  scheduleValidation,
  schedulCalendarApiValidation,
} = require("../validation/schedule");

// //auth
// const { userFreshAuth } = require('../middleware/auth');

//email
const { sendMailVerification } = require("../middleware/email");

//calendar api
const {
  addEvent,
  editEvent,
  deleteEvent,
  getEventListAll,
} = require("../middleware/calendarApi");
const lecRoom = require("../modules/lecRoom.model");

const { sendMqttNew, sendMqttinit } = require("../controlers/mqtt");
const { json } = require("express");



router.post("/timeTable", async (req, res) => {
  // const tp = [
  //   {
  //     userId: "user01",
  //     room: "room01",
  //     sub: "CO222",
  //     time: "2-3",
  //   },
  //   {
  //     userId: "user01",
  //     room: "room01",
  //     sub: "CO222",
  //     time: "2-3",
  //   },
  //   {
  //     userId: "user01",
  //     room: "room01",
  //     sub: "CO222",
  //     time: "2-3",
  //   },
  //   {
  //     userId: "user01",
  //     room: "room01",
  //     sub: "CO222",
  //     time: "2-3",
  //   },
  //   {
  //     userId: "user01",
  //     room: "room01",
  //     sub: "CO222",
  //     time: "2-3",
  //   },
  // ];
  try {
    const startT = new Date();
    const endT = new Date(
      new Date(startT.getTime() + 24 * 60 * 60000).toISOString()
    );
    const resultCalApi = await getEventListAll({
      startTime: startT,
      endTime: endT,
    });
    console.log(resultCalApi.data.items.length);
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
            userId: req.body.userId,
          })
          .sort({ startTime: 1 })
          .exec(function (err, docs) {
            if (err) {
              res.status(400).json({
                Error: "Try again",
              });
            } else {
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


//authAdmin, verifyAdmin,
router.post("/adduser", newUserValidation, async (req, res) => {
  try {
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(req.body.OTP, salt);
    const newUser = new newUserschema({
      userId: req.body.userId,
      OTP: hashPassword,
      userName: req.body.userName,
      email: req.body.email,
      phone: req.body.phone,
    });

    const doc = await newUser.save();

    console.log("saved user to the db...");
    try {
      const singnUpUrl = "http://localhost:5000/signup";
      console.log(singnUpUrl);

      sendMailVerification(doc.email, singnUpUrl)
        .then(() => {
          res.status(200).json({
            message: "User added success",
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json({
            Error: err,
          });
        });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        Error: "Failed sending mail : " + error,
      });
    }
  } catch (error) {
    console.log("Saving faild...", error);
    res.status(400).json({
      error: "Saving error",
    });
  }
});

//return all rooms.
router.get("/table", async (req, res) => {
  //authAdmin,
  try {
    roomschema.find({}, (err, data) => {
      if (err) {
        console.log("Error in get room");
        res.status(401).send("Cannot find");
      }
      else{
        console.log("Send data");
        res.send(data);
      }
    });
  } catch (error) {
    console.log("Error in get room", error);
    res.status(401).send("Cannot find");
  }
});

// router.post("/get/roomCompData", async (req, res) => {
//   console.log(req.body.roomName);
//   try {
//     roomschema.findOne(
//       { roomName: req.body.roomName },
//       async (err, resultRoom) => {
//         console.log(resultRoom);
//         if (err) {
//           console.log("Error in get room");
//           res.status(401).send("Cannot find");
//         } else {
//           if (resultRoom) {
//             try {
//               console.log(resultRoom.acId);
//               acschema.find(
//                 {
//                   compId: {
//                     $in: resultRoom.acId,
//                   },
//                 },
//                 async (errac, resultAcList) => {
//                   if (errac) {
//                     console.log("Error in get room");
//                     res.status(401).json({
//                       error: "Cannot find",
//                     });
//                   } else {
//                     try {
//                       projectorschema.find(
//                         {
//                           compId: {
//                             $in: resultRoom.projectorId,
//                           },
//                         },
//                         async (errproj, resultProjList) => {
//                           if (errproj) {
//                             console.log("Error in get room");
//                             res.status(401).json({
//                               error: "Cannot find",
//                             });
//                           } else {
//                             // const sendList = [
//                             // resultAcList.concat(resultProjList);
//                             console.log("bye", {
//                               ac: resultAcList,
//                               proj: resultProjList,
//                             });
//                             res.status(200).json({
//                               ac: resultAcList,
//                               proj: resultProjList,
//                             });
//                           }
//                         }
//                       );
//                     } catch (error) {
//                       console.log("Error in db");
//                       res.status(401).json({
//                         error: "Error in db",
//                       });
//                     }
//                   }
//                 }
//               );
//             } catch (error) {
//               console.log("Error in db");
//               res.status(401).json({
//                 error: "Error in db",
//               });
//             }
//           } else {
//             console.log("No room", resultRoom);
//             res.status(401).json({
//               error: "No room",
//             });
//           }
//           // console.log("send room data", resultRoom);
//           // res.status(200).json(resultRoom);
//         }
//       }
//     );
//   } catch (error) {
//     console.log("Error in DB");
//     res.status(401).send("Error in DB");
//   }
// });

//get room components
router.post("/get/roomCompData", async (req, res) => {
  console.log(req.body.roomName);
  try {
    roomschema.findOne(
      { roomName: req.body.roomName },
      async (err, resultRoom) => {
        console.log(resultRoom);
        if (err) {
          console.log("Error in get room");
          res.status(401).send("Cannot find");
        } else {
          if (resultRoom) {
            try {
              console.log(resultRoom.acId);
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

router.post("/update/room", async (req, res) => {
  //deviceValidation
  try {
    console.log(req.body.roomName);
    console.log(req.body.acId);
    console.log(req.body.projectorId);
    console.log(req.body.roomName);
    if (
      req.body.category.toLowerCase() === "ac" ||
      req.body.category.toLowerCase() === "projecter"
    ) {
      const compType = "acId";
      if (req.body.category.toLowerCase() === "ac") {
        const ac = new acschema({
          roomName: req.body.roomName,
          brand: req.body.brand,
          model: req.body.model,
          compId: req.body.roomName + "_" + req.body.compId,
        });

        try {
          const acsaved = await ac.save();
          console.log("saved ac to the db...");
          // res.send(acsaved._id);
          try {
            roomschema.updateOne(
              { roomName: req.body.roomName },
              {
                $push: {
                  acId: req.body.roomName + "_" + req.body.compId,
                },
              },
              (err, updteResult) => {
                if (err) {
                  console.log("update room faild...", err);
                  res.status(400).json({
                    error: "updateRoom error",
                  });
                } else {
                  console.log("update room seccess...", updteResult);
                  res.status(200).json({
                    msg: "seccess",
                  });
                }
              }
            );
          } catch (error) {
            console.log("update room faild...", error);
            res.status(400).json({
              error: "updateRoom error",
            });
          }
        } catch (error) {
          console.log("Saving faild...", error);
          res.send({
            error: "Saving error",
          });
        }
      } else {
        // compType = "projectorId";
        const projector = new projectorschema({
          roomName: req.body.roomName,
          brand: req.body.brand,
          model: req.body.model,
          compId: req.body.roomName + "_" + req.body.compId,
        });

        try {
          const projectorsaved = await projector.save();
          console.log("saved projector to the db...");
          try {
            roomschema.updateOne(
              { roomName: req.body.roomName },
              {
                $push: {
                  projectorId: req.body.roomName + "_" + req.body.compId,
                },
              },
              (err, updteResult) => {
                if (err) {
                  console.log("update room faild...", err);
                  res.status(400).json({
                    error: "updateRoom error",
                  });
                } else {
                  console.log("update room seccess...", updteResult);
                  res.status(200).json({
                    msg: "seccess",
                  });
                }
              }
            );
          } catch (error) {
            console.log("update room faild...", error);
            res.status(400).json({
              error: "updateRoom error",
            });
          }
          // res.send(projectorsaved._id);
        } catch (error) {
          console.log("Saving faild...", error);
          res.status(400).json({
            error: "Saving error",
          });
        }
      }
    } else {
      console.log("cannot add category...");
      res.status(400).json({
        error: "cannot add category",
      });
    }
  } catch (error) {
    console.log("Failed server...", error);
    res.status(400).json({
      error: "Failed server",
    });
  }
});

// router.post("/update/room", async (req, res) => {
//   //deviceValidation
//   try {
//     console.log(req.body.category);
//     console.log(req.body.compId);
//     if (
//       req.body.category.toLowerCase() === "ac" ||
//       req.body.category.toLowerCase() === "projecter"
//     ) {
//       var compType = "acId";
//       if (req.body.category.toLowerCase() === "ac") {
//         const ac = new acschema({
//           roomName: req.body.roomName,
//           brand: req.body.brand,
//           model: req.body.model,
//           compId: req.body.roomName + "_" + req.body.compId,
//         });

//         try {
//           const acsaved = await ac.save();
//           console.log("saved ac to the db...");
//           // res.send(acsaved._id);
//         } catch (error) {
//           console.log("Saving faild...", error);
//           res.send({
//             error: "Saving error",
//           });
//         }
//       } else {
//         compType = "projectorId";
//         const projector = new projectorschema({
//           roomName: req.body.roomName,
//           brand: req.body.brand,
//           model: req.body.model,
//           compId: req.body.roomName + "_" + req.body.compId,
//         });

//         try {
//           const projectorsaved = await projector.save();
//           console.log("saved projector to the db...");
//           // res.send(projectorsaved._id);
//         } catch (error) {
//           console.log("Saving faild...", error);
//           res.status(400).json({
//             error: "Saving error",
//           });
//         }
//       }
//       try {
//         roomschema.updateOne(
//           { roomName: req.body.roomName },
//           {
//             $push: {
//               compType: req.body.roomName + "_" + req.body.compId,
//             },
//           },
//           (err, updteResult) => {
//             if (err) {
//               console.log("update room faild...", err);
//               res.status(400).json({
//                 error: "updateRoom error",
//               });
//             } else {
//               console.log("update room seccess...", updteResult);
//               res.status(200).json({
//                 msg: "seccess",
//               });
//             }
//           }
//         );
//       } catch (error) {
//         console.log("update room faild...", error);
//         res.status(400).json({
//           error: "updateRoom error",
//         });
//       }
//     } else {
//       console.log("cannot add category...");
//       res.status(400).json({
//         error: "cannot add category",
//       });
//     }
//   } catch (error) {
//     console.log("Failed server...");
//     console.log(error);
//     console.log("Failed server...");
//     res.status(400).json({
//       error: "Failed server",
//     });
//   }
// });

router.post(
  "/add/calendarapi",
  authAdmin,
  schedulCalendarApiValidation,
  async (req, res) => {
    try {
      scheduleschema.findById(req.body.id, async (err, result) => {
        if (err) {
          res.status(400).json({
            Error: "Try again",
          });
        } else {
          if (result) {
            try {
              const event = {
                id: result.id,
                summary: "Lecture",
                location: "University of peradeniya, sri lanka",
                description:
                  result.subject +
                  "Lecture in " +
                  result.roomName +
                  " conduct by " +
                  result.userName,
                start: {
                  dateTime: req.body.start,
                  // timeZone: 'Sri Lanka/Sri Jayawardenepura Kotte',
                },
                end: {
                  dateTime: req.body.end,
                  // timeZone: 'UTC/GMT',
                },
                reminders: {
                  useDefault: false,
                  overrides: [
                    { method: "email", minutes: 30 * 60 },
                    { method: "popup", minutes: 15 },
                  ],
                },
              };

              const { err, apiResult } = await addEvent(event);
              if (err) {
                console.log(
                  "There was an error contacting the Calendar service: " + err
                );
                res.status(400).json({
                  Error: "Inserting calendar api error",
                  apiError: err,
                  id: result._id,
                });
              } else {
                console.log("Successfully inserted");
                res.status(200).json({
                  Data: apiResult.data,
                });
              }
            } catch (error) {
              console.log(
                "There was an error contacting the Calendar service: " + error
              );
              res.status(400).json({
                Error: "Inserting calendar api error",
                apiError: error,
                id: result._id,
              });
            }
          } else {
            console.log("Failed. there is no such schedule");
            res.status(400).json({
              Error: "there is no such schedule",
            });
          }
        }
      });
    } catch (error) {
      console.log("Failed. Database conct failed");
      res.status(400).json({
        Error: " Database conct failed",
      });
    }
  }
);

router.delete("/delete/schedule/:id", async (req, res) => {
  //authAdmin
  console.log(req.params.id);
  try {
    scheduleschema.findByIdAndDelete(req.params.id, async (err, result) => {
      try {
        if (err) {
          res.status(400).json({
            Error: "Try again",
          });
        } else {
          if (result) {
            try {
              const mqttData = result._id.toJSON(); //JSON(result._id)
              const mqttTopic = result.roomName + "/" + "delete";
              sendMqttNew({ data: mqttData, topic: mqttTopic });
            } catch (error) {
              console.log("mqttfail");
              console.log(error);
              console.log("mqttfail");
            }

            try {
              const { err, resultCalApi } = await deleteEvent({
                eventId: req.params.id,
              });
              if (err) {
                console.log("Alredy deleted : " + err);
                res.status(400).json({
                  Error: "Alredy deleted : " + err,
                });
                return;
              } else {
                if (resultCalApi) {
                  console.log("deleted", resultCalApi);
                  res.status(200).json({
                    message: "Successfully deleted",
                  });
                } else {
                  console.log("deleted ");
                  res.status(200).json({
                    message: "Successfully deleted ",
                  });
                }
              }
            } catch (error) {
              console.log("Error in conncting calendar api: ", error);
              res.status(400).json({
                Error: "Try again",
              });
            }
          } else {
            res.status(400).json({
              Error: "No such schedule. check id",
            });
          }
        }
      } catch (error) {
        console.log("Failed.");
        console.log(error);
        console.log("Failed.");
        res.status(400).json({
          Error: "failed" + error,
        });
      }
    });
  } catch (error) {
    console.log("Failed. Database conct failed");
    res.status(400).json({
      Error: " Database conct failed" + error,
    });
  }
});

router.post("/rooms/status", async (req, res) => {
  try {
    const startT = new Date();

    const endT = new Date(new Date(startT.getTime() + 1000).toISOString());
    const resultCalApi = await getEventListAll({
      startTime: startT,
      endTime: endT,
    });
    console.log(resultCalApi.data.items);

    try {
      const roomStateList = [];
      const lecRoomList = [];
      const scheduleListId = [];
      resultCalApi.data.items.forEach((element) => {
        lecRoomList.push(element.location);
        scheduleListId.push(element.id);
      });
      console.log(lecRoomList, scheduleListId);
      lecRoom.find(
        {
          roomName: {
            $nin: lecRoomList,
          },
        },
        (err, result) => {
          if (err) {
            res.status(400).json({
              Error: "Try again",
            });
          } else {
            result.forEach((element) => {
              roomStateList.push({
                roomName: element.roomName,
                state: false,
              });
              // if(lecRoomList.includes(element.roomName)){
              //     element.state = true;
              // }
              // else{
              //     element.state = false;
              // }
            });

            try {
              scheduleschema.find(
                {
                  _id: {
                    $in: scheduleListId,
                  },
                },
                (err, resultSchedule) => {
                  if (err) {
                    console.log("Error in DB connect");
                    res.status(400).json({
                      Error: "Try again",
                    });
                  } else {
                    resultSchedule.forEach((element) => {
                      roomStateList.push({
                        roomName: element.roomName,
                        state: true,
                        startTime: element.startTime,
                        endTime: element.endTime,
                        userId: element.userId,
                        subject: element.subject,
                      });
                    });
                    console.log("success.");
                    res.status(200).json(roomStateList);
                  }
                }
              );
            } catch (error) {
              console.log("Error in DB connect");
              res.status(400).json({
                Error: "Try again",
              });
            }
          }
        }
      );
    } catch (error) {
      console.log("Error in DB connect");
      res.status(400).json({
        Error: "Try again",
      });
    }
  } catch (error) {
    console.log("Error in Api connect");
    res.status(400).json({
      Error: "Try again",
    });
  }
});

router.post("/free/rooms/custom", async (req, res) => {
  try {
    const startT = new Date(
      new Date(req.body.date + "T" + req.body.startTime).toISOString()
    );
    const endT = new Date(
      new Date(req.body.date + "T" + req.body.endTime).toISOString()
    );
    const resultCalApi = await getEventListAll({
      startTime: startT,
      endTime: endT,
    });
    console.log(resultCalApi.data.items.length);

    try {
      var lrcRoomList = [];
      resultCalApi.data.items.forEach((element) => {
        lrcRoomList.push(element.location);
      });

      lecRoom.find(
        {
          roomName: {
            $nin: lrcRoomList,
          },
        },
        (err, result) => {
          if (err) {
            res.status(400).json({
              Error: "Try again",
            });
          } else {
            res.send(result);
          }
        }
      );
    } catch (error) {
      console.log("Error in DB connect");
      res.status(400).json({
        Error: "Try again",
      });
    }
  } catch (error) {
    console.log("Error in Api connect");
    res.status(400).json({
      Error: "Try again",
    });
  }
});

router.post("/free/rooms", async (req, res) => {
  try {
    const startT = new Date(
      new Date(req.body.date + "T" + req.body.startTime).toISOString()
    );
    const endT = new Date(
      new Date(startT.getTime() + 10 * 60000).toISOString()
    );
    const resultCalApi = await getEventListAll({
      startTime: startT,
      endTime: endT,
    });
    console.log(resultCalApi.data.items);

    try {
      var lrcRoomList = [];
      resultCalApi.data.items.forEach((element) => {
        lrcRoomList.push(element.location);
      });

      lecRoom.find(
        {
          roomName: {
            $nin: lrcRoomList,
          },
        },
        (err, result) => {
          if (err) {
            res.status(400).json({
              Error: "Try again",
            });
          } else {
            res.send(result);
          }
        }
      );
    } catch (error) {
      console.log("Error in DB connect");
      res.status(400).json({
        Error: "Try again",
      });
    }
  } catch (error) {
    console.log("Error in Api connect");
    res.status(400).json({
      Error: "Try again",
    });
  }
});

//get all schedule past
router.post("/get/schedule/user", async (req, res) => {
  try {
    scheduleschema
      .find({
        userId: req.body.userId,
      })
      .sort({ startTime: 1 })
      .exec(function (err, docs) {
        if (err) {
          res.status(400).json({
            Error: "Try again",
          });
        } else {
          res.send(docs);
        }
      });
  } catch (error) {
    console.log("DB connect faild...", error);
    res.status(400).json({
      Error: "DB connect faild errror : " + error,
    });
  }
});

//authUser,
//get schedul from now all
router.post("/get/schedule/all", async (req, res) => {
  try {
    // if(req.body.startTime != 'undefined'){

    // }

    const resultCalApi = await getEventListAll({});
    console.log(resultCalApi.data.items.length);
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
            userId: req.body.userId,
          })
          .sort({ startTime: 1 })
          .exec(function (err, docs) {
            if (err) {
              res.status(400).json({
                Error: "Try again",
              });
            } else {
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

router.post("/get/schedule/user/all", async (req, res) => {
  try {
    // if(req.body.startTime != 'undefined'){

    // }
    const startT = new Date();
    const endT = new Date(
      new Date(startT.getTime() + 300 * 24 * 60 * 60000).toISOString()
    );
    const resultCalApi = await getEventListAll({
      startTime: startT,
      endTime: endT,
    });
    console.log(resultCalApi.data.items.length);
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
            userId: req.body.userId,
          })
          .sort({ startTime: 1 })
          .exec(function (err, docs) {
            if (err) {
              res.status(400).json({
                Error: "Try again",
              });
            } else {
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

//authUser,
//get schedul by date all
router.post("/get/schedule/date", async (req, res) => {
  try {
    // if(req.body.startTime != 'undefined'){

    // }
    const startT = new Date(req.body.date + "T" + "00:00:00+05:30");
    const endT = new Date(req.body.date + "T" + "23:59:00+05:30");
    const resultCalApi = await getEventListAll({
      startTime: startT,
      endTime: endT,
    });
    console.log(resultCalApi.data.items.length);
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

//authAdmin,
router.get("/get/schedule", async (req, res) => {
  try {
    scheduleschema.find({}, (err, result) => {
      if (err) {
        res.status(400).json({
          Error: "Try again",
        });
      } else {
        res.send(result);
      }
    });
  } catch (error) {
    console.log("Failed. Database connect failed");
    res.status(400).json({
      Error: " Database conct failed" + error,
    });
  }
});

//authAdmin,
router.post("/add/schedule", scheduleValidation, async (req, res) => {
  scheduleschema.find(
    {
      roomName: req.body.roomName,
      // subject: req.body.subject,
      // startTime: req.body.startTime,
      // endTime: req.body.endTime,
      // userName: req.body.userName
    },
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
                throw new Error("Already exist evint...");
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
                try {
                  const mqttData = result.toJSON();
                  const mqttTopic = result.roomName + "/" + "add";
                  sendMqttNew({ data: mqttData, topic: mqttTopic });
                } catch (error) {
                  console.log("mqtt error");
                  console.log(error);
                  console.log("mqtt error");
                }

                // const startT = ;
                // const endT = ;
                const eventBody = {
                  id: result._id,
                  summary: "Lecture",
                  location: result.roomName,
                  description:
                    result.subject +
                    " Lecture in " +
                    result.roomName +
                    " conduct by " +
                    result.userName,
                  start: {
                    dateTime: new Date(
                      req.body.date + "T" + req.body.startTime
                    ).toISOString(),
                  },
                  end: {
                    dateTime: new Date(
                      req.body.date + "T" + req.body.endTime
                    ).toISOString(),
                  },
                  reminders: {
                    useDefault: false,
                    overrides: [
                      { method: "email", minutes: 30 * 60 },
                      { method: "popup", minutes: 15 },
                    ],
                  },
                };
                console.log(eventBody);
                try {
                  const { err, apiResult } = await addEvent({
                    eventData: eventBody,
                  });

                  if (err) {
                    console.log(
                      "There was an error contacting the Calendar service: " +
                        err
                    );
                    res.status(400).json({
                      Error: "Inserted to database but calendar api error",
                      apiError: err,
                      id: result._id,
                    });
                  } else {
                    console.log("Successfully inserted");
                    res.status(200).json({
                      msg: "added",
                      Data: apiResult,
                    });
                  }
                } catch (error) {
                  console.log("Calendar api insert faild ", error);
                  res.status(200).json({
                    Error: error,
                  });
                }

                // console.log('saved user to the db...');
                // res.send(scheduleSaved._id);
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

//adding rooms
router.post("/add/room", roomValidation, async (req, res) => {
  //authAdmin,
  console.log("add room");
  try {
    roomschema.findOne({ roomId: req.body.roomName }, async (err, data) => {
      if (err) {
        res.send("Try again...");
      } else {
        if (data) {
          res.send("Already exist...");
        } else {
          try {
            sendMqttinit(req.body.roomName);
          } catch (error) {
            console.log("mqtt fail");
            console.log(error);
            console.log("mqtt fail");
          }

          const salt = await bcryptjs.genSalt(10);
          const hashPassword = await bcryptjs.hash(req.body.password, salt);
          const room = new roomschema({
            roomName: req.body.roomName,
            controlUnitId: req.body.controlUnitId,
            acId: [],
            password: hashPassword,
            projectorId: [],
          });

          try {
            const roomsaved = await room.save();
            console.log("saved room to the db...");
            res.send(roomsaved);
          } catch (error) {
            console.log("Saving faild...", error);
            res.send({
              error: "Saving error",
            });
          }
        }
      }
    });
  } catch (error) {
    console.log("DB connect fail...", error);
    res.send({
      Error: "DB connect fail..." + error,
    });
  }
});

router.get("/room/:id", authAdmin, async (req, res) => {
  try {
    roomschema.findOne({ _id: req.params.id }, (err, data) => {
      if (err) {
        console.log("Error in get room");
        req.status(401).send("Cannot find");
      } else {
        if (data) {
          res.send(data);
        } else {
          res.status(400).send("No room for id");
        }
      }
    });
  } catch (error) {
    console.log("DB connect fail...", error);
    res.send({
      Error: "DB connect fail..." + error,
    });
  }
});

router.delete("/deleteroom/:id", authAdmin, async (req, res) => {
  // console.log(req.params.id);
  try {
    roomschema.findOneAndDelete({ _id: req.params.id }, (err, data) => {
      if (err) {
        console.log("No room with requested id");
        req.status(401).send("Cannot find");
      } else {
        if (data) {
          res.send(data);
          console.log(data);
        } else {
          console.log("no room id", data);
          res.status(400).send("No room for id");
        }
      }
    });
  } catch (error) {
    console.log("DB connect fail...", error);
    res.send({
      Error: "DB connect fail..." + error,
    });
  }
});

router.delete("/removeuser/:id", authAdmin, async (req, res) => {
  try {
    userSchema.findOneAndDelete({ userId: req.params.id }, (err, data) => {
      if (err) {
        console.log("No user with requested id");
        req.status(401).send("Cannot find");
      } else {
        if (data) {
          res.send(data);
        } else {
          res.status(400).send("No user for id");
        }
      }
    });
  } catch (error) {
    console.log("DB connect fail...", error);
    res.send({
      Error: "DB connect fail...Try again" + error,
    });
  }
});

//for getting shedule to rasberry pi from now till endday.
router.post("/today", async (req, res) => {
  console.log("dta", req.body);
  res.status(200).json({
    Error: "Try again",
  });
  // try {
  //   const startT = moment().format();
  //   const endT = moment().format("YYYY-MM-DDT23:59:00Z");

  //   // const startT = new Date.now();
  //   // const endT = new Date(req.body.date + "T" + "23:59:00+05:30");

  //   const resultCalApi = await getEventListAll({
  //     startTime: startT,
  //     endTime: endT,
  //   });
  //   console.log(resultCalApi.data.items.length);
  //   if (resultCalApi.data.items.length > 0) {
  //     try {
  //       var idList = [];
  //       resultCalApi.data.items.forEach((element) => {
  //         idList.push(element.id);
  //       });

  //       scheduleschema
  //         .find({
  //           _id: {
  //             $in: idList,
  //           },
  //           roomName: req.body.roomName,
  //         })
  //         .sort({ startTime: 1 })
  //         .exec(function (err, docs) {
  //           if (err) {
  //             res.status(400).json({
  //               Error: "Try again",
  //             });
  //           } else {
  //             res.send(docs);
  //           }
  //         });
  //     } catch (error) {
  //       console.log("Db access faild...", error);
  //       res.send({
  //         Error: "Data base error : " + error,
  //       });
  //     }
  //   } else {
  //     console.log("No schedule");
  //     res.status(400).json({
  //       Error: "No schedule : ",
  //     });
  //   }
  // } catch (error) {
  //   console.log("Calendar api faild...", error);
  //   res.status(400).json({
  //     Error: "Calenadar api errror : " + error,
  //   });
  // }
});

//404
router.use((req, res) => {
  res.status(404).send("404");
  console.log("4040");
});

// router.post("/mqtt/add", async(req, res)=>{
//   // const dt = {
//   //   d: 'h'
//   // }
//   // sendMqttNew({data:dt, topic: 'cli01/add'});
//   // res.status(200).json({
//   //   message: "User added success",
//   // });
//   const mqttData = req.body;
//   const mqttTopic = req.body.roomName + '/' + 'add';
//   sendMqttNew({data: mqttData, topic: mqttTopic});
//   res.status(200).json({
//     message: "success",
//   });
// });

// router.post("/mqtt/deleted", async(req, res)=>{
//   // const dt = {
//   //   d: 'ht'
//   // }
//   // sendMqttNew({data:dt, topic: 'cli01/delete'});
//   // res.status(200).json({
//   //   message: "User added success",
//   // });

//   const mqttData = req.body.id;
//   const mqttTopic = req.body.roomName + '/' + 'delete';
//   sendMqttNew({data: mqttData, topic: mqttTopic});
//   res.status(200).json({
//     message: "success",
//   });
// });

// router.post("/mqtt/new", async(req, res)=>{
//   // const dt = {
//   //   d: 'ht'
//   // }
//   // sendMqttNew({data:dt, topic: 'cli01/delete'});
//   sendMqttinit({roomName: req.body.roomName});
//   res.status(200).json({
//     message: "User added success",
//   });
// });

// //get user details   // add auth middlware *****
// router.get("/getuser",  async (req, res) => {
//   try {
//     const user = await userSchema.findById(req.user.id).select("-password");
//     res.json({ ...user, workerId: user.userId });
//     //res.status(200).json({ data: user });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Server Error");
//   }
// });

// router.post('/adduser/list', authAdmin);

// router.get('/requests', authAdmin, async(req, res)=>{
//     requestSchema.find({}, (err, data) => {
//         if(err)
//         {
//             console.log('Error in get room')
//             req.status(401).send('Cannot find');

//         }
//         else{
//             if(data){
//                 // console.log(data);
//                 res.status(200).json({
//                     arry: data
//                 });
//             }
//             else{
//                 res.status(400).json({
//                     'Error': 'No request'
//                 });
//             }
//         }
//     });

// });

// router.post('/adduser', authAdmin, (req, res)=>{
//     // requestSchema.findOne({_id: req.params.id}, async(err, data)=>{
//     requestSchema.findOneAndDelete({_id: req.params.id}, async(err, data)=>{
//         if(err){
//             res.status(400).json({
//                 'Error': 'Try again'
//             });
//         }else{
//             if(data){
//                 const userNew = new userSchema({
//                     username: data.username,
//                     password: data.password,
//                     email: data.email
//                 });
//                 try{
//                     const usersaved = await userNew.save();
//                     console.log('saved user to the db...');
//                     const payload = {
//                         user: {
//                           id: usersaved._id
//                         }
//                     };
//                     // const verifUrl = jwt.sign(usersaved._id, process.env.LOGIN_VARIFICATION_TOKEN, {expiresIn: '10m'});
//                     const verifUrlToken = jwt.sign(payload, process.env.LOGIN_VARIFICATION_TOKEN, {expiresIn: '10m'});
//                     const verifUrl = `http://localhost:3000/user/verify/${verifUrlToken}`;
//                     console.log(verifUrl);
//                     // sendMailVerification(whom=usersaved.email, url=verifUrl).then((data) => {
//                     sendMailVerification(usersaved.email, verifUrl).then((data) => {
//                         res.status(200).json({
//                             'message': 'User added success'
//                         });
//                     }).catch((err)=>{
//                         console.log(err);
//                         res.status(400).json({
//                             'Error': err
//                         });
//                     });

//                 }catch(error)
//                 {
//                     console.log('Saving faild...', error);
//                     res.status(400).json({
//                         'error': 'Saving error'
//                     });

//                 }

//             }else{
//                 res.status(400).json({
//                     'Error': 'No such request'
//                 });
//             }
//         }
//     });
// });

// router.post('/adduser/hh', authAdmin, userValidation, async(req, res) => {

//     userSchema.findOne({email: req.body.email}, async (err, data)=>{
//         if(err) res.status('400').send('Try again');
//         else{

//             if(data) res.status('400').send('email already exist');
//             else{
//                 const salt = await bcryptjs.genSalt(10);
//                 const hashPassword = await bcryptjs.hash(req.body.password, salt);
//                 console.log(salt);
//                 console.log(hashPassword);
//                 const user = new userSchema({
//                     username: req.body.username,
//                     password: hashPassword,
//                     email: req.body.email
//                 });

//                 try{
//                     const userloged = await user.save();
//                     console.log('saved user to the db...');
//                     res.send(userloged);
//                 }catch(error)
//                 {
//                     console.log('Saving faild...', error);
//                     res.send({
//                         'error': 'Saving error'
//                     });

//                 }
//             }

//         }
//     });

// });
// //verifyAdmin,
// router.post("/add/ac", authAdmin, acValidation, async (req, res) => {
//   const ac = new acschema({
//     controlUnitId: req.body.controlUnitId,
//   });

//   try {
//     const acsaved = await ac.save();
//     console.log("saved user to the db...");
//     res.send(acsaved._id);
//   } catch (error) {
//     console.log("Saving faild...", error);
//     res.send({
//       error: "Saving error",
//     });
//   }
// });

// router.post(
//   "/add/projector",
//   authAdmin,
//   projectorValidation,
//   async (req, res) => {
//     const projector = new projectorschema({
//       controlUnitId: req.body.controlUnitId,
//     });

//     try {
//       const projectorSaved = await projector.save();
//       console.log("saved user to the db...");
//       res.send(projectorSaved._id);
//     } catch (error) {
//       console.log("Saving faild...", error);
//       res.send({
//         error: "Saving error",
//       });
//     }
//   }
// );

// //authAdmin,
// router.post("/edit/schedule", async (req, res) => {
//   try {
//     scheduleschema.findByIdAndUpdate(
//       req.body._id,
//       req.body,
//       async (err, result) => {
//         try {
//           if (err) {
//             res.status(400).json({
//               Error: "Try again",
//             });
//           } else {
//             if (result) {
//               const eventBody = {
//                 // id: result._id,
//                 summary: "Lecture",
//                 location: "University of peradeniya, sri lanka",
//                 description:
//                   req.body.subject +
//                   "Lecture in " +
//                   req.body.roomName +
//                   " conduct by " +
//                   req.body.userName,
//                 start: {
//                   dateTime: new Date(req.body.startTime).toISOString(),
//                   // timeZone: 'Sri Lanka/Sri Jayawardenepura Kotte',
//                 },
//                 end: {
//                   dateTime: new Date(req.body.endTime).toISOString(),
//                   // timeZone: 'UTC/GMT',
//                 },
//                 reminders: {
//                   useDefault: false,
//                   overrides: [
//                     { method: "email", minutes: 30 * 60 },
//                     { method: "popup", minutes: 15 },
//                   ],
//                 },
//               };

//               const { err, resultCalApi } = await editEvent({
//                 eventData: eventBody,
//                 eventId: result._id,
//               });
//               if (err) {
//                 console.log(
//                   "There was an error contacting the Calendar service: " + err
//                 );
//                 res.status(400).json({
//                   Error: "Inserted to database but calendar api error",
//                   apiError: err,
//                   // 'id': result._id
//                 });
//               } else {
//                 console.log("Successfully edited: ", resultCalApi);
//                 res.status(200).json({
//                   Data: resultCalApi.data,
//                 });
//               }
//             } else {
//               res.status(400).json({
//                 Error: "No such schedule",
//               });
//             }
//           }
//         } catch (error) {
//           console.log("Failed. ", error);
//           res.status(400).json({
//             Error: "failed " + error,
//           });
//         }
//       }
//     );
//   } catch (error) {
//     console.log("Failed. Database conct failed");
//     res.status(400).json({
//       Error: " Database conct failed",
//     });
//   }
// });

module.exports = router;
