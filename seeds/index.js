const seedUsers = require('./user-seeds');
const seedWatchlist = require('./watchlist-seeds');
const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n')

  await seedUsers();
  console.log('\n----- USERS SEEDED -----\n')

  await seedWatchlist();
  console.log('\n----- WATCHLIST SEEDED -----\n')
  
  process.exit(0);
};
seedAll();