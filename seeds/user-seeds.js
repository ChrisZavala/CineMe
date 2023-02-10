const { User } = require('../models');

const userData = [
  {
    username: 'MFreemayne00',
    email: 'TheRealMorganFreeman@real.com',
    password: 'Coolvoice00!'
  },
  {
    username: 'ThanosStan99',
    email: 'ThanosWasRight99@snap.com',
    password: 'Stonez99!'
  },
  {
    username: 'CowboysFan04',
    email: 'Cowboys_por_vida@cowboys.com',
    password: 'SBChamps24!'
  },
  {
    username: 'Beyonce4Real',
    email: 'Queen_Bee@hive.com',
    password: 'IHateJayZ4ever'
  },
  {
    username: 'JayZ4Real',
    email: 'Brooklyn_Boi@NYC.com',
    password: 'DirtyShoulders20'
  },
  {
    username: 'NickCannon5',
    email: 'Mariah_Carey_Hater@wild.com',
    password: '12Kids&Counting'
  }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
