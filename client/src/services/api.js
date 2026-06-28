import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    Authorization: `Bearer ${token}`
  };
};

// Auth API
export const authAPI = {
  register: (username, email, password) =>
    axios.post(`${API_URL}/auth/register`, { username, email, password }),
  login: (email, password) =>
    axios.post(`${API_URL}/auth/login`, { email, password })
};

// Videos API
export const videosAPI = {
  getAll: () =>
    axios.get(`${API_URL}/videos`, { headers: getAuthHeader() }),
  getById: (id) =>
    axios.get(`${API_URL}/videos/${id}`, { headers: getAuthHeader() }),
  add: (videoData) =>
    axios.post(`${API_URL}/videos`, videoData, { headers: getAuthHeader() }),
  delete: (id) =>
    axios.delete(`${API_URL}/videos/${id}`, { headers: getAuthHeader() })
};

// Playlists API
export const playlistsAPI = {
  getAll: () =>
    axios.get(`${API_URL}/playlists`, { headers: getAuthHeader() }),
  getById: (id) =>
    axios.get(`${API_URL}/playlists/${id}`, { headers: getAuthHeader() }),
  create: (name, description) =>
    axios.post(`${API_URL}/playlists`, { name, description }, { headers: getAuthHeader() }),
  addVideo: (playlistId, videoId) =>
    axios.post(`${API_URL}/playlists/${playlistId}/videos/${videoId}`, {}, { headers: getAuthHeader() }),
  delete: (id) =>
    axios.delete(`${API_URL}/playlists/${id}`, { headers: getAuthHeader() })
};

// Books API
export const booksAPI = {
  getAll: () =>
    axios.get(`${API_URL}/books`, { headers: getAuthHeader() }),
  getById: (id) =>
    axios.get(`${API_URL}/books/${id}`, { headers: getAuthHeader() }),
  add: (bookData) =>
    axios.post(`${API_URL}/books`, bookData, { headers: getAuthHeader() }),
  update: (id, updates) =>
    axios.put(`${API_URL}/books/${id}`, updates, { headers: getAuthHeader() }),
  delete: (id) =>
    axios.delete(`${API_URL}/books/${id}`, { headers: getAuthHeader() })
};

// Notes API
export const notesAPI = {
  getAll: () =>
    axios.get(`${API_URL}/notes`, { headers: getAuthHeader() }),
  getVideoNotes: (videoId) =>
    axios.get(`${API_URL}/notes/video/${videoId}`, { headers: getAuthHeader() }),
  getBookNotes: (bookId) =>
    axios.get(`${API_URL}/notes/book/${bookId}`, { headers: getAuthHeader() }),
  create: (noteData) =>
    axios.post(`${API_URL}/notes`, noteData, { headers: getAuthHeader() }),
  update: (id, content) =>
    axios.put(`${API_URL}/notes/${id}`, { content }, { headers: getAuthHeader() }),
  delete: (id) =>
    axios.delete(`${API_URL}/notes/${id}`, { headers: getAuthHeader() })
};
