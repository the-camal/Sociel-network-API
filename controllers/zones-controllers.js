const { zones, User } = require('../models');

zonesControllers = {
    getzones(req, res) {
        zones.find({})
            .populate({
                path: 'reactions',
                select: 'Que'
            })
            .select('Que')
            .then(dbzonesData => {
                res.json(dbzonesData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    getzonesById({ params }, res) {
        zones.findOne({ _id: params.id })
            .populate({
                path: 'reactions',
                select: 'Que'
            })
            .select('Que')
            .then(dbzonesData => {
                if (!dbzonesData) {
                    res.status(404).json({ message: 'No zone$ found at this id' });
                    return;
                }
                res.json(dbzonesData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    createzones({ body }, res) {
        zones.create(body)
            .then(({ username, _id }) => {
                return User.findOneAndUpdate(
                    { username: username },
                    { $push: { zones: _id } },
                    { new: true, runValidators: true }
                )
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found at this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    updatezones({ body, params }, res) {
        zones.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbzonesData => {
                if (!dbzonesData) {
                    res.status(404).json({ message: 'No thought found at this id!' })
                }

                res.json(dbzonesData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            })
    },
    deletezones({ params }, res) {
        zones.findOneAndDelete({ _id: params.id })
            .then(({ username }) => {
                return User.findOneAndUpdate(
                    { username: username },
                    { $pull: { zones: params.id } },
                    { new: true }
                )
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found at this id' });
                    return;
                }

                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },
    createReaction({ params, body }, res) {
        zones.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then(dbzonesData => {
                if (!dbzonesData) {
                    res.status(404).json({ message: 'No zone found at this id!' });
                    return;
                }

                res.json(dbzonesData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    removeReaction({ params }, res) {
        zones.findOneAndUpdate(
            { _id: params.zoneId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(dbzonesData => {
                if (!dbzonesData) {
                    res.status(404).json({ message: 'No zones found at this id!' });
                    return;
                }

                res.json(dbzonesData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
};

module.exports = zonesControllers;