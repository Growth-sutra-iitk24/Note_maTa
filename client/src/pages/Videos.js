import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { videosAPI } from '../services/api';

function Videos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    youtubeId: '',
    title: '',
    channelName: ''
  });

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await videosAPI.getAll();
      setVideos(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching videos:', err);
      setLoading(false);
    }
  };

  const handleAddVideo = async (e) => {
    e.preventDefault();
    try {
      await videosAPI.add(formData);
      setFormData({ youtubeId: '', title: '', channelName: '' });
      setShowForm(false);
      fetchVideos();
    } catch (err) {
      console.error('Error adding video:', err);
    }
  };

  const handleDeleteVideo = async (id) => {
    if (window.confirm('Delete this video?')) {
      try {
        await videosAPI.delete(id);
        fetchVideos();
      } catch (err) {
        console.error('Error deleting video:', err);
      }
    }
  };

  if (loading) return <div className="container"><p>Loading...</p></div>;

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>My Videos</h2>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add Video'}
        </button>
      </div>

      {showForm && (
        <div className="card" style={{ marginTop: '1.5rem' }}>
          <h3>Add YouTube Video</h3>
          <form onSubmit={handleAddVideo}>
            <input
              type="text"
              placeholder="YouTube Video ID (from URL)"
              value={formData.youtubeId}
              onChange={(e) => setFormData({ ...formData, youtubeId: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Video Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Channel Name"
              value={formData.channelName}
              onChange={(e) => setFormData({ ...formData, channelName: e.target.value })}
            />
            <button type="submit">Add Video</button>
          </form>
        </div>
      )}

      <div className="card-grid">
        {videos.map((video) => (
          <div key={video._id} className="card-item">
            <img src={video.thumbnail} alt={video.title} />
            <div className="card-item-content">
              <h3>{video.title}</h3>
              <p>{video.channelName}</p>
              <div className="btn-group" style={{ marginTop: '0.5rem' }}>
                <Link to={`/videos/${video._id}`} style={{ flex: 1 }}>
                  <button style={{ width: '100%' }}>Watch</button>
                </Link>
                <button
                  onClick={() => handleDeleteVideo(video._id)}
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

      {videos.length === 0 && !showForm && (
        <div className="card" style={{ marginTop: '2rem', textAlign: 'center' }}>
          <p>No videos yet. Add your first video!</p>
        </div>
      )}
    </div>
  );
}

export default Videos;
