import TodoRoutes from '../api/todo/routes/todo-routes';
import LivngRoomRoutes from '../api/livingroom/routes/livingroom-routes';
import LivingRoomMqttRoutes from '../api/mqtt/livingroom/routes/livingroom-routes';
import SettingsRoutes from '../api/settings/routes/settings-routes';


export default class Routes {
    static init(app, router) {
        LivngRoomRoutes.init(router);
        LivingRoomMqttRoutes.init(router);
        SettingsRoutes.init(router);
        app.use('/', router);
    }
}