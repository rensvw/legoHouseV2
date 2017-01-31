
import Rx from 'rxjs/Rx';
import request from 'request';

export default class automationScript{

 

static start(){
    let livingroom;

    let timer = Rx.Observable.interval(1000);
    var subscription = timer.subscribe(
        x => checkStatus(),
        e => console.log('onError: %s', e),
        () => console.log('onCompleted'));
    
    function checkStatus() {
         requestLivingRoom();
         automationScript.requestSettings();       
    };

    function requestLivingRoom(){
        request('http://127.0.0.1:8080/api/latestlivingroom', function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var object = JSON.parse(body);
                console.log(object);
            }
            
        });
    }

}


static requestSettings(){
        request('http://127.0.0.1:8080/api/settings', function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var object = JSON.parse(body);
                console.log(object);
            }
        });
    }


}
