const { body, param } = require('express-validator');
const ShareService = require('../services/shareService');

const postValidate = [
    body("name")
        .custom(async (value) => {
            const exist = await ShareService.existByName(value);
            if (exist) throw new Error('Share name is already taken')
        })
        .trim()
        .notEmpty()
        .withMessage("Share name is required")
        .matches(/^[A-Z]{3}$/)
        .withMessage("Share name must be 3 uppercase letters."),
    body("rate")
        .toFloat()
        .isDecimal({decimal_digits: '2'})
        .withMessage("Rate must be a valid number with 2 digits"),
];

const shareIdValidate = [
    param('shareId').isInt().withMessage('The share id must be a numeric value')
];

const putValidate = [
    body("rate")
        .toFloat()
        .isDecimal({decimal_digits: '2'})
        .withMessage("Rate must be a valid number with 2 digits"),
];

module.exports = { 
    postValidate, putValidate, shareIdValidate
};