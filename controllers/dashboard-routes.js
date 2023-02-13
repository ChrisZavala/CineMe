const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Comment } = require('../models/');
const withAuth = require('../utils/auth');

//get / async/await
router.get('/', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: [
                'id',
                'comment_text',
                'user_id',
                'content_type',
                'createdAt'
            ],
            include: [{ model: User, attributes: { exclude: ['password']}}]
        });
        const comments = commentData.map(comment => comment.get({plain: true}));
        const username = req.session.username;
        const email = req.session.email;
        res.render('dashboard', { comments, username, email, loggedIn: true}); 
    } catch (err) {
        res.status(500).json(err);
        
    }
});
//export time shelia
module.exports = router; 