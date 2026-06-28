const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Playlist = require('../models/Playlist');
const Video = require('../models/Video');

// Create playlist
router.post('/', auth, async (req, res) => {
  try {
    const { name, description } = req.body;

    const playlist = new Playlist({
      userId: req.userId,
      name,
      description
    });

    await playlist.save();
    res.status(201).json(playlist);
  } catch (err) {
    res.status(500).json({ message: 'Error creating playlist', error: err.message });
  }
});

// Get all playlists for user
router.get('/', auth, async (req, res) => {
  try {
    const playlists = await Playlist.find({ userId: req.userId })
      .populate('videos')
      .sort({ createdAt: -1 });
    res.json(playlists);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching playlists', error: err.message });
  }
});

// Get single playlist
router.get('/:id', auth, async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id)
      .populate({
        path: 'videos',
        populate: { path: 'notes' }
      });

    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    if (playlist.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(playlist);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching playlist', error: err.message });
  }
});

// Add video to playlist
router.post('/:playlistId/videos/:videoId', auth, async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.playlistId);

    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    if (playlist.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const video = await Video.findById(req.params.videoId);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    if (!playlist.videos.includes(req.params.videoId)) {
      playlist.videos.push(req.params.videoId);
      await playlist.save();
    }

    res.json(playlist);
  } catch (err) {
    res.status(500).json({ message: 'Error adding video to playlist', error: err.message });
  }
});

// Delete playlist
router.delete('/:id', auth, async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);

    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    if (playlist.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Playlist.findByIdAndDelete(req.params.id);
    res.json({ message: 'Playlist deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting playlist', error: err.message });
  }
});

module.exports = router;
