const router = require('express').Router();
const { getMembers, createMember, deleteMember, updateMember } = require('../controllers/members');

router.get('/', getMembers);
router.post('/', createMember);
router.delete('/:memberId', deleteMember);
router.patch('/:memberId', updateMember);

module.exports = router;