const router = require('express').Router();
const userController = require('../controllers/userController');
const { 
    userIdValidate, 
    postValidate, 
    userPortfolioDataValidate, 
    tradeValidate 
} = require('../validations/user');

router.get('/', userController.findAllUsers);
router.get('/:userId', userIdValidate, userController.findUserById);
router.post('/', postValidate, userController.saveUser);

router.get('/:userId/portfolios', userIdValidate, userController.findUserByIdAndIncludePortfolio);
router.post('/:userId/portfolios', userIdValidate, userPortfolioDataValidate, userController.addPortfolio);

router.post('/:userId/share/:shareId/buy', tradeValidate, userController.buyShare);
router.post('/:userId/share/:shareId/sell', tradeValidate, userController.sellShare);

module.exports = router;