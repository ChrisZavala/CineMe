const router = require('express').Router();
const { response } = require('express');
const element = require('express');
const axios = require('axios').default;
const sequelize = require('../config/connection');

//getting all data variables: 
const { getContentData, getPopData, getTopData, createContent, searchContent, getActionData, getComedyData, getRomanceData
} = require("../utils/movieApi");
const { User, Watchlist, Comment, Poll} = require('../models');

//homepage for the CineMe website. 
router.get('/', async (req, res) => {
    try {
        const getContentData = await Promise.all([
            getPopData("movie"),
            getTopData("movie"),
            getActionData("movie"),
            getComedyData("movie"),
            getRomanceData("movie"),
        ]);
        for (let x = 0; x < getContentData.length; x++) {
            for (let y = 0; y < getContentData[x].data.results.length; y++) {
                getContentData[x].data.results[y] = createContent(
                    getContentData[x].data.results[y]
                );
            }
        }
        //here we are also making our api calls to get everything popular and using the sites api to our advantage. 
        //handlebars call to homepage
        res.render("homepage", {
            popMovies: getContentData[0].data.results,
            topMovies: getContentData[1].data.results,
            actionMovies: getContentData[2].data.results,
            comedyMovies: getContentData[3].data.results,
            romanceMovies: getContentData[4].data.results,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.render("404-page");
    }
});
//get movie/:id
router.get("/movie/:id", (req, res) => {
    createsContent(req, res, 'movie', req.params.id);
});

async function createsContent(req, res, type, id) {
    try {
        let dataQuery = await Promise.all([
            getContentData(type, id),
            Poll.findAll({
                where: {
                  content_type: type,
                  content_id: req.params.id
                },
                attributes: [
                  [sequelize.fn("AVG", sequelize.cast(sequelize.col('rating'), 'integer')), 'avg_rating']
                ]
              }),
              Poll.findOne({
                where: {
                  user_id: (req.session.loggedIn) ? req.session.user_id : 0,
                  content_type: type,
                  content_id: req.params.id
                }
              }),
              Comment.findAll({
                where: {
                  content_type: type,
                  content_id: req.params.id,
                },
                include: [
                  {
                    model: User,
                    attributes: { exclude: ['password'] },
                  },
                ],
              })
            ]);
        const content = createContent(dataQuery[0].data);
        const poll = dataQuery[1].map((entry) => entry.get({plain: true}));
        let avg_rating = poll[0].avg_rating ? poll[0].avg_rating : 0;
        avg_rating = parseFloat(avg_rating).toPrecision(2);
        let user_rating;
        if(dataQuery[2]) {
            const rating = dataQuery[2].get({plain: true});
            user_rating = {
                rated: true, 
                rating: rating.rating
            }
        }

        const comments = dataQuery[3].map((entry) => entry.get({ plain: true }));
        res.render("content-page", {
            content,
            comments,
            avg_rating,
            user_rating,
            user_pfp: req.session.pfp_path,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.render("404-page");
    }
}

//get /watchlist 
router.get('/watchlist', async (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect("/login");

    } else {
        res.redirect('/watchlist/' + req.session.user_id);
    }
});
//get /watchlist/:id getting our status. Thanks to Rick for setting this in the models
// route for the watchlist for the specific user id
router.get("/watchlist/:id", async (req, res) => {
    try {
      // query to get all the content in the watchlist for this id, a query for each status type
      const dbQuery = await Promise.all([
        User.findByPk(req.params.id, { attributes: { exclude: ["password"] } }),
        Watchlist.findAll({ where: { user_id: req.params.id, status: 0 } }),
        Watchlist.findAll({ where: { user_id: req.params.id, status: 1 } }),
        Watchlist.findAll({ where: { user_id: req.params.id, status: 2 } }),
      ]);
      // if the user does not exist
      if (!dbQuery[0]) {
        res.render("404-page", { message: "No user found with this id" });
        return;
      }
      // tells whether this is the page for the current user or not
      const currentUser = (req.session.loggedIn) ? req.session.user_id == req.params.id : false;
      let watchlist = [];
      // sets the different watchlist elements and specifies whether user is the owner of the watchlist
      for (let x = 1; x < dbQuery.length; x++) {
        watchlist.push(dbQuery[x].map((entry) => entry.get({ plain: true })));
        for (let y = 0; y < watchlist[x - 1].length; y++) {
          watchlist[x - 1][y].currentUser = currentUser
        }
      }

        //going to handlebars page to render watchlist if they are this user or different user
        //handlebars call
        res.render("watchlist", {
            plan_to_watch: watchlist[0],
            watching: watchlist[1],
            completed: watchlist[2],
            loggedIn: req.session.loggedIn,
            currentUser
          });
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      });

//When the user is 'loggedIn' will go to the homepage
//get /login
router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/");
        return;
    }
    res.render("login");
});

// redirects to the homepage if user is already logged in
router.get("/signup", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/");
        return;
    }
    res.render("signup");
});

//Our search engine. 
//get /search/:type/:query
router.get("/search/:type/:query", async (req, res) => {
    try {
     
      const query = req.params.query.split("+").join(" ");
      let type = req.params.type === "movie" ? "movie" : null;
      const searchData = await searchContent(query, type);
      for (let y = 0; y < searchData.data.results.length; y++) {
        searchData.data.results[y] = createContent(searchData.data.results[y]);
      }
      res.render("search", {
        searchContent: searchData.data.results,
        loggedIn: req.session.loggedIn,
      });
      // if (!searchData !== query) {
      //   res.render("404-page");
      // }
      
    } catch (err) {
      console.log(err);
      res.render("404-page");
    }
  });
  
//Export time Shelia
module.exports = router;