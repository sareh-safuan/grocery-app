"use strict"

const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const { rootPath } = require('../config')
const grocery = require('./grocery')

const app = express()

app.use(cors())
app.use(helmet())
app.use(express.static('dist'))

app.get('/', (req, res) => {
    res.sendFile(rootPath + "/dist/index.html")
})

app.use('/grocery', grocery)

app.get("*", (req, res) => {
    res.status(404).send('Not Found')
})

module.exports = app