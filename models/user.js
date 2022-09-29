const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    default: null
  },
  avatar_id: {
    type: String,
    default: null
  },
  created_at: {
    type: Date,
    default: Date.now()
  },
  updated_at: {
    type: Date,
    default: Date.now()
  },
  sex: {
    type: Schema.Types.ObjectId,
    ref: 'Sex'
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: 'Role'
  }
})

module.exports = mongoose.model('User', userSchema)