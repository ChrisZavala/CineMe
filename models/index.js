// import models
const User = require('./User');
const Watchlist = require('./Watchlist');

User.hasMany(Watchlist, {
    foreignKey: 'user_id'
});

Watchlist.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

module.exports = { User, Watchlist };