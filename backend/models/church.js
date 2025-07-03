const mongoose = require('mongoose');

const churchSchema = new mongoose.Schema({
  churchName: {
    type: String,
    default: 'church',
  },
  image: {
    type: String,
    default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAek7cuwLVMkFl-Dyqhmj6rgLGI1RHFu2YIg&s',
  },
  logo: {
    type: String,
    default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-4bNkRKVqpCASzrTpHsOZ9yljIiJNeOdezw&s',
  },
  pastor: {
    type: String,
    default: 'pastor'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('church', churchSchema);