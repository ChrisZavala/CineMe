const seedUsers = require('./user-seeds');
const seedPoll = require('./poll-seeds');
const seedComments = require('./comment-seeds');
const seedWatchlist = require('./watchlist-seeds');
const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedUsers();
  console.log('\n----- USERS SEEDED -----\n');

  await seedWatchlist();
  console.log('\n----- WATCHLIST SEEDED -----\n');

  await seedPoll();
  console.log('\n----- POLL SEEDED -----\n');

  await seedComments();
  console.log('\n----- COMMENT SEEDED -----\n');
  
  process.exit(0);
};
seedAll();