"use strict";

var express = require("express"); //init


var router = express.Router(); //bcryptjs

var bcryptjs = require("bcryptjs"); // //module administrator
// const Administrator = require('../modules/administrator.model');
//module user


var userSchema = require("../modules/user.model"); //newuser model


var newUserschema = require("../modules/newUser.model"); // //module request
// const requestSchema = require('../modules/userRequest.model');
//module room


var roomschema = require("../modules/lecRoom.model"); //model ac


var acschema = require("../modules/ac.model"); //model projector


var projectorschema = require("../modules/projectors.model"); //model schedule


var scheduleschema = require("../modules/schedule.model"); //autheratazation


var _require = require("../middleware/authenticate"),
    authAdmin = _require.authAdmin,
    authUser = _require.authUser; //validation


var _require2 = require("../validation/user"),
    newUserValidation = _require2.newUserValidation; //validation room


var _require3 = require("../validation/room"),
    roomValidation = _require3.roomValidation; //validation ac


var _require4 = require("../validation/ac"),
    acValidation = _require4.acValidation; //projector validation


var _require5 = require("../validation/projector"),
    projectorValidation = _require5.projectorValidation; //schedule validation


var _require6 = require("../validation/schedule"),
    scheduleValidation = _require6.scheduleValidation,
    schedulCalendarApiValidation = _require6.schedulCalendarApiValidation; // //auth
// const { userFreshAuth } = require('../middleware/auth');
//email


var _require7 = require("../middleware/email"),
    sendMailVerification = _require7.sendMailVerification; //calendar api


var _require8 = require("../middleware/calendarApi"),
    addEvent = _require8.addEvent,
    editEvent = _require8.editEvent,
    deleteEvent = _require8.deleteEvent,
    getEventListAll = _require8.getEventListAll;

var lecRoom = require("../modules/lecRoom.model");

var _require9 = require("../controlers/mqtt"),
    sendMqttNew = _require9.sendMqttNew,
    sendMqttinit = _require9.sendMqttinit;

var _require10 = require("express"),
    json = _require10.json; //authAdmin, verifyAdmin,


