const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Note = require('../models/Note');
const Video = require('../models/Video');
const Book = require('../models/Book');

// Create note
router.post('/', auth, async (req, res) => {
  try {
    const { content, contentType, videoId, bookId, timestamp } = req.body;

    // Validate that either videoId or bookId is provided
    if (!videoId && !bookId) {
      return res.status(400).json({ message: 'Either videoId or bookId must be provided' });
    }

    const note = new Note({
      userId: req.userId,
      content,
      contentType,
      ...(videoId && { videoId }),
      ...(bookId && { bookId }),
      ...(timestamp && { timestamp })
    });

    await note.save();

    // Add note to video or book
    if (videoId) {
      await Video.findByIdAndUpdate(videoId, { $push: { notes: note._id } });
    } else if (bookId) {
      await Book.findByIdAndUpdate(bookId, { $push: { notes: note._id } });
    }

    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: 'Error creating note', error: err.message });
  }
});

// Get all notes for user
router.get('/', auth, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.userId })
      .populate('videoId')
      .populate('bookId')
      .sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching notes', error: err.message });
  }
});

// Get notes for specific video
router.get('/video/:videoId', auth, async (req, res) => {
  try {
    const notes = await Note.find({
      userId: req.userId,
      videoId: req.params.videoId,
      contentType: 'video'
    }).sort({ timestamp: 1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching notes', error: err.message });
  }
});

// Get notes for specific book
router.get('/book/:bookId', auth, async (req, res) => {
  try {
    const notes = await Note.find({
      userId: req.userId,
      bookId: req.params.bookId,
      contentType: 'book'
    }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching notes', error: err.message });
  }
});

// Update note
router.put('/:id', auth, async (req, res) => {
  try {
    const { content } = req.body;

    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    if (note.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    note.content = content;
    note.updatedAt = Date.now();
    await note.save();

    res.json(note);
  } catch (err) {
    res.status(500).json({ message: 'Error updating note', error: err.message });
  }
});

// Delete note
router.delete('/:id', auth, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    if (note.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: 'Note deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting note', error: err.message });
  }
});

module.exports = router;
