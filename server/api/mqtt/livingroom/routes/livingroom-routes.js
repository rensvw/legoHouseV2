import LivingRoomController from '../controller/livingroom-controller';

export default class LivingRoomRoutes {
    static init(router) {
        router
            .route('/api/mqtt/livingroom/lightoff')
            .get(LivingRoomController.LightOff);
        router
            .route('/api/mqtt/livingroom/lighton')
            .get(LivingRoomController.LightOn);

        router
            .route('/api/mqtt/livingroom/heatingon')
            .get(LivingRoomController.HeatingOn);
        router
            .route('/api/mqtt/livingroom/heatingoff')
            .get(LivingRoomController.HeatingOff);


        // get all the bears (accessed at GET http://localhost:8080/api/livingroom)
        router
            .route('/api/mqtt/livingroom/togglelight')
            .get(LivingRoomController.ToggleLight);
        router
            .route('/api/mqtt/livingroom/toggleheating')
            .get(LivingRoomController.ToggleHeating);
    }
}