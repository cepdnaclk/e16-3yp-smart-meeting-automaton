const mqtt = require('mqtt');

options={
    clientId:"mqttjs1",
    username:"stev",
    password:"passwrd",
    clean:true
};

const client = mqtt.connect("mqtt://localhost:9999",options);
console.log("connected flag  "+client.connected);
client.on("connect",function(){	
    console.log("connected  "+client.connected);
});

var options={
    retain:true,
    qos:1
};

if (client.connected==true){
    client.publish("testtopic", "test message",options);
    }