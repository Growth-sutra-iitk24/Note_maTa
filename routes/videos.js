const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Video = require('../models/Video');
const axios = require('axios');

// Add video
router.post('/', auth, async (req, res) => {
  try {
    const { youtubeId, playlistId } = req.body;

    // Fetch video info from YouTube API
    const videoInfo = {
      youtubeId,
      title: req.body.title || 'Untitled Video',
      description: req.body.description || '',
      thumbnail: `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`,
      channelName: req.body.channelName || 'Unknown Channel',
      duration: req.body.duration || 0
    };

    const video = new Video({
      userId: req.userId,
      ...videoInfo,
      ...(playlistId && { playlistId })
    });

    await video.save();
    res.status(201).json(video);
  } catch (err) {
    res.status(500).json({ message: 'Error adding video', error: err.message });
  }
});

// Get all videos for user
router.get('/', auth, async (req, res) => {
  try {
    const videos = await Video.find({ userId: req.userId })
      .populate('notes')
      .sort({ savedAt: -1 });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching videos', error: err.message });
  }
});

// Get single video
router.get('/:id', auth, async (req, res) => {
  try {
    const video = await Video.findById(req.params.id)
      .populate('notes');
    
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    if (video.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(video);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching video', error: err.message });
  }
});

// Delete video
router.delete('/:id', auth, async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    if (video.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Video.findByIdAndDelete(req.params.id);
    res.json({ message: 'Video deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting video', error: err.message });
  }
});

module.exports = router;
