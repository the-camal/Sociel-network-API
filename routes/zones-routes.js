const router = require('express').Router();

const {
    getzones,
    getzonesById,
    createzones,
    updatezones,
    createReaction,
    removeReaction
} = require('../controllers/zones-controllers');

router.route('/')
    .get(getzones)
    .post(createzones);

router.route('/:id')
    .get(getzonesById)
    .put(updatezones);

router.route('/:thoughtId/reactions')
    .post(createReaction)

router.route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction)

module.exports = router;