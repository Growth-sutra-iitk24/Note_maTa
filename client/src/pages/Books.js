import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { booksAPI } from '../services/api';

function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    fileUrl: '',
    fileType: 'pdf',
    coverImage: ''
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await booksAPI.getAll();
      setBooks(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching books:', err);
      setLoading(false);
    }
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      await booksAPI.add(formData);
      setFormData({
        title: '',
        author: '',
        description: '',
        fileUrl: '',
        fileType: 'pdf',
        coverImage: ''
      });
      setShowForm(false);
      fetchBooks();
    } catch (err) {
      console.error('Error adding book:', err);
    }
  };

  const handleDeleteBook = async (id) => {
    if (window.confirm('Delete this book?')) {
      try {
        await booksAPI.delete(id);
        fetchBooks();
      } catch (err) {
        console.error('Error deleting book:', err);
      }
    }
  };

  if (loading) return <div className="container"><p>Loading...</p></div>;

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>My Books</h2>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add Book'}
        </button>
      </div>

      {showForm && (
        <div className="card" style={{ marginTop: '1.5rem' }}>
          <h3>Add New Book</h3>
          <form onSubmit={handleAddBook}>
            <input
              type="text"
              placeholder="Book Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Author"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows="3"
            ></textarea>
            <input
              type="url"
              placeholder="File URL (link to PDF or book file)"
              value={formData.fileUrl}
              onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
              required
            />
            <select
              value={formData.fileType}
              onChange={(e) => setFormData({ ...formData, fileType: e.target.value })}
            >
              <option value="pdf">PDF</option>
              <option value="epub">EPUB</option>
              <option value="txt">Text</option>
              <option value="html">HTML</option>
            </select>
            <input
              type="url"
              placeholder="Cover Image URL"
              value={formData.coverImage}
              onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
            />
            <button type="submit">Add Book</button>
          </form>
        </div>
      )}

      <div className="card-grid">
        {books.map((book) => (
          <div key={book._id} className="card-item">
            {book.coverImage && <img src={book.coverImage} alt={book.title} />}
            <div className="card-item-content">
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <p style={{ fontSize: '0.85rem', color: '#666' }}>
                Status: <strong>{book.status}</strong>
              </p>
              <div className="btn-group" style={{ marginTop: '0.5rem' }}>
                <Link to={`/books/${book._id}`} style={{ flex: 1 }}>
                  <button style={{ width: '100%' }}>Read</button>
                </Link>
                <button
                  onClick={() => handleDeleteBook(book._id)}
                  className="danger"
                  style={{ flex: 1 }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {books.length === 0 && !showForm && (
        <div className="card" style={{ marginTop: '2rem', textAlign: 'center' }}>
          <p>No books yet. Add your first book!</p>
        </div>
      )}
    </div>
  );
}

export default Books;
