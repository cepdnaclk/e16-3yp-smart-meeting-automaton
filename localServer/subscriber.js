const mqtt = require('mqtt');

var topic_s="testtopic";

const client = mqtt.connect("mqtt://localhost:9999",options);
console.log("connected flag  "+client.connected);
client.on("connect",function(){	
    console.log("connected  "+client.connected);
});

client.subscribe(topic_s,{qos:2});

client.on('message',function(topic, message, packet){
	console.log("message is "+ message);
	console.log("topic is "+ topic);
});
