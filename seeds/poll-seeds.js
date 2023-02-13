const sequelize = require('../config/connection');
const { Poll } = require('../models');
const pollData = [
    {
        user_id: 1,
        content_type: 'movie',
        content_id: 238,
        rating: 5
    },
    {
        user_id: 2,
        content_type: 'movie',
        content_id: 536554,
        rating: 3
    },
    {
        user_id: 3,
        content_type: 'movie',
        content_id: 646389,
        rating: 4
    },
    {
        user_id: 4,
        content_type: 'movie',
        content_id: 436270,
        rating: 5
    },
    {
        user_id: 5,
        content_type: 'movie',
        content_id: 661374,
        rating: 4
    },
    {
        user_id: 6,
        content_type: 'movie',
        content_id: 877703,
        rating: 2
    },];

const seedPoll = () => Poll.bulkCreate(pollData, { individualHooks: true });

module.exports = seedPoll;
