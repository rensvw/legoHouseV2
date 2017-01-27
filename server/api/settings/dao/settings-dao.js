'use strict';
import mongoose from 'mongoose';
import Promise from 'bluebird';
import settingsSchema from '../model/settings-model';
import _ from 'lodash';
Promise.promisifyAll(mongoose);

settingsSchema.statics.getSettings = () => {
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

settingsSchema.statics.createSettings = (settings) => {
    return new Promise((resolve, reject) => {
        if (!_.isObject(settings))
            return reject(new TypeError('Livingroom is not a valid object.'));

        var _settings = new Settings(settings);

        _settings.save((err, saved) => {
            err ? reject(err) :
                resolve(saved);
        });
    });
}

settingsSchema.statics.getOneSetting = () => {
    return new Promise((resolve, reject) => {
        Settings
        .findOne()
        .exec((err,settings) =>{
            err ? reject(err):resolve(settings);
        });
    });
};

settingsSchema.statics.updateSettings = (id, settings) => {
    return new Promise((resolve, reject) => {
        if (!_.isString(id))
            return reject(new TypeError('Id is not a valid string.'));
        Settings
            .findByIdAndUpdate(id, {
                $set: {
                    automation: settings.automation,
                    minTemp: settings.minTemp,
                    lightDetect: settings.lightDetect,
                    alarmState: settings.alarmState,
                    sleeping: settings.sleeping,
                    home: settings.home,
                    alarm: settings.alarm
                }
            })
            .exec((err, saved) => {
                err ? reject(err) :
                    resolve(settings);
            });
    });
}

settingsSchema.statics.deleteSettings = (id) => {
    return new Promise((resolve, reject) => {
        if (!_.isString(id))
            return reject(new TypeError('Id is not a valid string.'));

        Settings
            .findByIdAndRemove(id)
            .exec((err, deleted) => {
                err ? reject(err) :
                    resolve();
            });
    });
}

var Settings = mongoose.model('Settings', settingsSchema);

export default Settings;