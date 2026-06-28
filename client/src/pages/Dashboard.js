import React, { useState, useEffect } from 'react';
import { videosAPI, booksAPI, playlistsAPI, notesAPI } from '../services/api';

function Dashboard() {
  const [stats, setStats] = useState({
    totalVideos: 0,
    totalBooks: 0,
    totalPlaylists: 0,
    totalNotes: 0
  });
  const [recentItems, setRecentItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const videosRes = await videosAPI.getAll();
      const booksRes = await booksAPI.getAll();
      const playlistsRes = await playlistsAPI.getAll();
      const notesRes = await notesAPI.getAll();

      setStats({
        totalVideos: videosRes.data.length,
        totalBooks: booksRes.data.length,
        totalPlaylists: playlistsRes.data.length,
        totalNotes: notesRes.data.length
      });

      // Combine and sort by date for recent items
      const allItems = [
        ...videosRes.data.map(v => ({ ...v, type: 'video' })),
        ...booksRes.data.map(b => ({ ...b, type: 'book' })),
        ...notesRes.data.map(n => ({ ...n, type: 'note' }))
      ].sort((a, b) => new Date(b.savedAt || b.createdAt) - new Date(a.savedAt || a.createdAt)).slice(0, 5);

      setRecentItems(allItems);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setLoading(false);
    }
  };

  if (loading) return <div className="container"><p>Loading...</p></div>;

  return (
    <div className="container">
      <h2>Dashboard</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <h3>📹 Videos</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4a9eff' }}>{stats.totalVideos}</p>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <h3>📚 Books</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4a9eff' }}>{stats.totalBooks}</p>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <h3>📋 Playlists</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4a9eff' }}>{stats.totalPlaylists}</p>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <h3>📝 Notes</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4a9eff' }}>{stats.totalNotes}</p>
        </div>
      </div>

      <div className="card" style={{ marginTop: '2rem' }}>
        <h3>Recent Activity</h3>
        {recentItems.length > 0 ? (
          <ul style={{ listStyle: 'none', marginTop: '1rem' }}>
            {recentItems.map((item, idx) => (
              <li key={idx} style={{ padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>
                <strong>{item.type.toUpperCase()}</strong>: {item.title || item.content?.substring(0, 50)}
              </li>
            ))}
          </ul>
        ) : (
          <p>No recent activity</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
