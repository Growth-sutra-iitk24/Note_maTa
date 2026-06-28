import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Videos from './pages/Videos';
import Playlists from './pages/Playlists';
import Books from './pages/Books';
import VideoPlayer from './pages/VideoPlayer';
import BookReader from './pages/BookReader';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      {isAuthenticated && (
        <header>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1>📚 NoteMata</h1>
            <button onClick={handleLogout} style={{ background: '#e74c3c' }}>
              Logout
            </button>
          </div>
          <nav>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/videos">Videos</Link>
            <Link to="/playlists">Playlists</Link>
            <Link to="/books">Books</Link>
          </nav>
        </header>
      )}

      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/videos" element={isAuthenticated ? <Videos /> : <Navigate to="/login" />} />
        <Route path="/videos/:id" element={isAuthenticated ? <VideoPlayer /> : <Navigate to="/login" />} />
        <Route path="/playlists" element={isAuthenticated ? <Playlists /> : <Navigate to="/login" />} />
        <Route path="/books" element={isAuthenticated ? <Books /> : <Navigate to="/login" />} />
        <Route path="/books/:id" element={isAuthenticated ? <BookReader /> : <Navigate to="/login" />} />
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
