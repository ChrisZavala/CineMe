// import models

const User = require('./user');
const Watchlist = require('./watchlist');

User.hasMany(Watchlist, {
    foreignKey: 'user_id',
  });
  
Watchlist.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });
  
  module.exports = { User, Watchlist };
  

