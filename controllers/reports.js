const DefaultController = require('./classes/Default')
const Report = require('../models/report')
module.exports = new DefaultController(Report)