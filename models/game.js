const User = require('./user')
const mongoose = require('mongoose')
const { Schema } = mongoose

const schema = new mongoose.Schema({
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
  json: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: User
  },
  published_at: {
    type: Date,
    default: null
  }
},
{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

module.exports = mongoose.model('Game', schema)