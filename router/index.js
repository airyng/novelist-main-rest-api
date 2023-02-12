const express = require('express')
const router = express.Router()
const middlewares = require.main.require('./boot/middlewareManager')

const modules = {
  auth: require('./modules/auth.js'),
  users: require('./modules/users.js'),
  games: require('./modules/games.js'),
  scenesPositions: require('./modules/scenesPositions.js'),
  reports: require('./modules/reports.js'),
  sex: require('./modules/sex.js'),
  roles: require('./modules/roles.js'),
  tags: require('./modules/tags.js'),
  backgrounds: require('./modules/backgrounds.js'),
}

Object.keys(modules).map(key => {
  modules[key](router, middlewares.common)
})

router.get('/', (req, res) => res.sendStatus(200))

module.exports = router