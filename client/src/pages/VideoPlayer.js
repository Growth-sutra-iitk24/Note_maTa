import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { videosAPI, notesAPI } from '../services/api';

function VideoPlayer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideoData();
  }, [id]);

  const fetchVideoData = async () => {
    try {
      const videoRes = await videosAPI.getById(id);
      setVideo(videoRes.data);
      
      const notesRes = await notesAPI.getVideoNotes(id);
      setNotes(notesRes.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching video:', err);
      setLoading(false);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    try {
      await notesAPI.create({
        content: newNote,
        contentType: 'video',
        videoId: id
      });
      setNewNote('');
      fetchVideoData();
    } catch (err) {
      console.error('Error adding note:', err);
    }
  };

  const handleDeleteNote = async (noteId) => {
    if (window.confirm('Delete this note?')) {
      try {
        await notesAPI.delete(noteId);
        fetchVideoData();
      } catch (err) {
        console.error('Error deleting note:', err);
      }
    }
  };

  if (loading) return <div className="container"><p>Loading...</p></div>;
  if (!video) return <div className="container"><p>Video not found</p></div>;

  return (
    <div className="container">
      <button onClick={() => navigate('/videos')}>← Back</button>
      
      <div className="card" style={{ marginTop: '1.5rem' }}>
        <div className="video-player">
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}`}
            allowFullScreen
            title={video.title}
          ></iframe>
        </div>
        
        <h2>{video.title}</h2>
        <p><strong>Channel:</strong> {video.channelName}</p>
        <p>{video.description}</p>
      </div>

      <div className="notes-section">
        <h3>📝 Notes</h3>
        
        <form onSubmit={handleAddNote} style={{ marginBottom: '1.5rem' }}>
          <textarea
            placeholder="Add a note about this video..."
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

export default VideoPlayer;
