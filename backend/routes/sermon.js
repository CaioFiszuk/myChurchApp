const router = require('express').Router();
const { getSermons, createSermon, deleteSermon, updateSermon } = require('../controllers/sermons');

router.get('/', getSermons);
router.post('/', createSermon);
router.delete('/:sermonId', deleteSermon);
router.patch('/:sermonId', updateSermon);

module.exports = router;