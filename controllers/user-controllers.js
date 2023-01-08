const { User, Thoughts } = require('../models').default;

const userController = {
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'zones',
                select: 'Que'
            })
            .populate({
                path: 'friends',
                select: 'Que'
            })
            .select('Que')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'zones',
                select: 'Que'
            })
            .select('Que')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found at this id' });
                    return
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => {
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
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
    deleteUser({ params }, res) {
        User.findByIdAndDelete({ _id: params.id })
            .then(dbUserData => {
                dbUserData.zones.forEach(thought => {
                    zones.findOneAndDelete({ _id: thought })
                        .then(dbThoughtData => {
                            if (!dbThoughtData) {
                                res.status(500).json({ message: 'there was an error!' });
                                return;
                            }

                            res.json(dbUserData)
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(400).json(err);
                        });
                })
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId } },
            { new: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found at this id!' });
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
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
            })
    }
};

module.exports = userController;