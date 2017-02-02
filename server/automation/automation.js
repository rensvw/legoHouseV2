import Rx from 'rxjs/Rx';
import request from 'request';
import settingsSchema from './../api/settings/model/settings-model';
import mongoose from 'mongoose';
import Promise from 'bluebird';
import rp from 'request-promise'


let Settings = mongoose.model('Settings', settingsSchema);

let _livingroom;
let _settings;

export default class Automation {

    static start() {

        let timer = Rx.Observable.interval(1000);
        var subscription = timer.subscribe(
            x => Automation.logic(),
            e => console.log('onError: %s', e),
            () => console.log('onCompleted'));
    }

    static logic() {
        Automation.requestLivingroom();
    }

    static requestLivingroom() {
        var options = {
            uri: 'http://localhost:8080/api/latestlivingroom',
            json: true // Automatically parses the JSON string in the response 
        };
        rp(options)
            .then(function (response) {
                _livingroom = response;
                Automation.requestSettings(_livingroom);
            })
            .catch(function (err) {
                // API call failed... 
            });
    }

    static requestSettings(livingroom) {
        var options = {
            uri: 'http://localhost:8080/api/settings',
            json: true // Automatically parses the JSON string in the response 
        };

        rp(options)
            .then(function (response) {
                _settings = response;
                _livingroom = livingroom;
                if (_settings.automation == '1') {
                    console.log("Starting Automation...");
                    lightDetect();
                    tempDetect();
                }
            })
            .catch(function (err) {
                // API call failed... 
            });


        function lightDetect() {
            if (_settings.lightDetect == '1') {
                console.log("Moving: ", _livingroom.movingSensor);
                if (_livingroom.movingSensor < 16) {
                    console.log("Turning light on, moving detected!");
                    if (livingroom.lamp == '0') {
                        request('http://127.0.0.1:8080/api/mqtt/livingroom/lighton', function (error, response, body) {});
                    }

                } else {
                    console.log("Turning light off, no moving detected!");
                    if (livingroom.lamp == '1') {
                        request('http://127.0.0.1:8080/api/mqtt/livingroom/lightoff', function (error, response, body) {});
                    }

                }
            }
        }

        function tempDetect() {
            console.log("Temp: ", _livingroom.tempSensor);
            if (_settings.minTemp <= _livingroom.tempSensor) {
                console.log("turning off heating");
                if (livingroom.heating == '1') {
                    request('http://127.0.0.1:8080/api/mqtt/livingroom/heatingoff', function (error, response, body) {});
                }
            } else {
                console.log("turning on heating");
                if (livingroom.heating == '0') {
                    request('http://127.0.0.1:8080/api/mqtt/livingroom/heatingon', function (error, response, body) {});
                }
            }
        }







    }




}