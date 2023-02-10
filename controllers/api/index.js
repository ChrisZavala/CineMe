const router = require('express').Router();
const userRoutes = require('./user-routes');
const watchRoutes = require('./watchlist-routes');

router.use('/users', userRoutes);
router.use('/watchlist', watchRoutes);

//export time: 
module.exports = router;