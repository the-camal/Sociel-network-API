const router = require('express').Router();
const userRoutes = require('./user-routes');
const zonesRoutes = require('./zones-routes');

router.use('/api/users', userRoutes);
router.use('/api/zones', zonesRoutes);

module.exports = router;