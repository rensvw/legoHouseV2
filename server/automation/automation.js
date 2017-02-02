import Rx from 'rxjs/Rx';
import request from 'request';
import settingsSchema from './../api/settings/model/settings-model';
import mongoose from 'mongoose';
import Promise from 'bluebird';
import rp from 'request-promise';



let Settings = mongoose.model('Settings', settingsSchema);

let _livingroom;
let _settings;

export default class Automation {

    static start() {

        let timer = Rx.Observable.interval(2000);
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
                if (_settings.automation == 'true') {
                    console.log("Starting Automation...");

                    
                    lightIntensity();
                    tempDetect();
                    alarm();
                }
            })
            .catch(function (err) {
                // API call failed... 
            });

        function lightDetect() {
            if (_settings.lightDetect == 'true') {
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

        function lightIntensity(){
            if(_settings.lightDetect == 'true'){
            if(_livingroom.lightSensor < 200){
                if (livingroom.lamp == '0') {
                        request('http://127.0.0.1:8080/api/mqtt/livingroom/lighton', function (error, response, body) {});
                    }
            }else {
                    if (livingroom.lamp == '1') {
                        request('http://127.0.0.1:8080/api/mqtt/livingroom/lightoff', function (error, response, body) {});
                    }
                }
        }}

        function alarm() {
            if (_settings.alarm == 'true') {
                console.log("Alarm on");
                if (_settings.home == 'true') {
                console.log("Home = true");      
                    if (_livingroom.doorSensor == '1') {
                        console.log("Door Open - buzzer on");
                        buzzerOn();
                    }
                    if (_livingroom.windowSensor == '1') {
                        console.log("Window Open - buzzer on");
                        buzzerOn();
                    }
                }
                if (_settings.home == 'false') {
                    if (_livingroom.movingSensor < 16) {
                        console.log("Moving - buzzer on");                 
                        buzzerOn();
                    }
                    if (_livingroom.doorSensor == '1') {
                        console.log("Door Open - buzzer on");        
                        buzzerOn();
                    }
                    if (_livingroom.windowSensor == '1') {
                        console.log("Window Open - buzzer on");
                        buzzerOn();
                    }
                }

            } else {
                if (_livingroom.buzzerState == '1') {
                    request('http://127.0.0.1:8080/api/mqtt/livingroom/buzzeroff', function (error, response, body) {});
                }
            }

            function buzzerOn() {
                if (_livingroom.buzzerState == '0') {
                    request('http://127.0.0.1:8080/api/mqtt/livingroom/buzzeron', function (error, response, body) {});
                }
            }


        }







    }




}