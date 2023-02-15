//var declare: 
const router = require('express').Router();
const { User, Comment, Poll } = require('../../models'); 
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
        console.log(err);
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
        
        req.session.email = dbUserData.email;
        req.session.loggedIn = true;

        res.json(dbUserData);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    };
  });

  //post /login with async/await
  router.post('/login', async (req, res) => {
    try {
      const dbUserData = await User.findOne({
        where: {
          username: req.body.username
        }
      });
      if (!dbUserData) {
        res.status(400).json({ message: 'No user with that username!' });
        return;
      }

      const validPassword = dbUserData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }
        req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.email = dbUserData.email;
        
        req.session.loggedIn = true;
        res.json({ user: dbUserData, message: "You are logged in!" });
        });
    } catch (err) {
      console.log(err);
        res.status(500).json(err);
    }
  });

  //post /logout 
  router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    }
    else {
      res.status(404).end();
    }
  });

  //put / with async/await
  router.put('/', withAuth, async (req, res) => {
    try {
      let dbUserData = await User.findOne({
        where: { id: req.session.user_id }
      });
      if (!dbUserData.checkPassword(req.body.current_password)) {
        res.status(400).json({ message: 'Password not correct!' });
        return;
      }
      delete req.body.current_password;
      let hooks = req.body.password ? true : false;
      dbUserData = await User.update({ ...req.body }, {
        individualHooks: hooks,
        where: {
          id: req.session.user_id
        }
      });
      res.json(dbUserData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
  //delete /id: async/await
  router.delete('/:id', async (req, res) => {
    try {
      const dbUserData = await User.destroy({
        where: {
          id: req.params.id
        }
      });
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      if (req.params.id == req.session.user_id) {
        req.session.destroy(() => {
          res.status(204).end();
        });
      }
      res.json(dbUserData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    };
  });
  //Export time, can't touch this
  module.exports = router;