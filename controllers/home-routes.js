const router = require('express').Router();
const { response } = require('express');
const element = require('express');
const axios = require('axios').default;
const sequelize = require('../config/connection');

//getting all data variables: 
const { getContentData, getPopData, getTopData, createContent, searchContent,
} = require("../utils/movieApi"); 
const {User, Watchlist } = require('../models');

//homepage for the CineMe website. 
router.get('/', async (req, res) => {
    try {
        const getContentData = await Promise.all([
            getPopData("movie"), 
            getTopData("movie"),
        ]);
        for (let x=0; x < getContentData.length; x++ ) {
            for(let y = 0; y < getContentData[x].data.results.length; y++) {
                getContentData[x].data.results[y] = createContent(
                    getContentData[x].data.results[y]
                );
            }
        }
        //here we are also making our api calls to get everything popular and using the sites api to our advantage. 
        res.render("homepage", {
            popularMovies: getContentData[0].data.results,
            topMovies: getContentData[1].data.results,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.render("404-page");
    }
});
//get /watchlist 
router.get('/watchlist', async (req, res) => {
    if(!req.session.loggedIn) {
        res.redirect("/login");

    }else{
        res.redirect('/watchlist' + req.session.user_id);
    }
});
//get /watchlist/:id getting our status. Thanks to Rick for setting this in the models
router.get('/watchlist/:id', async (req, res) => {
    try{
    const db = await Promise.all([
        User.findByPk(req.params.id, { attributes: { exclude: ['password']}}),
        Watchlist.findAll({ where: { user_id: req.params, status: 0 }}),
        Watchlist.findAll({ where: { user_id: req.params, status: 1 }}),
        Watchlist.findAll({ where: { user_id: req.params, status: 2 }}),
    ]);
    if(!db[0]){
        res.render('404-page', { message: "No id found!"});
        return; 
    }
const currentUser = (req.session.loggedIn) ? req.session.user_id == req.params.id : false;
let watchlist = [];
for(let x=1; x<db.length; x++){
    watchlist.push(db[x].map((entry) => entry.get({plain: true})));
    for(let y=1; y<watchlist[x-1].length; y++){
        watchlist[x-1][y].currentUser = currentUser
    }
}

//going to handlebars page to render watchlist if they are this user or different user
res.render('watchlist', {
    futureWatch: watchlist[0],
    currentlyWatching: watchlist[1],
    finished: watchlist[2],
    loggedIn: req.session.loggedIn,
    currentUser
});
    } catch(err) {
        res.status(500).json(err);
    }
});

//When the user is 'loggedIn' will go to the homepage
//get /login
router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    //if not let the user signup for account
    res.render('Sign Up for Account!');
});

//Our search engine. 
//get /search/:type/:query
router.get('/search/:type/:query', async (req, res) => {
    try {
        const query = req.params.query.split('+').join("");
        let type = req.params.type === "movie";
        const searchDB = await searchContent(query, type);
        for (let y=0; y<searchContent.data.results.length; y++){
            searchDB.data.results[y] = createContent(searchDB.data.results[y]);
        }
        res.render('search', {
            searchContent: searchDB.data.results, loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.render('404-page');
    }
});

//Export time thank god
module.exports = router;