const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    addFriend,
    deleteFriend
} = require('../controllers/user-controllers');

router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

    router.route('/')
    .get(getAllUsers)
    .post(createUser);

router.route('/:id')
    .get(getUserById);


module.exports = router;