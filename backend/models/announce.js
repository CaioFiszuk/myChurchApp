const mongoose = require('mongoose');

const announceSchema = new mongoose.Schema({
  announceDate: {
    type: Date,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  art: {
    type: String,
    default: ''
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

module.exports = mongoose.model('announce', announceSchema);