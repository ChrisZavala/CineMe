const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Comment } = require('../models/');
const withAuth = require('../utils/auth');

//get / async/await
router.get('/', withAuth, async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                id: req.session.user_id
            },
            include: [{ model: Comment }]
        });
        const user = userData.get({plain: true}) ;
        const username = req.session.username;
        const email = req.session.email;
        console.log(user);
        res.render('dashboard', { user, username, email, loggedIn: true}); 
    } catch (err) {
        res.status(500).json(err);
        
    }
});
module.exports = router; 