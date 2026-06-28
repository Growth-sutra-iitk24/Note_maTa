const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  author: String,
  description: String,
  fileUrl: String,
  fileType: {
    type: String,
    enum: ['pdf', 'epub', 'txt', 'html']
  },
  coverImage: String,
  currentPage: {
    type: Number,
    default: 0
  },
  totalPages: Number,
  status: {
    type: String,
    enum: ['reading', 'completed', 'want-to-read'],
    default: 'want-to-read'
  },
  savedAt: {
    type: Date,
    default: Date.now
  },
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Note'
    }
  ]
});

module.exports = mongoose.model('Book', bookSchema);
