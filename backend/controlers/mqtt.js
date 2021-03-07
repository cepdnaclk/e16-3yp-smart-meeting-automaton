const jwt = require('jsonwebtoken');
const mqtt = require('mqtt');
//configer env veriable
// const dotenv = require('dotenv').config();
// if (dotenv.error) {
//     throw dotenv.error;
// }
function sendMqttNew({data, clientId, isretain = false, isclean = false, qosLevel = 1}) {
    const options={
        clientId: clientId,
        clean: isclean
        // username:"stev",
        // password:"passwrd",
    };
    
    var options_publish={
        retain: false,
        qos: 1
    };

    const topicPublish = clientId;
    const tokenizeData =  jwt.sign(data, process.env.MQTT);
 
    const client = mqtt.connect("mqtt://test.mosquitto.org",options);
    // console.log("connected flag  "+client.connected);
    client.on("connect", function(){	
        console.log("connected  "+client.connected);
        if (client.connected==true){
            setInterval(function(){
                client.publish(topicPublish, tokenizeData, options_publish, ()=>{
                
                console.log("Masseage published");
                // client.end();

            });},3000);
        }
    });

    client.on("error",function(error){
        console.log("Can't connect" + error);
        process.exit(1)
    });
}

module.exports = sendMqttNew;
// const cli = sendMqttNew('01311', 'cli01');