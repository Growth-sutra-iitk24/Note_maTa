const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  youtubeId: {
    type: String,
    required: true
  },
  title: String,
  description: String,
  thumbnail: String,
  channelName: String,
  duration: Number,
  playlistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Playlist'
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

module.exports = mongoose.model('Video', videoSchema);
