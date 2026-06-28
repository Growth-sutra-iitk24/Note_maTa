const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Book = require('../models/Book');

// Add book
router.post('/', auth, async (req, res) => {
  try {
    const { title, author, description, fileUrl, fileType, coverImage } = req.body;

    const book = new Book({
      userId: req.userId,
      title,
      author,
      description,
      fileUrl,
      fileType,
      coverImage
    });

    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ message: 'Error adding book', error: err.message });
  }
});

// Get all books for user
router.get('/', auth, async (req, res) => {
  try {
    const books = await Book.find({ userId: req.userId })
      .populate('notes')
      .sort({ savedAt: -1 });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching books', error: err.message });
  }
});

// Get single book
router.get('/:id', auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate('notes');

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (book.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(book);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching book', error: err.message });
  }
});

// Update book progress
router.put('/:id', auth, async (req, res) => {
  try {
    const { currentPage, status } = req.body;

    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (book.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (currentPage !== undefined) book.currentPage = currentPage;
    if (status !== undefined) book.status = status;
    book.updatedAt = Date.now();

    await book.save();
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: 'Error updating book', error: err.message });
  }
});

// Delete book
router.delete('/:id', auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (book.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting book', error: err.message });
  }
});

module.exports = router;
