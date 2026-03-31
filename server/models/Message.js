const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true
  },
  sender: {
    type: String,
    default: 'Anonymous Visitor'
  },
  email: {
    type: String,
    required: false,
    trim: true,
    lowercase: true
  },
  status: {
    type: String,
    enum: ['new', 'read', 'archived'],
    default: 'new'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Message', MessageSchema);
