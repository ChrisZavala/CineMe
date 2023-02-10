const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Watchlist } = require('../../models');
const withAuth = require('../../utils/auth');

//the watchlist route
router.get('/', async (req, res) => {
    try {
        const dbWatchData = await Watchlist.findAll();
        res.json(dbWatchData);
    } catch {
        res.status(500).json(err);
    }
});
// post / with async/await
router.post('/', withAuth, async (req, res) => {
    try {
        const dbWatchData = await Watchlist.create({
            user_id: req.session.user_id,
            content_type: req.body.type,
            content_id: req.body.id,
            content_title: req.body.title,
            poster_path: req.body.poster,
            release_year: req.body.year,
            status: req.body.status
        });
        res.json(dbWatchData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//put /:id with async/await
router.put('/:id', withAuth, async (req, res) => {
    try {
        const dbWatchData = await Watchlist.update(req.body, {
            where: { id: req.params.id, user_id: req.session.user_id }
        });
        res.json(dbWatchData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//delete /:id with async/await
router.delete('/:id', async (req, res) => {
    try {
        const dbWatchData = await Watchlist.destroy({
            where: { id: req.params.id }
        });
        if (!dbWatchData) {
            res.status(404).json({ message: 'No entry with this id.' });
            return;
        }
        res.json(dbWatchData);
    } catch (err) {
        res.status(500).json(err);
    }
});
//Export time
module.exports = router;