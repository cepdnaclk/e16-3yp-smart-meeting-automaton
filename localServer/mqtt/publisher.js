const mqtt = require('mqtt');

options={
    clientId:"mqttjs1",
    username:"stev",
    password:"passwrd",
    clean:true
};

const client = mqtt.connect("mqtt://test.mosquitto.org",options);
console.log("connected flag  "+client.connected);
client.on("connect",function(){	
    console.log("connected  "+client.connected);
    client.publish("LecRoom02/add", "test message",options);
    console.log('hey');
});

var options={
    retain:false,
    qos:1
};

if (client.connected==true){
    client.publish("LecRoom02/add", "testttt message",options);
    console.log('hey');
    }