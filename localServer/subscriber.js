const mqtt = require('mqtt');
const jwt = require('jsonwebtoken');

var topic_s="cli01";

const client = mqtt.connect("mqtt://localhost:9999",options);
console.log("connected flag  "+client.connected);
client.on("connect",function(){	
    console.log("connected  "+client.connected);
	client.subscribe(topic_s,{qos:1});
});

function decodemsg(token) {
	const decoded = jwt.verify(token, 123);
	return decode;
	
}

client.on('message',function(topic, message, packet){
	console.log("message  "+ message);
	console.log("message decoded "+ decodemsg(message));
	console.log("topic is "+ topic);
});
