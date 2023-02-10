const { Watchlist } = require('../models');

const watchlistData = [
  {
    id: 1, 
    user_id: 1,
    content_id: 238,
    content_type: 'movie',
    content_title: 'The Godfather',
    poster_path: 'https://image.tmdb.org/t/p/w500//3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
    release_year: 1999,
    status: 0
  },
  {
    id: 2, 
    user_id: 2,
    content_id: 536554,
    content_type: 'movie',
    content_title: 'M3GAN',
    poster_path: 'https://image.tmdb.org/t/p/w500/d9nBoowhjiiYc4FBNtQkPY7c11H.jpg',
    release_year: 2023,
    status: 0
  },
  {
    id: 3, 
    user_id: 3,
    content_id: 646389,
    content_type: 'movie',
    content_title: 'Plane',
    poster_path: 'https://image.tmdb.org/t/p/w500/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg',
    release_year: 2023,
    status: 0
  },
  {
    id: 4, 
    user_id: 4,
    content_id: 436270,
    content_type: 'movie',
    content_title: 'Black Adam',
    poster_path: 'https://image.tmdb.org/t/p/w500/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg',
    release_year: 2022,
    status: 0
  },
  {
    id: 5, 
    user_id: 5,
    content_id: 661374,
    content_type: 'movie',
    content_title: 'Glass Onion: A Knives Out Mystery',
    poster_path: 'https://image.tmdb.org/t/p/w500/vDGr1YdrlfbU9wxTOdpf3zChmv9.jpg',
    release_year: 1999,
    status: 0
  },
  {
    id: 6, 
    user_id: 6,
    content_id: 877703,
    content_type: 'movie',
    content_title: 'Teen Wolf: The Movie',
    poster_path: 'https://image.tmdb.org/t/p/w500/wAkpPm3wcHRqZl8XjUI3Y2chYq2.jpg',
    release_year: 2023,
    status: 0
  },

];

const seedWatchlist = () => Watchlist.bulkCreate(watchlistData);

module.exports = seedWatchlist;