router.post("/adduser", newUserValidation, function _callee(req, res) {
  var salt, hashPassword, newUser, doc, singnUpUrl;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(bcryptjs.genSalt(10));

        case 3:
          salt = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(bcryptjs.hash(req.body.OTP, salt));

        case 6:
          hashPassword = _context.sent;
          newUser = new newUserschema({
            userId: req.body.userId,
            OTP: hashPassword,
            userName: req.body.userName,
            email: req.body.email,
            phone: req.body.phone
          });
          _context.next = 10;
          return regeneratorRuntime.awrap(newUser.save());

        case 10:
          doc = _context.sent;
          console.log("saved user to the db...");

          try {
            singnUpUrl = "http://localhost:5000/signup";
            console.log(singnUpUrl);
            sendMailVerification(doc.email, singnUpUrl).then(function () {
              res.status(200).json({
                message: "User added success"
              });
            })["catch"](function (err) {
              console.log(err);
              res.status(400).json({
                Error: err
              });
            });
          } catch (error) {
            console.log(error);
            res.status(400).json({
              Error: "Failed sending mail : " + error
            });
          }

          _context.next = 19;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](0);
          console.log("Saving faild...", _context.t0);
          res.status(400).json({
            error: "Saving error"
          });

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 15]]);
});
router.get("/table", function _callee2(req, res) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          //authAdmin,
          try {
            roomschema.find({}, function (err, data) {
              if (err) {
                console.log("Error in get room");
                res.status(401).send("Cannot find");
              }

              console.log("Send data");
              res.send(data);
            });
          } catch (error) {
            console.log("Error in get room", error);
            res.status(401).send("Cannot find");
          }

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // router.post("/get/roomCompData", async (req, res) => {
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

router.post("/get/roomCompData", function _callee6(req, res) {
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          console.log(req.body.roomName);

          try {
            roomschema.findOne({
              roomName: req.body.roomName
            }, function _callee5(err, resultRoom) {
              return regeneratorRuntime.async(function _callee5$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      console.log(resultRoom);

                      if (err) {
                        console.log("Error in get room");
                        res.status(401).send("Cannot find");
                      } else {
                        if (resultRoom) {
                          try {
                            console.log(resultRoom.acId);
                            acschema.find({
                              compId: {
                                $in: resultRoom.acId
                              }
                            }, function _callee4(errac, resultAcList) {
                              return regeneratorRuntime.async(function _callee4$(_context4) {
                                while (1) {
                                  switch (_context4.prev = _context4.next) {
                                    case 0:
                                      if (errac) {
                                        console.log("Error in get room");
                                        res.status(401).json({
                                          error: "Cannot find"
                                        });
                                      } else {
                                        try {
                                          projectorschema.find({
                                            compId: {
                                              $in: resultRoom.projectorId
                                            }
                                          }, function _callee3(errproj, resultProjList) {
                                            return regeneratorRuntime.async(function _callee3$(_context3) {
                                              while (1) {
                                                switch (_context3.prev = _context3.next) {
                                                  case 0:
                                                    if (errproj) {
                                                      console.log("Error in get room");
                                                      res.status(401).json({
                                                        error: "Cannot find"
                                                      });
                                                    } else {
                                                      // const sendList = [
                                                      // resultAcList.concat(resultProjList);
                                                      console.log("bye", {
                                                        ac: resultAcList,
                                                        proj: resultProjList
                                                      });
                                                      res.status(200).json({
                                                        ac: resultAcList,
                                                        proj: resultProjList
                                                      });
                                                    }

                                                  case 1:
                                                  case "end":
                                                    return _context3.stop();
                                                }
                                              }
                                            });
                                          });
                                        } catch (error) {
                                          console.log("Error in db");
                                          res.status(401).json({
                                            error: "Error in db"
                                          });
                                        }
                                      }

                                    case 1:
                                    case "end":
                                      return _context4.stop();
                                  }
                                }
                              });
                            });
                          } catch (error) {
                            console.log("Error in db");
                            res.status(401).json({
                              error: "Error in db"
                            });
                          }
                        } else {
                          console.log("No room", resultRoom);
                          res.status(401).json({
                            error: "No room"
                          });
                        } // console.log("send room data", resultRoom);
                        // res.status(200).json(resultRoom);

                      }

                    case 2:
                    case "end":
                      return _context5.stop();
                  }
                }
              });
            });
          } catch (error) {
            console.log("Error in DB");
            res.status(401).send("Error in DB");
          }

        case 2:
        case "end":
          return _context6.stop();
      }
    }
  });
});
router.post("/update/room", function _callee7(req, res) {
  var compType, ac, acsaved, projector, projectorsaved;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          console.log(req.body.roomName);
          console.log(req.body.acId);
          console.log(req.body.projectorId);
          console.log(req.body.roomName);

          if (!(req.body.category.toLowerCase() === "ac" || req.body.category.toLowerCase() === "projecter")) {
            _context7.next = 38;
            break;
          }

          compType = "acId";

          if (!(req.body.category.toLowerCase() === "ac")) {
            _context7.next = 23;
            break;
          }

          ac = new acschema({
            roomName: req.body.roomName,
            brand: req.body.brand,
            model: req.body.model,
            compId: req.body.roomName + "_" + req.body.compId
          });
          _context7.prev = 9;
          _context7.next = 12;
          return regeneratorRuntime.awrap(ac.save());

        case 12:
          acsaved = _context7.sent;
          console.log("saved ac to the db..."); // res.send(acsaved._id);

          try {
            roomschema.updateOne({
              roomName: req.body.roomName
            }, {
              $push: {
                acId: req.body.roomName + "_" + req.body.compId
              }
            }, function (err, updteResult) {
              if (err) {
                console.log("update room faild...", err);
                res.status(400).json({
                  error: "updateRoom error"
                });
              } else {
                console.log("update room seccess...", updteResult);
                res.status(200).json({
                  msg: "seccess"
                });
              }
            });
          } catch (error) {
            console.log("update room faild...", error);
            res.status(400).json({
              error: "updateRoom error"
            });
          }

          _context7.next = 21;
          break;

        case 17:
          _context7.prev = 17;
          _context7.t0 = _context7["catch"](9);
          console.log("Saving faild...", _context7.t0);
          res.send({
            error: "Saving error"
          });

        case 21:
          _context7.next = 36;
          break;

        case 23:
          // compType = "projectorId";
          projector = new projectorschema({
            roomName: req.body.roomName,
            brand: req.body.brand,
            model: req.body.model,
            compId: req.body.roomName + "_" + req.body.compId
          });
          _context7.prev = 24;
          _context7.next = 27;
          return regeneratorRuntime.awrap(projector.save());

        case 27:
          projectorsaved = _context7.sent;
          console.log("saved projector to the db...");

          try {
            roomschema.updateOne({
              roomName: req.body.roomName
            }, {
              $push: {
                projectorId: req.body.roomName + "_" + req.body.compId
              }
            }, function (err, updteResult) {
              if (err) {
                console.log("update room faild...", err);
                res.status(400).json({
                  error: "updateRoom error"
                });
              } else {
                console.log("update room seccess...", updteResult);
                res.status(200).json({
                  msg: "seccess"
                });
              }
            });
          } catch (error) {
            console.log("update room faild...", error);
            res.status(400).json({
              error: "updateRoom error"
            });
          } // res.send(projectorsaved._id);


          _context7.next = 36;
          break;

        case 32:
          _context7.prev = 32;
          _context7.t1 = _context7["catch"](24);
          console.log("Saving faild...", _context7.t1);
          res.status(400).json({
            error: "Saving error"
          });

        case 36:
          _context7.next = 40;
          break;

        case 38:
          console.log("cannot add category...");
          res.status(400).json({
            error: "cannot add category"
          });

        case 40:
          _context7.next = 46;
          break;

        case 42:
          _context7.prev = 42;
          _context7.t2 = _context7["catch"](0);
          console.log("Failed server...", _context7.t2);
          res.status(400).json({
            error: "Failed server"
          });

        case 46:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 42], [9, 17], [24, 32]]);
}); // router.post("/update/room", async (req, res) => {
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

