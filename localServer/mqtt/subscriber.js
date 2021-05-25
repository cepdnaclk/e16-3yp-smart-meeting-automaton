const mqtt = require("mqtt");
const jwt = require("jsonwebtoken");
const scheduleSchema = require("../models/schedule.model");
const {scheduleValidation} = require("../validation/shedule");

async function addSheduleDataBase({topic, data}) {
  if(topic.toString() == "LecRoom02/add"){
    const newData = new scheduleSchema({
      _id: data._id,
      roomName: data.roomName,
      subject: data.subject,
      startTime: new Date(data.startTime),
      endTime: new Date(data.endTime),
      userId: data.userId,
    });
    if(scheduleValidation(newData)){
      try {
        scheduleSchema.findById({
          _id: newData._id
        }, async (err, resultData)=>{
          if(err){
            console.log("Error in finding...");
          }
          else{
            if(resultData){
              console.log("There is a record Cannot save...");
            }else{
              const newSavedData = await newData.save();
              console.log("Saving success...");
            }
          }

        });
      } catch (err) {
        console.log("Error in saving...");
        throw (err);
      }
    }else{
      console.log("Validation failed...");
    }


  }
  else if(topic.toString() == "LecRoom02/delete"){
    try {
      scheduleSchema.findByIdAndDelete({
        _id: data._id
      }, async (err, resultData)=>{
        if(err){
          console.log("Error in finding...");
        }
        else{
          if(resultData){
            console.log("Deleted record...");
          }else{
            console.log("No such record...");
          }
        }
      });

    } catch (error) {
      console.log("Error in deleting...", error);
    }

  }
}

function subscribeClient({ roomName }) {
  var topic_add = roomName + "/add";
  var topic_delete = roomName + "/delete";

  const options = {
    clientId: roomName,
    clean: false,
    // username:"stev",
    // password:"passwrd",
  };

  const client = mqtt.connect("mqtt://test.mosquitto.org", options);
  // console.log("connected flag  "+client.connected);
  client.on("connect", function () {
    console.log("connected  " + client.connected);
    client.subscribe([topic_add, topic_delete], { qos: 1 });
    console.log("sebscribed your events", roomName);
    // client.subscribe(topic_s1,{qos:1});
  });

  function decodemsg(token) {
    const decoded = jwt.verify(token, "123");
    return decoded;
  }

  client.on("message",async function (topic, message, packet) {
    // console.log("message  " + message);
    const msgDecoded = decodemsg(message.toString());
    await addSheduleDataBase({
      topic:topic,
      data: message
    });
    console.log("message decoded " + message.toString());//decodemsg(message.toString()));
    console.log("topic is " + topic);
  });
}

subscribeClient({ roomName: "LecRoom02" });
