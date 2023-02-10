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

        //here we are also making our api calls
        res.render("homepage", {
            popularMovies: getContentData[0].data.results,
            topMovies: getContentData[1].data.results,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.render("404-page");
    }
});

router.get('/watchlist', async (req, res) => {
    if(!req.session.loggedIn) {
        res.redirect("/login");

    }else{
        res.redirect('/watchlist' + req.session.user_id);
    }
});

router.get('/watchlist/:id', async (req, res) => {
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
    
})