router.post("/add/calendarapi", authAdmin, schedulCalendarApiValidation, function _callee9(req, res) {
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          try {
            scheduleschema.findById(req.body.id, function _callee8(err, result) {
              var event, _ref, _err, apiResult;

              return regeneratorRuntime.async(function _callee8$(_context8) {
                while (1) {
                  switch (_context8.prev = _context8.next) {
                    case 0:
                      if (!err) {
                        _context8.next = 4;
                        break;
                      }

                      res.status(400).json({
                        Error: "Try again"
                      });
                      _context8.next = 23;
                      break;

                    case 4:
                      if (!result) {
                        _context8.next = 21;
                        break;
                      }

                      _context8.prev = 5;
                      event = {
                        id: result.id,
                        summary: "Lecture",
                        location: "University of peradeniya, sri lanka",
                        description: result.subject + "Lecture in " + result.roomName + " conduct by " + result.userName,
                        start: {
                          dateTime: req.body.start // timeZone: 'Sri Lanka/Sri Jayawardenepura Kotte',

                        },
                        end: {
                          dateTime: req.body.end // timeZone: 'UTC/GMT',

                        },
                        reminders: {
                          useDefault: false,
                          overrides: [{
                            method: "email",
                            minutes: 30 * 60
                          }, {
                            method: "popup",
                            minutes: 15
                          }]
                        }
                      };
                      _context8.next = 9;
                      return regeneratorRuntime.awrap(addEvent(event));

                    case 9:
                      _ref = _context8.sent;
                      _err = _ref.err;
                      apiResult = _ref.apiResult;

                      if (_err) {
                        console.log("There was an error contacting the Calendar service: " + _err);
                        res.status(400).json({
                          Error: "Inserting calendar api error",
                          apiError: _err,
                          id: result._id
                        });
                      } else {
                        console.log("Successfully inserted");
                        res.status(200).json({
                          Data: apiResult.data
                        });
                      }

                      _context8.next = 19;
                      break;

                    case 15:
                      _context8.prev = 15;
                      _context8.t0 = _context8["catch"](5);
                      console.log("There was an error contacting the Calendar service: " + _context8.t0);
                      res.status(400).json({
                        Error: "Inserting calendar api error",
                        apiError: _context8.t0,
                        id: result._id
                      });

                    case 19:
                      _context8.next = 23;
                      break;

                    case 21:
                      console.log("Failed. there is no such schedule");
                      res.status(400).json({
                        Error: "there is no such schedule"
                      });

                    case 23:
                    case "end":
                      return _context8.stop();
                  }
                }
              }, null, null, [[5, 15]]);
            });
          } catch (error) {
            console.log("Failed. Database conct failed");
            res.status(400).json({
              Error: " Database conct failed"
            });
          }

        case 1:
        case "end":
          return _context9.stop();
      }
    }
  });
});
router["delete"]("/delete/schedule/:id", function _callee11(req, res) {
  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          //authAdmin
          console.log(req.params.id);

          try {
            scheduleschema.findByIdAndDelete(req.params.id, function _callee10(err, result) {
              var mqttData, mqttTopic, _ref2, _err2, resultCalApi;

              return regeneratorRuntime.async(function _callee10$(_context10) {
                while (1) {
                  switch (_context10.prev = _context10.next) {
                    case 0:
                      _context10.prev = 0;

                      if (!err) {
                        _context10.next = 5;
                        break;
                      }

                      res.status(400).json({
                        Error: "Try again"
                      });
                      _context10.next = 29;
                      break;

                    case 5:
                      if (!result) {
                        _context10.next = 28;
                        break;
                      }

                      try {
                        mqttData = result._id.toJSON(); //JSON(result._id)

                        mqttTopic = result.roomName + "/" + "delete";
                        sendMqttNew({
                          data: mqttData,
                          topic: mqttTopic
                        });
                      } catch (error) {
                        console.log("mqttfail");
                        console.log(error);
                        console.log("mqttfail");
                      }

                      _context10.prev = 7;
                      _context10.next = 10;
                      return regeneratorRuntime.awrap(deleteEvent({
                        eventId: req.params.id
                      }));

                    case 10:
                      _ref2 = _context10.sent;
                      _err2 = _ref2.err;
                      resultCalApi = _ref2.resultCalApi;

                      if (!_err2) {
                        _context10.next = 19;
                        break;
                      }

                      console.log("Alredy deleted : " + _err2);
                      res.status(400).json({
                        Error: "Alredy deleted : " + _err2
                      });
                      return _context10.abrupt("return");

                    case 19:
                      if (resultCalApi) {
                        console.log("deleted", resultCalApi);
                        res.status(200).json({
                          message: "Successfully deleted"
                        });
                      } else {
                        console.log("deleted ");
                        res.status(200).json({
                          message: "Successfully deleted "
                        });
                      }

                    case 20:
                      _context10.next = 26;
                      break;

                    case 22:
                      _context10.prev = 22;
                      _context10.t0 = _context10["catch"](7);
                      console.log("Error in conncting calendar api: ", _context10.t0);
                      res.status(400).json({
                        Error: "Try again"
                      });

                    case 26:
                      _context10.next = 29;
                      break;

                    case 28:
                      res.status(400).json({
                        Error: "No such schedule. check id"
                      });

                    case 29:
                      _context10.next = 37;
                      break;

                    case 31:
                      _context10.prev = 31;
                      _context10.t1 = _context10["catch"](0);
                      console.log("Failed.");
                      console.log(_context10.t1);
                      console.log("Failed.");
                      res.status(400).json({
                        Error: "failed" + _context10.t1
                      });

                    case 37:
                    case "end":
                      return _context10.stop();
                  }
                }
              }, null, null, [[0, 31], [7, 22]]);
            });
          } catch (error) {
            console.log("Failed. Database conct failed");
            res.status(400).json({
              Error: " Database conct failed" + error
            });
          }

        case 2:
        case "end":
          return _context11.stop();
      }
    }
  });
});
router.post("/rooms/status", function _callee12(req, res) {
  var startT, endT, resultCalApi, roomStateList, lecRoomList, scheduleListId;
  return regeneratorRuntime.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          startT = new Date();
          endT = new Date(new Date(startT.getTime() + 10 * 60000).toISOString());
          _context12.next = 5;
          return regeneratorRuntime.awrap(getEventListAll({
            startTime: startT,
            endTime: endT
          }));

        case 5:
          resultCalApi = _context12.sent;
          console.log(resultCalApi.data.items.length);

          try {
            roomStateList = [];
            lecRoomList = [];
            scheduleListId = [];
            resultCalApi.data.items.forEach(function (element) {
              lecRoomList.push(element.location);
              scheduleListId.push(element.id);
            });
            lecRoom.find({
              roomName: {
                $nin: lecRoomList
              }
            }, function (err, result) {
              if (err) {
                res.status(400).json({
                  Error: "Try again"
                });
              } else {
                result.forEach(function (element) {
                  roomStateList.push({
                    roomName: element.roomName,
                    state: false
                  }); // if(lecRoomList.includes(element.roomName)){
                  //     element.state = true;
                  // }
                  // else{
                  //     element.state = false;
                  // }
                });

                try {
                  scheduleschema.find({
                    _id: {
                      $in: scheduleListId
                    }
                  }, function (err, resultSchedule) {
                    if (err) {
                      console.log("Error in DB connect");
                      res.status(400).json({
                        Error: "Try again"
                      });
                    } else {
                      resultSchedule.forEach(function (element) {
                        roomStateList.push({
                          roomName: element.roomName,
                          state: true,
                          startTime: element.startTime,
                          endTime: element.endTime,
                          userId: element.userId,
                          subject: element.subject
                        });
                      });
                      console.log("success.");
                      res.status(200).json(roomStateList);
                    }
                  });
                } catch (error) {
                  console.log("Error in DB connect");
                  res.status(400).json({
                    Error: "Try again"
                  });
                }
              }
            });
          } catch (error) {
            console.log("Error in DB connect");
            res.status(400).json({
              Error: "Try again"
            });
          }

          _context12.next = 14;
          break;

        case 10:
          _context12.prev = 10;
          _context12.t0 = _context12["catch"](0);
          console.log("Error in Api connect");
          res.status(400).json({
            Error: "Try again"
          });

        case 14:
        case "end":
          return _context12.stop();
      }
    }
  }, null, null, [[0, 10]]);
});
router.post("/free/rooms/custom", function _callee13(req, res) {
  var startT, endT, resultCalApi, lrcRoomList;
  return regeneratorRuntime.async(function _callee13$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          startT = new Date(new Date(req.body.date + "T" + req.body.startTime).toISOString());
          endT = new Date(new Date(req.body.date + "T" + req.body.endTime).toISOString());
          _context13.next = 5;
          return regeneratorRuntime.awrap(getEventListAll({
            startTime: startT,
            endTime: endT
          }));

        case 5:
          resultCalApi = _context13.sent;
          console.log(resultCalApi.data.items.length);

          try {
            lrcRoomList = [];
            resultCalApi.data.items.forEach(function (element) {
              lrcRoomList.push(element.location);
            });
            lecRoom.find({
              roomName: {
                $nin: lrcRoomList
              }
            }, function (err, result) {
              if (err) {
                res.status(400).json({
                  Error: "Try again"
                });
              } else {
                res.send(result);
              }
            });
          } catch (error) {
            console.log("Error in DB connect");
            res.status(400).json({
              Error: "Try again"
            });
          }

          _context13.next = 14;
          break;

        case 10:
          _context13.prev = 10;
          _context13.t0 = _context13["catch"](0);
          console.log("Error in Api connect");
          res.status(400).json({
            Error: "Try again"
          });

        case 14:
        case "end":
          return _context13.stop();
      }
    }
  }, null, null, [[0, 10]]);
});
router.post("/free/rooms", function _callee14(req, res) {
  var startT, endT, resultCalApi, lrcRoomList;
  return regeneratorRuntime.async(function _callee14$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          startT = new Date(new Date(req.body.date + "T" + req.body.startTime).toISOString());
          endT = new Date(new Date(startT.getTime() + 10 * 60000).toISOString());
          _context14.next = 5;
          return regeneratorRuntime.awrap(getEventListAll({
            startTime: startT,
            endTime: endT
          }));

        case 5:
          resultCalApi = _context14.sent;
          console.log(resultCalApi.data.items.length);

          try {
            lrcRoomList = [];
            resultCalApi.data.items.forEach(function (element) {
              lrcRoomList.push(element.location);
            });
            lecRoom.find({
              roomName: {
                $nin: lrcRoomList
              }
            }, function (err, result) {
              if (err) {
                res.status(400).json({
                  Error: "Try again"
                });
              } else {
                res.send(result);
              }
            });
          } catch (error) {
            console.log("Error in DB connect");
            res.status(400).json({
              Error: "Try again"
            });
          }

          _context14.next = 14;
          break;

        case 10:
          _context14.prev = 10;
          _context14.t0 = _context14["catch"](0);
          console.log("Error in Api connect");
          res.status(400).json({
            Error: "Try again"
          });

        case 14:
        case "end":
          return _context14.stop();
      }
    }
  }, null, null, [[0, 10]]);
}); //get all schedule past

