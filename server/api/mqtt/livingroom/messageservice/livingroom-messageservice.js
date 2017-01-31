'use strict';
import mqtt from 'mqtt';

const client = mqtt.connect('mqtt://94.211.191.154');
const topic = "legoHouseWoonkamerInput";

client.on('connect', () => {
    client.subscribe(topic);
});

let MessageService = {};

MessageService.LightOn = {
    publish: () => {
        client.publish(topic, "lightOn#");
    },
    response: () => {
        return 1;
    }
};

MessageService.LightOff = {
    publish: () => {
        client.publish(topic, "lightOff#");
    },
    response: () => {
        return 0;
    }
};

MessageService.HeatingOn = {
    publish: () => {
        client.publish(topic, "heatingOn#");
    },
    response: () => {
        return 1;
    }
};

MessageService.HeatingOff = {
    publish: () => {
        client.publish(topic, "heatingOff#");
    },
    response: () => {
        return 0;
    }
};

export default MessageService;