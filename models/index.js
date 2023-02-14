// import models
const User = require('./User');
const Watchlist = require('./Watchlist');
const Comment = require('./Comment');
const Poll = require('./Poll');

User.hasMany(Poll, {
    foreignKey: 'user_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Poll.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.hasMany(Watchlist, {
    foreignKey: 'user_id'
});

Watchlist.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

module.exports = { User, Watchlist, Comment, Poll };