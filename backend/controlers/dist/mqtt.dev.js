"use strict";

var jwt = require("jsonwebtoken");

var mqtt = require("mqtt"); //configer env veriable
// const dotenv = require('dotenv').config();
// if (dotenv.error) {
//     throw dotenv.error;
// }


function sendMqttinit(_ref) {
  var roomName = _ref.roomName;
  // const splitedTopic = topic.split('/');
  var options = {
    clientId: process.env.MQTT_CLIENT,
    clean: false // username:"stev",
    // password:"passwrd",

  };
  var options_publish = {
    retain: true,
    qos: 1
  };
  var data_add = "Hellow " + roomName + " Wellcom. You can get add updates...";
  var data_delete = "Hellow " + roomName + " Wellcom. You can get delete updates...";
  var topic_add = roomName + "/" + "add";
  var topic_delete = roomName + "/" + "delete"; // const topic_list = [topic_add, topic_delete];

  var tokenizeData_add = jwt.sign(data_add, process.env.MQTT);
  var tokenizeData_delete = jwt.sign(data_delete, process.env.MQTT);
  var client = mqtt.connect("mqtt://test.mosquitto.org", options);
  console.log("connected flag  ", roomName);
  client.on("connect", function () {
    console.log("connected  " + client.connected);

    if (client.connected == true) {
      // setInterval(function(){
      client.publish(topic_add, tokenizeData_add, options_publish, function () {
        console.log("Retain Masseage published to adding event");
        client.end();
      });
      client.publish(topic_delete, tokenizeData_delete, options_publish, function () {
        console.log("Retain Masseage published delete event");
        client.end();
      }); // ;},3000);
    }
  });
  client.on("error", function (error) {
    console.log("Can't connect" + error);
    process.exit(1);
  });
}

function sendMqttNew(_ref2) {
  var data = _ref2.data,
      topic = _ref2.topic,
      _ref2$isretain = _ref2.isretain,
      isretain = _ref2$isretain === void 0 ? false : _ref2$isretain,
      _ref2$isclean = _ref2.isclean,
      isclean = _ref2$isclean === void 0 ? false : _ref2$isclean,
      _ref2$qosLevel = _ref2.qosLevel,
      qosLevel = _ref2$qosLevel === void 0 ? 1 : _ref2$qosLevel;
  var splitedTopic = topic.split("/");
  var options = {
    clientId: process.env.MQTT_CLIENT,
    clean: isclean // username:"stev",
    // password:"passwrd",

  };
  var options_publish = {
    retain: false,
    qos: 1
  }; // const topicPublish = clientId;

  var tokenizeData = jwt.sign(data, process.env.MQTT);
  var client = mqtt.connect("mqtt://test.mosquitto.org", options); // console.log("connected flag  "+client.connected);

  client.on("connect", function () {
    console.log("connected  " + client.connected);

    if (client.connected == true) {
      // setInterval(function(){
      client.publish(topic, tokenizeData, options_publish, function () {
        console.log("Masseage published");
        client.end();
      }); // ;},3000);
    }
  });
  client.on("error", function (error) {
    console.log("Can't connect" + error);
    process.exit(1);
  });
}

module.exports = {
  sendMqttNew: sendMqttNew,
  sendMqttinit: sendMqttinit
}; // const cli = sendMqttNew('01311', 'cli01');