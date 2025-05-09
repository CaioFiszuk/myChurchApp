const router = require('express').Router();
const { getAnnounces, createAnnounce, deleteAnnounce, updateAnnounce } = require('../controllers/announces');

router.get('/', getAnnounces);
router.post('/', createAnnounce);
router.delete('/:announceId', deleteAnnounce);
router.patch('/:announceId', updateAnnounce);

module.exports = router;