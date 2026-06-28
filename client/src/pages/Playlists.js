import React, { useState, useEffect } from 'react';
import { playlistsAPI } from '../services/api';

function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const fetchPlaylists = async () => {
    try {
      const response = await playlistsAPI.getAll();
      setPlaylists(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching playlists:', err);
      setLoading(false);
    }
  };

  const handleCreatePlaylist = async (e) => {
    e.preventDefault();
    try {
      await playlistsAPI.create(formData.name, formData.description);
      setFormData({ name: '', description: '' });
      setShowForm(false);
      fetchPlaylists();
    } catch (err) {
      console.error('Error creating playlist:', err);
    }
  };

  const handleDeletePlaylist = async (id) => {
    if (window.confirm('Delete this playlist?')) {
      try {
        await playlistsAPI.delete(id);
        fetchPlaylists();
      } catch (err) {
        console.error('Error deleting playlist:', err);
      }
    }
  };

  if (loading) return <div className="container"><p>Loading...</p></div>;

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>My Playlists</h2>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Create Playlist'}
        </button>
      </div>

      {showForm && (
        <div className="card" style={{ marginTop: '1.5rem' }}>
          <h3>Create New Playlist</h3>
          <form onSubmit={handleCreatePlaylist}>
            <input
              type="text"
              placeholder="Playlist Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <textarea
              placeholder="Description (optional)"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows="3"
            ></textarea>
            <button type="submit">Create Playlist</button>
          </form>
        </div>
      )}

      <div className="card-grid">
        {playlists.map((playlist) => (
          <div key={playlist._id} className="card">
            <h3>📋 {playlist.name}</h3>
            <p>{playlist.description}</p>
            <p><strong>Videos:</strong> {playlist.videos?.length || 0}</p>
            <button
              onClick={() => handleDeletePlaylist(playlist._id)}
              className="danger"
              style={{ width: '100%', marginTop: '1rem' }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {playlists.length === 0 && !showForm && (
        <div className="card" style={{ marginTop: '2rem', textAlign: 'center' }}>
          <p>No playlists yet. Create your first one!</p>
        </div>
      )}
    </div>
  );
}

export default Playlists;