router.post("/get/schedule/user", function _callee15(req, res) {
  return regeneratorRuntime.async(function _callee15$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          try {
            scheduleschema.find({
              userId: req.body.userId
            }).sort({
              startTime: 1
            }).exec(function (err, docs) {
              if (err) {
                res.status(400).json({
                  Error: "Try again"
                });
              } else {
                res.send(docs);
              }
            });
          } catch (error) {
            console.log("DB connect faild...", error);
            res.status(400).json({
              Error: "DB connect faild errror : " + error
            });
          }

        case 1:
        case "end":
          return _context15.stop();
      }
    }
  });
}); //authUser,
//get schedul from now all

router.post("/get/schedule/all", function _callee16(req, res) {
  var resultCalApi, idList;
  return regeneratorRuntime.async(function _callee16$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          _context16.prev = 0;
          _context16.next = 3;
          return regeneratorRuntime.awrap(getEventListAll({}));

        case 3:
          resultCalApi = _context16.sent;
          console.log(resultCalApi.data.items.length);

          if (resultCalApi.data.items.length > 0) {
            try {
              idList = [];
              resultCalApi.data.items.forEach(function (element) {
                idList.push(element.id);
              });
              scheduleschema.find({
                _id: {
                  $in: idList
                },
                userId: req.body.userId
              }).sort({
                startTime: 1
              }).exec(function (err, docs) {
                if (err) {
                  res.status(400).json({
                    Error: "Try again"
                  });
                } else {
                  res.send(docs);
                }
              });
            } catch (error) {
              console.log("Db access faild...", error);
              res.send({
                Error: "Data base error : " + error
              });
            }
          } else {
            console.log("No schedule");
            res.status(400).json({
              Error: "No schedule : "
            });
          }

          _context16.next = 12;
          break;

        case 8:
          _context16.prev = 8;
          _context16.t0 = _context16["catch"](0);
          console.log("Calendar api faild...", _context16.t0);
          res.status(400).json({
            Error: "Calenadar api errror : " + _context16.t0
          });

        case 12:
        case "end":
          return _context16.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
router.post("/get/schedule/user/all", function _callee17(req, res) {
  var startT, endT, resultCalApi, idList;
  return regeneratorRuntime.async(function _callee17$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          _context17.prev = 0;
          // if(req.body.startTime != 'undefined'){
          // }
          startT = new Date();
          endT = new Date(new Date(startT.getTime() + 300 * 24 * 60 * 60000).toISOString());
          _context17.next = 5;
          return regeneratorRuntime.awrap(getEventListAll({
            startTime: startT,
            endTime: endT
          }));

        case 5:
          resultCalApi = _context17.sent;
          console.log(resultCalApi.data.items.length);

          if (resultCalApi.data.items.length > 0) {
            try {
              idList = [];
              resultCalApi.data.items.forEach(function (element) {
                idList.push(element.id);
              });
              scheduleschema.find({
                _id: {
                  $in: idList
                },
                userId: req.body.userId
              }).sort({
                startTime: 1
              }).exec(function (err, docs) {
                if (err) {
                  res.status(400).json({
                    Error: "Try again"
                  });
                } else {
                  res.send(docs);
                }
              });
            } catch (error) {
              console.log("Db access faild...", error);
              res.send({
                Error: "Data base error : " + error
              });
            }
          } else {
            console.log("No schedule");
            res.status(400).json({
              Error: "No schedule : "
            });
          }

          _context17.next = 14;
          break;

        case 10:
          _context17.prev = 10;
          _context17.t0 = _context17["catch"](0);
          console.log("Calendar api faild...", _context17.t0);
          res.status(400).json({
            Error: "Calenadar api errror : " + _context17.t0
          });

        case 14:
        case "end":
          return _context17.stop();
      }
    }
  }, null, null, [[0, 10]]);
}); //authUser,
//get schedul by date all

