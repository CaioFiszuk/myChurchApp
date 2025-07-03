const router = require('express').Router();
const { getChurch, createChurch, updateChurch } = require('../controllers/churches');

router.get('/', getChurch);
router.post('/', createChurch);
router.patch('/', updateChurch);

module.exports = router;