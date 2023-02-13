//var declare: 
const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Poll } = require('../../models'); 
const withAuth = require('../../utils/auth');

//get /
router.get('/', async (req, res) => {
    try {
        const pollData = await Poll.findAll();
        res.json(pollData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//post /
router.post('/',withAuth, async (req, res) => {
    try {
        const pollData = await Poll.create({
            user_id: req.session.user_id,
            content_id: req.body.content_id,
            content_type: req.body.content_type,
            rating: req.body.rating,
        });
        res.json(pollData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//put /
router.put('/', withAuth, async (req, res) => {
    try {
       const pollData = await Poll.update(
        {
            rating: req.body.rating
        }, {
        where: {
          user_id: req.session.user_id,
          content_id: req.body.content_id,
          content_type: req.body.content_type,
        }
      });
      res.json(pollData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  //destroy Shelia 
  router.delete('/:id', async (req, res) => {
    try {
        const pollData = await Poll.destroy({
            where: {
                id: req.params.id
            }
        });
        if(!pollData) {
            res.status(404).json({message: "No poll id is found"});
            return;
        }
        res.json(pollData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
  });
  //export time Shelia
  module.exports = router;