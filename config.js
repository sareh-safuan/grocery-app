"use strict"

const path = require('path')

module.exports = {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    rootPath: path.resolve(__dirname)
}