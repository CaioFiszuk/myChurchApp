const mongoose = require('mongoose');

const sermonSchema = new mongoose.Schema({
  speaker: {
    type: String,
    required: true,
  },
  passage: {
    type: String,
    defualt: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('sermon', sermonSchema);