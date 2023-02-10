//declare variables for 'CineMe'
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
require('dotenv').config();
const routes = require('./controllers/');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'A movie secret',
    cookie: { maxAge: 300000},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };
app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);
//Port link to have the webserver to active. 
sequelize.sync({ force: false }).then(() => {
    app.listen(process.env.PORT ||3001, () => console.log(`App listening at http://localhost:${PORT} 🚀`));
  });

//API Key (v3 auth)
// API Key: d080004efb38fede1753960b869fc0cc
// Example API Request
// https://api.themoviedb.org/3/movie/550?api_key=d080004efb38fede1753960b869fc0cc

// http://www.omdbapi.com/?i=tt3896198&apikey=2906f9d9
// https://www.omdbapi.com/

//Sending to git one more time 