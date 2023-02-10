// import models

const User = require('./user');
const Watchlist = require('./watchlist');

User.hasMany(Project, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });
  
  Project.belongsTo(User, {
    foreignKey: 'user_id'
  });
  
  module.exports = { User, Project };
  






module.exports = {
    Watchlist,
    User,
  };