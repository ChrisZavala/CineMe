//declare vars, we are adding comments to add more interaction for the user exper. 
const router = require('express').Router();
const { User, Comment, Poll } = require('../../models');
const withAuth = require('../../utils/auth');

//get /
router.get('/', async (req, res) => {
  try {
    const dbCommentData = await Comment.findAll()
    res.json(dbCommentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});

//get /:id
router.get('/:id', async (req, res) => {
  try {
    const dbCommentData = await Comment.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: User,
          attributes: ['id']
        }
      ]
    });
    if (!dbCommentData) {
      res.status(404).json({ message: 'No comment found with this id' });
      return;
    }
    res.json(dbCommentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});

//post /
router.post('/', withAuth, async (req, res) => {
  try {
    const dbCommentData = await Comment.create({
      comment_text: req.body.text,
      user_id: req.session.user_id,
      content_id: req.body.id,
      content_type: req.body.type
    });
    res.json(dbCommentData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  };
});

//delete post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const dbCommentData = await Comment.destroy({
      where: {
        id: req.params.id
      }
    });
    // if the id does not exist
    if (!dbCommentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }
    res.json(dbCommentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});
//export time! Shelia 
module.exports = router;