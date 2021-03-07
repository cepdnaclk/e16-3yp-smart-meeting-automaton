const mqtt = require("mqtt");
const jwt = require("jsonwebtoken");

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

  client.on("message", function (topic, message, packet) {
    // console.log("message  " + message);
    console.log("message decoded " + decodemsg(message.toString()));
    console.log("topic is " + topic);
  });
}

subscribeClient({ roomName: "room10" });
