const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const routes = require('./routes')
const path = require('path')


const server = express()

//Setting
server.set('PORT', 4500)

//Middlewares
server.use(express.urlencoded({ extended: false }))
server.use(express.json())
server.use(morgan('dev'))
server.use(cors())


//Routes
server.use('/api/user', routes.user)


//Public folder
server.use(express.static(path.join(__dirname, 'static')))

module.exports = server
