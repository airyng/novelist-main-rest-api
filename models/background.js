const mongoose = require('mongoose')
const Tag = require.main.require('./models/tag')
const { Schema } = mongoose

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  image_id: {
    type: String,
    required: true
  },
  tags: [{
    type: Schema.Types.ObjectId,
    ref: Tag,
    default: null
  }]
},
{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

module.exports = mongoose.model('Background', schema)