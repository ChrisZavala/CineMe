const router = require('express').Router();
const userRoutes = require('./user-routes');
const watchRoutes = require('./watchlist-routes');
const pollRoutes = require('./poll-routes');
const commentRoutes = require('./comment-routes');


router.use('/comments', commentRoutes);
router.use('/poll', pollRoutes);
router.use('/users', userRoutes);
router.use('/watchlist', watchRoutes);

//export time: 
module.exports = router;