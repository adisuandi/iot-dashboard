const brokerUrl = 'ws://broker.emqx.io:8083/mqtt';
const topicSensor = "tes/189321/topic/sensor";
const topicLampu1 = "tes/189321/topic/lampu1";
const topicLampu2 = "tes/189321/topic/lampu2";
const topicLampu3 = "tes/189321/topic/lampu3";
const topicLampu4 = "tes/189321/topic/lampu4";

const client = new MQTTClient(brokerUrl);
const options = { qos: 0, retain: true };

//Ketika Client Connect ke MQTT Broker
client.onConnect = () => {
    client.subscribe(topicSensor);
    client.subscribe(topicLampu1);
    client.subscribe(topicLampu2);
    client.subscribe(topicLampu3);
    client.subscribe(topicLampu4);
};

//Ketika Client Menerima Pesan Dari ESP32
client.onMessage = (topic, message) => {
    console.log('Topic:', topic);
    console.log('Message:', message.toString());
    
    if (topic === topicSensor) {
        var suhu = message.toString();
        document.getElementById("suhu").innerHTML = suhu;
    }

    if (topic === topicLampu1) {
        var statusLampu1 = message.toString();
        if (statusLampu1 == '0') statusLampu1 = "OFF";
        if (statusLampu1 == '1') statusLampu1 = "ON";
        document.getElementById("statusLampu1").innerHTML = statusLampu1;        
    }
    else if (topic === topicLampu2) {
        var statusLampu2 = message.toString();
        if (statusLampu2 == '0') statusLampu2 = "OFF";
        if (statusLampu2 == '1') statusLampu2 = "ON";
        document.getElementById("statusLampu2").innerHTML = statusLampu2;        
    }
    else if (topic === topicLampu3) {
        var statusLampu3 = message.toString();
        if (statusLampu3 == '0') statusLampu3 = "OFF";
        if (statusLampu3 == '1') statusLampu3 = "ON";
        document.getElementById("statusLampu3").innerHTML = statusLampu3;        
    }
    else if (topic === topicLampu4) {
        var statusLampu4 = message.toString();
        if (statusLampu4 == '0') statusLampu4 = "OFF";
        if (statusLampu4 == '1') statusLampu4 = "ON";
        document.getElementById("statusLampu4").innerHTML = statusLampu4;        
    }
    
};

//Contoh Fungsi Publish
function publish_led1(message) {
    client.publish(topicLampu1, message, options);        
}

function publish_led2(message) {
    client.publish(topicLampu2, message, options);        
}

function publish_led3(message) {
    client.publish(topicLampu3, message, options);        
}

function publish_led4(message) {
    client.publish(topicLampu4, message, options);        
}


client.connect();
