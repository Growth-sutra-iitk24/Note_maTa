import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { booksAPI, notesAPI } from '../services/api';

function BookReader() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookData();
  }, [id]);

  const fetchBookData = async () => {
    try {
      const bookRes = await booksAPI.getById(id);
      setBook(bookRes.data);
      
      const notesRes = await notesAPI.getBookNotes(id);
      setNotes(notesRes.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching book:', err);
      setLoading(false);
    }
  };

  const handleUpdateProgress = async (newPage) => {
    try {
      await booksAPI.update(id, { currentPage: newPage });
      fetchBookData();
    } catch (err) {
      console.error('Error updating progress:', err);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    try {
      await notesAPI.create({
        content: newNote,
        contentType: 'book',
        bookId: id
      });
      setNewNote('');
      fetchBookData();
    } catch (err) {
      console.error('Error adding note:', err);
    }
  };

  const handleDeleteNote = async (noteId) => {
    if (window.confirm('Delete this note?')) {
      try {
        await notesAPI.delete(noteId);
        fetchBookData();
      } catch (err) {
        console.error('Error deleting note:', err);
      }
    }
  };

  if (loading) return <div className="container"><p>Loading...</p></div>;
  if (!book) return <div className="container"><p>Book not found</p></div>;

  return (
    <div className="container">
      <button onClick={() => navigate('/books')}>← Back</button>
      
      <div className="card" style={{ marginTop: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {book.coverImage && (
            <img
              src={book.coverImage}
              alt={book.title}
              style={{ width: '150px', height: '250px', objectFit: 'cover', borderRadius: '8px' }}
            />
          )}
          <div style={{ flex: 1 }}>
            <h2>{book.title}</h2>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Status:</strong> {book.status}</p>
            <p><strong>Progress:</strong> {book.currentPage} / {book.totalPages || '?'} pages</p>
            <p>{book.description}</p>
            
            <div style={{ marginTop: '1.5rem' }}>
              <label>
                Update Progress:
                <input
                  type="number"
                  value={book.currentPage}
                  onChange={(e) => handleUpdateProgress(Number(e.target.value))}
                  style={{ marginLeft: '0.5rem', width: '100px' }}
                />
              </label>
            </div>

            <select
              value={book.status}
              onChange={(e) => booksAPI.update(id, { status: e.target.value })}
              style={{ marginTop: '1rem' }}
            >
              <option value="want-to-read">Want to Read</option>
              <option value="reading">Currently Reading</option>
              <option value="completed">Completed</option>
            </select>

            <a href={book.fileUrl} target="_blank" rel="noopener noreferrer">
              <button style={{ marginTop: '1rem' }}>📖 Open Book</button>
            </a>
          </div>
        </div>
      </div>

      <div className="notes-section">
        <h3>📝 Notes</h3>
        
        <form onSubmit={handleAddNote} style={{ marginBottom: '1.5rem' }}>
          <textarea
            placeholder="Add a note about this book..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            rows="3"
            required
          ></textarea>
          <button type="submit">Add Note</button>
        </form>

        {notes.length > 0 ? (
          <div>
            {notes.map((note) => (
              <div key={note._id} className="note-item">
                <p className="note-item-content">{note.content}</p>
                <small style={{ color: '#999' }}>
                  {new Date(note.createdAt).toLocaleString()}
                </small>
                <button
                  onClick={() => handleDeleteNote(note._id)}
                  className="danger"
                  style={{ marginTop: '0.5rem', padding: '0.25rem 0.5rem', fontSize: '0.85rem' }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No notes yet. Add one above!</p>
        )}
      </div>
    </div>
  );
}

export default BookReader;
