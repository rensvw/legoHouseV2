
import Rx from 'rxjs/Rx';
import request from 'request';
import settingsSchema from './../api/settings/model/settings-model';
import mongoose from 'mongoose';
import Promise from 'bluebird';


let Settings = mongoose.model('Settings', settingsSchema);

export default class automationScript{



static getSettings() {
    return new Promise((resolve, reject) => {
        var _query = {};

        Settings
            .findOne(_query)
            .exec((err, settings) => {
                err ? reject(err) :
                    resolve(settings);
            });
    });
}

static start(){
    let livingroom;

    let timer = Rx.Observable.interval(3000);
    var subscription = timer.subscribe(
        x => automationScript.requestSettings(),
        e => console.log('onError: %s', e),
        () => console.log('onCompleted'));
}


static requestSettings(){
        request('http://127.0.0.1:8080/api/settings', function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var settings = JSON.parse(body);
                if(settings.automation == "1"){
                    console.log("Automation: ", settings.automation)

                    request('http://127.0.0.1:8080/api/latestlivingroom', function(error, response, body) {
                        if (!error && response.statusCode == 200) {
                            let livingroom = JSON.parse(body); 
                               if(livingroom.tempSensor < settings.minTemp){
                                    // turn heating on
                                    console.log("Tempsensor: ", livingroom.tempSensor);
                                    console.log("minTemp: ", settings.minTemp);
                               }
                               else{
                                   // turn heating off
                               }
                               // Licht regelen zodra je wel of niet thuis bent
                               if((settings.lightDetect == "1") && (settings.sleeping == "0") && (settings.home == "1")){
                                   if(livingroom.distance <= "17"){
                                       // turn on lightc
                                       console.log("lightDetect: ", settings.lightDetect);
                                    console.log("Sleeping: ", settings.sleeping);
                                    console.log("Home: ", settings.sleeping);
                                    
                                   }
                                   else{
                                       // turn off light
                                   }
                               }

                              
                            }
               
                    });
                }
                else{
                    //do nothing
                }
            }
        });
    }


}
