const express = require('express')
const router = express.Router()
const middlewares = require.main.require('./boot/middlewareManager')

const modules = {
  auth: require('./modules/auth.js'),
  users: require('./modules/users.js'),
  games: require('./modules/games.js'),
  sex: require('./modules/sex.js'),
  roles: require('./modules/roles.js'),
  tags: require('./modules/tags.js'),
}

Object.keys(modules).map(key => {
  modules[key](router, middlewares.common)
})

module.exports = router