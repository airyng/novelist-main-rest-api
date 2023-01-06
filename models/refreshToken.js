const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  token: {
    type: String,
    required: true
  }
},
{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

module.exports = mongoose.model('refresh_token', schema)