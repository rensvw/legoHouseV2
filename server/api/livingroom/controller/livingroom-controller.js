import LivingRoomDAO from '../dao/livingroom-dao';

export default class LivingRoomController {
    static getAllLivingRoomValues(req, res) {
        LivingRoomDAO
            .getAllLivingRoomValues()
            .then(livingroom => res.status(200).json(livingroom))
            .catch(error => res.status(400).json(error));
    }

    static getLivingRoomValue(req, res) {
        let _id = req.params.id;

        LivingRoomDAO
            .getLivingRoomValue(_id)
            .then(livingroom => res.status(200).json(livingroom))
            .catch(error => res.status(400).json(error));
    }

    static getLatestLivingRoomValue(req, res) {

        LivingRoomDAO
            .getLatestLivingRoomValue()
            .then(livingroom => res.status(200).json(livingroom))
            .catch(error => res.status(400).json(error));
    }

    static createLivingRoomValue(req, res) {
        let _livingroom = req.body;

        LivingRoomDAO
            .createLivingRoomValue(_livingroom)
            .then(livingroom => res.status(201).json(livingroom))
            .catch(error => res.status(400).json(error));
    }

    static deleteLivingRoomValues(req, res) {
        let _id = req.params.id;

        LivingRoomDAO
            .deleteLivingRoomValues(_id)
            .then(() => res.status(200).json("Deleted Succesfully!"))
            .catch(error => res.status(400).json(error));
    }
}