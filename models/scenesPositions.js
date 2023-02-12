const mongoose = require('mongoose')
const { Schema } = mongoose

const schema = new mongoose.Schema({
  game_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  value: {
    type: Object,
    required: true
  }
},
{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

module.exports = mongoose.model('scenes_positions', schema)