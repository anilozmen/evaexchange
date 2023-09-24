const router = require('express').Router();
const controller = require('../controllers/shareController');
const { postValidate, putValidate, shareIdValidate } = require('../validations/share');

router.get('/', controller.findAllShares);
router.get('/:shareId', shareIdValidate, controller.findShareById);
router.post('/', postValidate, controller.saveShare);
router.put('/:shareId', shareIdValidate, putValidate, controller.updateShareById);

module.exports = router;