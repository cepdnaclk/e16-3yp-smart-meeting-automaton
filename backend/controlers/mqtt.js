const jwt = require('jsonwebtoken');
const mqtt = require('mqtt');
//configer env veriable
// const dotenv = require('dotenv').config();
// if (dotenv.error) {
//     throw dotenv.error;
// }
function sendMqttinit({roomName}) {
    // const splitedTopic = topic.split('/');
    const options={
        clientId: process.env.MQTT_CLIENT,
        clean: false
        // username:"stev",
        // password:"passwrd",
    };
    
    var options_publish={
        retain: true,
        qos: 1
    };

    const data_add = "Hellow " + roomName + " Wellcom. You can get add updates...";
    const data_delete = "Hellow " + roomName + " Wellcom. You can get delete updates...";
    const topic_add = roomName + '/' + 'add';
    const topic_delete = roomName + '/' + 'delete';
    // const topic_list = [topic_add, topic_delete];
    const tokenizeData_add =  jwt.sign(data_add, process.env.MQTT);
    const tokenizeData_delete =  jwt.sign(data_delete, process.env.MQTT);
 
    const client = mqtt.connect("mqtt://test.mosquitto.org",options);
    console.log("connected flag  ", roomName);
    client.on("connect", function(){	
        console.log("connected  "+client.connected);
        if (client.connected==true){
            // setInterval(function(){
                client.publish(topic_add, tokenizeData_add, options_publish, ()=>{
                
                    console.log("Retain Masseage published to adding event");
                    client.end();

                });

                client.publish(topic_delete, tokenizeData_delete, options_publish, ()=>{
                
                    console.log("Retain Masseage published delete event");
                    client.end();

                })
            // ;},3000);
        }
    });

    client.on("error",function(error){
        console.log("Can't connect" + error);
        process.exit(1)
    });
}

function sendMqttNew({data, topic, isretain = false, isclean = false, qosLevel = 1}) {
    const splitedTopic = topic.split('/');
    const options={
        clientId: process.env.MQTT_CLIENT,
        clean: isclean
        // username:"stev",
        // password:"passwrd",
    };
    
    var options_publish={
        retain: false,
        qos: 1
    };

    // const topicPublish = clientId;
    const tokenizeData =  jwt.sign(data, process.env.MQTT);
 
    const client = mqtt.connect("mqtt://test.mosquitto.org",options);
    // console.log("connected flag  "+client.connected);
    client.on("connect", function(){	
        console.log("connected  "+client.connected);
        if (client.connected==true){
            // setInterval(function(){
                client.publish(topic, tokenizeData, options_publish, ()=>{
                
                console.log("Masseage published");
                client.end();

            })
            // ;},3000);
        }
    });

    client.on("error",function(error){
        console.log("Can't connect" + error);
        process.exit(1)
    });
}

module.exports = {sendMqttNew, sendMqttinit};
// const cli = sendMqttNew('01311', 'cli01');