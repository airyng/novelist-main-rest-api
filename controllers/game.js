const DefaultController = require('./classes/Default')
const Game = require('../models/game')

module.exports = new DefaultController(Game)