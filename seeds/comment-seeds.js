const { Comment } = require('../models');

const commentData = [
    {
        comment_text: 'I want to make him an offer he cant refuse!.',
        user_id: 1,
        content_id: 238,
        content_type: 'movie'
    },
    {
        comment_text: 'I love M3GAN, she is the nice ever!',
        user_id: 2,
        content_id: 536554,
        content_type: 'movie'
    },
    {
        comment_text: 'I didnt know that Leontius could fly a plane?',
        user_id: 3,
        content_id: 646389,
        content_type: 'movie'
    },
    {
        comment_text: 'Can you smeelllllla what the Black Adam is cooking!!!!!',
        user_id: 4,
        content_id: 436270,
        content_type: 'movie'
    },
    {
        comment_text: 'Where can I buy some Jerod Leto Kombucha????',
        user_id: 5,
        content_id: 661374,
        content_type: 'movie'
    },
    {
        comment_text: 'Where is Styles at? I guess they couldnt afford him :(',
        user_id: 6,
        content_id: 877703,
        content_type: 'movie'
    },

];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;