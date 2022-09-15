const DefaultController = require("./classes/default");
const Game = require('../models/game')

module.exports = new DefaultController(Game)