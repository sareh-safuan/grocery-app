"use strict"

const { check } = require('express-validator/check')

module.exports = {}

module.exports.update = [
    check('upc12Barcode')
        .trim()
        .optional({ checkFalsy: true })
        .isNumeric()
            .withMessage('Upc Barcode should only contain numbers.')
        .isLength({ min: 12, max: 12 })
            .withMessage('Upc Barcode should only have 12 digits.'),
    check('brand')
        .trim()
        .isLength({ min: 1, max: 100 })
            .withMessage('Brand name characters length should be between 1 and 100')
            .escape(),
    check('productName')
        .trim()
        .isLength({ min: 3, max: 100 })
            .withMessage('Product name characters length should be between 3 and 100')
            .escape()
]