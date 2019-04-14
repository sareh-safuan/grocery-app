"use strict"

const express = require('express')
const { validationResult } = require('express-validator/check')
const grocery = require('./groceryModel')
const { update } = require('./groceryValidator')

const router = express.Router()

router.get('/', (req, res) => {
    const page = (!req.query.page || req.query.page < 1) ? 1 : req.query.page
    const sort = req.query.sort || "asc"
    const select = req.query.select
    const limit = 20
    const end = limit * page
    const start = end - limit

    if(!['brand', 'productName'].includes(select)) {
        return res.status(400).json({ success: 0, message: 'Bad request' })
    }

    if(sort === "asc") {
        grocery.sort((a, b) => (a[select] > b[select]) ? 1 : -1)
    }else {
        grocery.sort((a, b) => (a[select] > b[select]) ? -1 : 1)
    }

    const result = grocery.slice(start, end)

    if(!result.length) {
        return res.status(404).json({ 
            success: 0, 
            message: 'No more products found.' 
        })
    }

    res.json({ success: 1, result })
})

router.get('/search', (req, res) => {
    const { type, keyword } = req.query

    if(!type || !keyword || !['brand', 'productName'].includes(type)) {
        return res.status(400).json({ success: 0, message: 'Bad Request' })
    }

    const result = grocery.filter(a => {
        if(a[type].toLowerCase().search(keyword.toLowerCase()) !== -1) {
            return a
        }
    })

    if(!result.length) {
        return res.status(404).json({ 
            success: 0, 
            message: `No result found using keyword ${keyword}.` 
        })
    }

    res.json({ success: 1, result })
})

router.get('/:id', (req, res) => {
    const { id } = req.params

    const result = grocery.find((a) => a.id == id)

    if(!result) {
        return res.status(404).json({ success: 0, message: 'Product not Found' })
    }

    res.json({ success: 1, result })
})

router.use(express.json())

router.put('/:id', update, (req, res) => {
    const errors = validationResult(req)
    const { id } = req.params

    if(!errors.isEmpty()) {
        const errorsMsg = errors.array().map(a => {
            return a.msg
        })
        return res.status(422).json({
            success: 0,
            message: 'Input errors.',
            errorsMsg
        })
    }

    const result = grocery.findIndex(a => {
        return (a.id === parseInt(id)) ? a : null
    })

    if(result === -1) {
        return res.status(404).json({ 
            success: 0, 
            message: 'Update failed, product not found.' 
        })
    }

    grocery[result] = req.body

    res.json({ success: 1, message: 'Product successfully updated.' })
})

module.exports = router