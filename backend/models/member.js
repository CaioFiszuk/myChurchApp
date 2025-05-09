const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  memberName: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('member', memberSchema);