const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now()
  },
  updated_at: {
    type: Date,
    default: Date.now()
  },
  json: {
    type: String,
    required: true
  },
  author: {
    type: Number,
    required: true
  },
  published_at: {
    type: Date,
    default: null
  }
})

module.exports = mongoose.model('Game', gameSchema)