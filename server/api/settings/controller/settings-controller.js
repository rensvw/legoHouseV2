import SettingsDAO from '../dao/settings-dao';
import Rx from 'rxjs/Rx';
import homeAutomation from './../../../automation/automation';


export default class SettingsController {

    static getSettings(req, res) {
        SettingsDAO
            .getSettings()
            .then(settings => res.status(200).json(settings))
            .catch(error => res.status(400).json(error));
    }

    static updateSettings(req, res) {
        let _settings = req.body;
        let _id = req.params.id;
        
        SettingsDAO
            .updateSettings(_id, _settings)
            .then(settings => res.status(201).json(settings),homeAutomation.start())
            .catch(error => res.status(400).json(error));
            

    }

    static getOneSetting(req,res){
        SettingsDAO
        .getOneSetting()
        .then(settings => res.status(201).json(settings))
        .catch(error => res.status(400).json(error));
    }

    static createSettings(req, res) {
        let _settings = req.body;

        SettingsDAO
            .createSettings(_settings)
            .then(settings => res.status(201).json(settings))
            .catch(error => res.status(400).json(error));
    }


}