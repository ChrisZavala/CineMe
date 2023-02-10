//var declare: 
const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');

//get / with async/await
router.get('/', async (req, res) => {
    try {
      const dbUserData = await User.findAll({
        attributes: { exclude: ['password'] }
      });
      res.json(dbUserData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    };
  });

  //get /:id with async/await
  router.get('/:id', async (req, res) => {
    try {
        const dbUserData = await User.findOne({
            where: {
                id: req.body.id
            },
            attributes: { exclude: ['password'] }
        })
        res.json(dbUserData)
    } catch (err) {
        res.status(500).json(err);
    };
  });

  //post / with async/await
  router.post("/", async (req, res) => {
    try {
      const dbUserData = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.pfp_path = dbUserData.pfp_path;
        req.session.email = dbUserData.email;
        req.session.loggedIn = true;
        res.json(dbUserData);
      });
    } catch (err) {
      res.status(500).json(err);
    };
  });

  //post /login with async/await
  router.post('/login', async (req, res) => {
    try {
        const dbUserData = await User.findOne({ 
            where: { username: req.body.username }
        });
        if(!dbUserData) {
            res.status(400).json({ message: 'Password not correct!' });
            return; 
        }
        req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.pfp_path = dbUserData.pfp_path;
        req.session.email = dbUserData.email;
        req.session.loggedIn = true;
        res.json({ user: dbUserData, message: "You are logged in!" });
        });
    } catch (err) {
        res.status(500).json(err);
    }
  });