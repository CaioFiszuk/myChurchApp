const router = require('express').Router();
const { getChurch, updateChurch } = require('../controllers/churches');

router.get('/', getChurch);
router.patch('/:churchId', updateChurch);

module.exports = router;