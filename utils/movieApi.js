//declare vars:
//getting our movie poster from tmdb if the quality is as good might use other site: 
var posters = 'https://image.tmdb.org/t/p/w500';
const query = require('axios').default;

function getContentData(typ, id){
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
