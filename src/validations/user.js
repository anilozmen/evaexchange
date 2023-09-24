const { body, param } = require('express-validator');
const { User } = require('../models/index');
const UserService = require('../services/userService');
const ShareService = require('../services/shareService');

const postValidate = [
    body("firstName")
        .trim()
        .notEmpty()
        .withMessage("First name is required")
        .isString()
        .withMessage("First name should be string"),
    body("lastName")
        .notEmpty()
        .withMessage("Last name is required")
        .isString()
        .withMessage("Last name should be string"),
    body("balance")
        .toFloat()
        .isDecimal({decimal_digits: '2'})
        .withMessage("Balance must be a valid number with 2 digits"),
    body("email")
        .custom(async (value) => {
            const user = await User.findOne({ where: { email: value } });
            if (user) throw new Error('Email is already taken')
        })
        .isEmail()
        .withMessage("Provide a valid email")
];

const userIdValidate = [
    param('userId').isInt().withMessage('The user id must be a numeric value')
];

const userPortfolioDataValidate = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Portfolio name should not be empty")
        .isString()
        .withMessage("Portfolio name is required"),
];

const tradeValidate = [
    param('userId')
        .isInt()
        .withMessage('The User ID must be a numeric value.')
        .custom(async (value) => {
            const user = await UserService.hasPortfolio(value);
            if (!user) throw new Error('User must have a portfolio before trade.')
        }),
    param('shareId')
        .isInt()
        .withMessage('The Share ID must be a numeric value.')
        .custom(async (value) => {
            const share = await ShareService.findShareById(value);
            if (!share) throw new Error('Share does not exist.');
        }),
    body('quantity')
        .isInt()
        .withMessage("The quantity must be a numeric value."),
];

module.exports = { 
    postValidate, userIdValidate, 
    userPortfolioDataValidate, tradeValidate
};