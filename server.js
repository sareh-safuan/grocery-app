"use strict"

const http = require('http')
const { port } = require('./config')
const app = require('./app/app')

const server = http.createServer(app)

server.listen(port, () => {
    console.log(`Grocery App is running at port ${port}.`)
})