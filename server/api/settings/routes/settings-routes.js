import SettingsController from '../controller/settings-controller';

export default class SettingsRoutes {
    static init(router) {
        router
            .route('/api/setting')
            .get(SettingsController.getOneSetting);

        router
            .route('/api/settings')
            .get(SettingsController.getSettings)
            .post(SettingsController.createSettings);

        router
            .route('/api/settings/:id')
            .put(SettingsController.updateSettings);
    }
}