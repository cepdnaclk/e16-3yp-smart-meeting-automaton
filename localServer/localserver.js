const mqtt = require('mqtt');

options={
    clientId:"mqttjs1",
    username:"stev",
    password:"passwrd",
    clean:true
};

const client = mqtt.connect("mqtt://localhost:1883",options);
console.log("connected flag  "+client.connected);
client.on("connect",function(){	
    console.log("connected  "+client.connected);
});
// client.on("connect",function(){	
//     console.log("connected");
// });
client.on("error",function(error){
    console.log("Can't connect" + error);
    process.exit(1)});
// console.log('Errr');