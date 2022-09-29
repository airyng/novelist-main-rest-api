const mongoose = require('mongoose')

const sexSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Sex', sexSchema)