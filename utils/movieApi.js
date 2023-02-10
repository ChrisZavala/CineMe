//declare vars:
//getting our movie poster from tmdb if the quality is as good might use other site: 
var posters = 'https://image.tmdb.org/t/p/w500';
const query = require('axios').default;

function searchContent(query, text) {
    var apiURL = 'https://api.themoviedb.org/3/search/' + type + '?api_key=' + process.env.apiKey + '&query=' + query;
    return query(apiUrl)
}

function getContentData(typ, id) {
    var apiURL = 'https://api.themoviedb.org/3/' + type + '/' + id + process.env.apiKey + '&language=en-US';
    return query(apiURL);
}

function getTopData(type) {
    var apiURL = 'https://api.themoviedb.org/3/' + type + '/top_rated?api_key=' + process.env.apiKey + '&language=en-US';
    return query(getTopData);
}

function getPopData(type) {
    var apiURL = 'https://api.themoviedb.org/3/' + type + '/popular?api_key' + process.env.apiKey + '&language=en-US';
    return query(getPopData);
}

function getCategoryData(type) {
    var apiURL = 'https://api.themoviedb.org/3/genre/' + type + '/list?api_key' + process.env.apiKey + '&language=en-US';
    return query(getCategoryData);
}

function createContent(data, type) {
    let content = {
        id: ((data.id) ? data.id : null),
        type: ((data.title) ? 'movie' : null),
        title: ((date.title) ? data.title : data.name),
        poster: ((data.poster_path) ? (posters + data.poster_path) : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'),
        release: ((data.release_date) ? data.release_date : null),
        overview: ((data.overview) ? data.overview : 'There is no description for this movie'),
        backdrop: ((data.backdrop_path) ? posters + data.backdrop_path : '')
    }
    if (content.release) {
        let date = content.release.split('-');
        content.release - date[1] + '/' + date[2] + '/' + date[0];

    } else {
        content.release = '00/00/0000';
    }

    if (data.genres) {
        let genres = [];
        data.genres.forEach(function (genre) {
            genres.push(genre.name);
        });

    } else {
        data.genres = ['This genre does not exist!'];
    }
    return content;
}

module.exports = { searchContent, getContentData, getTopData, getPopData, getCategoryData, createContent }