router.post("/get/schedule/date", function _callee18(req, res) {
  var startT, endT, resultCalApi, idList;
  return regeneratorRuntime.async(function _callee18$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          _context18.prev = 0;
          // if(req.body.startTime != 'undefined'){
          // }
          startT = new Date(req.body.date + "T" + "00:00:00+05:30");
          endT = new Date(req.body.date + "T" + "23:59:00+05:30");
          _context18.next = 5;
          return regeneratorRuntime.awrap(getEventListAll({
            startTime: startT,
            endTime: endT
          }));

        case 5:
          resultCalApi = _context18.sent;
          console.log(resultCalApi.data.items.length);

          if (resultCalApi.data.items.length > 0) {
            try {
              idList = [];
              resultCalApi.data.items.forEach(function (element) {
                idList.push(element.id);
              });
              scheduleschema.find({
                _id: {
                  $in: idList
                },
                roomName: req.body.roomName
              }).sort({
                startTime: 1
              }).exec(function (err, docs) {
                if (err) {
                  res.status(400).json({
                    Error: "Try again"
                  });
                } else {
                  res.send(docs);
                }
              });
            } catch (error) {
              console.log("Db access faild...", error);
              res.send({
                Error: "Data base error : " + error
              });
            }
          } else {
            console.log("No schedule");
            res.status(400).json({
              Error: "No schedule : "
            });
          }

          _context18.next = 14;
          break;

        case 10:
          _context18.prev = 10;
          _context18.t0 = _context18["catch"](0);
          console.log("Calendar api faild...", _context18.t0);
          res.status(400).json({
            Error: "Calenadar api errror : " + _context18.t0
          });

        case 14:
        case "end":
          return _context18.stop();
      }
    }
  }, null, null, [[0, 10]]);
}); //authAdmin,

