'use strict';
import mqtt from 'mqtt';
import MessageService from '../messageservice/livingroom-messageservice';

const client = mqtt.connect('mqtt://94.211.191.154');
const topic = "legoHouseWoonkamerInput";
import request from 'request';

client.on('connect', function() {
    client.subscribe(topic);
});

export default class LivingRoomController {
    static LightOn(req, res) {
        MessageService.LightOn.publish();
        res.json(MessageService.LightOn.response());
    }

    static LightOff(req, res) {
        MessageService.LightOff.publish();
        res.json(MessageService.LightOff.response());
    }

    static ToggleLight(req, res) {
        request('http://127.0.0.1:8080/api/latestlivingroom', function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var object = JSON.parse(body);
                if (object.lamp == 1) {
                    MessageService.LightOff.publish();
                    res.json(MessageService.LightOff.response());
                } else {
                    MessageService.LightOn.publish();
                    res.json(MessageService.LightOn.response());
                }
            }
        });

    }

    static HeatingOn(req, res) {
        MessageService.HeatingOn.publish();
        res.json(MessageService.HeatingOn.response());
    }

    static HeatingOff(req, res) {
        MessageService.HeatingOff.publish();
        res.json(MessageService.HeatingOff.response());
    }

    static ToggleHeating(req, res) {
        request('http://127.0.0.1:8080/api/latestlivingroom', function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var object = JSON.parse(body);
                if (object.heating == 1) {
                    MessageService.HeatingOff.publish();
                    res.json(MessageService.HeatingOff.response());
                } else {
                    MessageService.HeatingOn.publish();
                    res.json(MessageService.HeatingOn.response());
                }
            }
        });

    }

    static BuzzerOn(req, res) {
        MessageService.BuzzerOn.publish();
        res.json(MessageService.BuzzerOn.response());
    }

    static BuzzerOff(req, res) {
        MessageService.BuzzerOff.publish();
        res.json(MessageService.BuzzerOff.response());
    }


}