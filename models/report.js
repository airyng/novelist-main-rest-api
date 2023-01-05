const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  device: {
    type: String,
    default: 'Unknown'
  },
  browser: {
    type: String,
    default: 'Unknown'
  },
  screen: {
    type: String,
    default: 'Unknown'
  }
})

module.exports = mongoose.model('Report', schema)