router.get("/get/schedule", function _callee19(req, res) {
  return regeneratorRuntime.async(function _callee19$(_context19) {
    while (1) {
      switch (_context19.prev = _context19.next) {
        case 0:
          try {
            scheduleschema.find({}, function (err, result) {
              if (err) {
                res.status(400).json({
                  Error: "Try again"
                });
              } else {
                res.send(result);
              }
            });
          } catch (error) {
            console.log("Failed. Database connect failed");
            res.status(400).json({
              Error: " Database conct failed" + error
            });
          }

        case 1:
        case "end":
          return _context19.stop();
      }
    }
  });
}); //authAdmin,

router.post("/add/schedule", scheduleValidation, function _callee22(req, res) {
  return regeneratorRuntime.async(function _callee22$(_context22) {
    while (1) {
      switch (_context22.prev = _context22.next) {
        case 0:
          scheduleschema.find({
            roomName: req.body.roomName // subject: req.body.subject,
            // startTime: req.body.startTime,
            // endTime: req.body.endTime,
            // userName: req.body.userName

          }, function _callee21(err, result) {
            var newSchedule;
            return regeneratorRuntime.async(function _callee21$(_context21) {
              while (1) {
                switch (_context21.prev = _context21.next) {
                  case 0:
                    if (err) {
                      res.status(400).json({
                        Error: "Try again"
                      });
                    } else {
                      try {
                        if (result.length > 0) {
                          console.log("arry : ", result);
                          result.forEach(function (element) {
                            var dateStart = new Date(element.startTime);
                            var dateStartNew = new Date(req.body.date + "T" + req.body.startTime);
                            var dateEnd = new Date(element.endTime);
                            var dateEndNew = new Date(req.body.date + "T" + req.body.endTime);

                            if (dateStartNew >= dateStart && dateStartNew <= dateEnd || dateEndNew >= dateStart && dateEndNew <= dateEnd || dateStartNew > dateEndNew) {
                              console.log(dateStartNew >= dateStart && dateStartNew <= dateEnd);
                              console.log(dateEndNew >= dateStart && dateEndNew <= dateEnd);
                              console.log(dateStartNew > dateEndNew);
                              throw new Error("Already exist evint...");
                            }

                            console.log("here"); // if(((dateStart > dateStartNew)&&(dateStart < dateEndNew))||((dateStart < dateStartNew)&&(dateEnd > dateEndNew))){
                            // }
                          });
                        }

                        console.log("...");
                        newSchedule = new scheduleschema({
                          roomName: req.body.roomName,
                          subject: req.body.subject,
                          startTime: new Date(req.body.date + "T" + req.body.startTime),
                          endTime: new Date(req.body.date + "T" + req.body.endTime),
                          userId: req.body.userId
                        });

                        try {
                          newSchedule.save(function _callee20(err, result) {
                            var mqttData, mqttTopic, eventBody, _ref3, _err3, apiResult;

                            return regeneratorRuntime.async(function _callee20$(_context20) {
                              while (1) {
                                switch (_context20.prev = _context20.next) {
                                  case 0:
                                    if (!err) {
                                      _context20.next = 5;
                                      break;
                                    }

                                    console.log("Saving faild...", err);
                                    res.status(400).json({
                                      Error: "saving feild. try again"
                                    });
                                    _context20.next = 21;
                                    break;

                                  case 5:
                                    try {
                                      mqttData = result.toJSON();
                                      mqttTopic = result.roomName + "/" + "add";
                                      sendMqttNew({
                                        data: mqttData,
                                        topic: mqttTopic
                                      });
                                    } catch (error) {
                                      console.log("mqtt error");
                                      console.log(error);
                                      console.log("mqtt error");
                                    } // const startT = ;
                                    // const endT = ;


                                    eventBody = {
                                      id: result._id,
                                      summary: "Lecture",
                                      location: "University of peradeniya, sri lanka",
                                      description: result.subject + " Lecture in " + result.roomName + " conduct by " + result.userName,
                                      start: {
                                        dateTime: new Date(req.body.date + "T" + req.body.startTime).toISOString()
                                      },
                                      end: {
                                        dateTime: new Date(req.body.date + "T" + req.body.endTime).toISOString()
                                      },
                                      reminders: {
                                        useDefault: false,
                                        overrides: [{
                                          method: "email",
                                          minutes: 30 * 60
                                        }, {
                                          method: "popup",
                                          minutes: 15
                                        }]
                                      }
                                    };
                                    console.log(eventBody);
                                    _context20.prev = 8;
                                    _context20.next = 11;
                                    return regeneratorRuntime.awrap(addEvent({
                                      eventData: eventBody
                                    }));

                                  case 11:
                                    _ref3 = _context20.sent;
                                    _err3 = _ref3.err;
                                    apiResult = _ref3.apiResult;

                                    if (_err3) {
                                      console.log("There was an error contacting the Calendar service: " + _err3);
                                      res.status(400).json({
                                        Error: "Inserted to database but calendar api error",
                                        apiError: _err3,
                                        id: result._id
                                      });
                                    } else {
                                      console.log("Successfully inserted");
                                      res.status(200).json({
                                        msg: "added",
                                        Data: apiResult
                                      });
                                    }

                                    _context20.next = 21;
                                    break;

                                  case 17:
                                    _context20.prev = 17;
                                    _context20.t0 = _context20["catch"](8);
                                    console.log("Calendar api insert faild ", _context20.t0);
                                    res.status(200).json({
                                      Error: _context20.t0
                                    });

                                  case 21:
                                  case "end":
                                    return _context20.stop();
                                }
                              }
                            }, null, null, [[8, 17]]);
                          });
                        } catch (error) {
                          console.log("Saving faild...", error);
                          res.status(400).json({
                            Error: "Saving error" + error
                          });
                        }
                      } catch (error) {
                        console.log("Already exist event...");
                        res.status(400).json({
                          Error: "Saving error" + error
                        });
                      }
                    }

                  case 1:
                  case "end":
                    return _context21.stop();
                }
              }
            });
          });

        case 1:
        case "end":
          return _context22.stop();
      }
    }
  });
});
router.post("/add/room", roomValidation, function _callee24(req, res) {
  return regeneratorRuntime.async(function _callee24$(_context24) {
    while (1) {
      switch (_context24.prev = _context24.next) {
        case 0:
          //authAdmin,
          console.log("add room");

          try {
            roomschema.findOne({
              roomId: req.body.roomName
            }, function _callee23(err, data) {
              var room, roomsaved;
              return regeneratorRuntime.async(function _callee23$(_context23) {
                while (1) {
                  switch (_context23.prev = _context23.next) {
                    case 0:
                      if (!err) {
                        _context23.next = 4;
                        break;
                      }

                      res.send("Try again...");
                      _context23.next = 22;
                      break;

                    case 4:
                      if (!data) {
                        _context23.next = 8;
                        break;
                      }

                      res.send("Already exist...");
                      _context23.next = 22;
                      break;

                    case 8:
                      try {
                        sendMqttinit(req.body.roomName);
                      } catch (error) {
                        console.log("mqtt fail");
                        console.log(error);
                        console.log("mqtt fail");
                      }

                      room = new roomschema({
                        roomName: req.body.roomName,
                        controlUnitId: req.body.controlUnitId,
                        acId: [],
                        projectorId: []
                      });
                      _context23.prev = 10;
                      _context23.next = 13;
                      return regeneratorRuntime.awrap(room.save());

                    case 13:
                      roomsaved = _context23.sent;
                      console.log("saved room to the db...");
                      res.send(roomsaved);
                      _context23.next = 22;
                      break;

                    case 18:
                      _context23.prev = 18;
                      _context23.t0 = _context23["catch"](10);
                      console.log("Saving faild...", _context23.t0);
                      res.send({
                        error: "Saving error"
                      });

                    case 22:
                    case "end":
                      return _context23.stop();
                  }
                }
              }, null, null, [[10, 18]]);
            });
          } catch (error) {
            console.log("DB connect fail...", error);
            res.send({
              Error: "DB connect fail..." + error
            });
          }

        case 2:
        case "end":
          return _context24.stop();
      }
    }
  });
});
router.get("/room/:id", authAdmin, function _callee25(req, res) {
  return regeneratorRuntime.async(function _callee25$(_context25) {
    while (1) {
      switch (_context25.prev = _context25.next) {
        case 0:
          try {
            roomschema.findOne({
              _id: req.params.id
            }, function (err, data) {
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
              Error: "DB connect fail..." + error
            });
          }

        case 1:
        case "end":
          return _context25.stop();
      }
    }
  });
});
router["delete"]("/deleteroom/:id", authAdmin, function _callee26(req, res) {
  return regeneratorRuntime.async(function _callee26$(_context26) {
    while (1) {
      switch (_context26.prev = _context26.next) {
        case 0:
          // console.log(req.params.id);
          try {
            roomschema.findOneAndDelete({
              _id: req.params.id
            }, function (err, data) {
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
              Error: "DB connect fail..." + error
            });
          }

        case 1:
        case "end":
          return _context26.stop();
      }
    }
  });
});
router["delete"]("/removeuser/:id", authAdmin, function _callee27(req, res) {
  return regeneratorRuntime.async(function _callee27$(_context27) {
    while (1) {
      switch (_context27.prev = _context27.next) {
        case 0:
          try {
            userSchema.findOneAndDelete({
              userId: req.params.id
            }, function (err, data) {
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
              Error: "DB connect fail...Try again" + error
            });
          }

        case 1:
        case "end":
          return _context27.stop();
      }
    }
  });
}); //404

router.use(function (req, res) {
  res.status(404).send("404");
  console.log("4040");
}); // router.post("/mqtt/add", async(req, res)=>{
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