const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  memberName: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date
  },
  church: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'church', 
    required: true 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('member', memberSchema);