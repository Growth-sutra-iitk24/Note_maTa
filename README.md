# NoteMata - Your Digital Library 📚

A comprehensive web application to save and organize YouTube videos, playlists, books, and create notes for all your content. Watch YouTube videos directly on the platform and manage your personal digital library.

## Features 🎯

- **YouTube Integration**: Save YouTube videos and create playlists
- **Video Playback**: Watch YouTube videos directly on the platform
- **Book Management**: Add and organize books (PDF, EPUB, TXT, HTML)
- **Note Taking**: Create notes for videos and books
- **Progress Tracking**: Track your reading progress and video bookmarks
- **User Authentication**: Secure login and registration
- **Personal Dashboard**: Overview of all your saved content
- **Responsive Design**: Works on desktop, tablet, and mobile

## Tech Stack 🛠️

### Backend
- **Node.js & Express**: API server
- **MongoDB**: Database
- **JWT**: Authentication
- **bcryptjs**: Password hashing

### Frontend
- **React**: UI framework
- **React Router**: Navigation
- **Axios**: HTTP client
- **CSS3**: Styling

## Project Structure

```
Note_maTa/
├── server.js                 # Main server file
├── package.json             # Backend dependencies
├── .env                     # Environment variables
│
├── models/                  # MongoDB models
│   ├── User.js
│   ├── Video.js
│   ├── Playlist.js
│   ├── Book.js
│   └── Note.js
│
├── routes/                  # API routes
│   ├── auth.js
│   ├── videos.js
│   ├── playlists.js
│   ├── books.js
│   └── notes.js
│
├── middleware/              # Middleware
│   └── auth.js
│
└── client/                  # React frontend
    ├── package.json
    ├── public/
    │   └── index.html
    └── src/
        ├── index.js
        ├── index.css
        ├── App.js
        ├── App.css
        ├── services/
        │   └── api.js       # API service
        └── pages/
            ├── Login.js
            ├── Register.js
            ├── Dashboard.js
            ├── Videos.js
            ├── VideoPlayer.js
            ├── Playlists.js
            ├── Books.js
            └── BookReader.js
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud)

### Step 1: Clone and Install Backend

```bash
# Clone the repository
git clone <repository-url>
cd Note_maTa

# Install backend dependencies
npm install
```

### Step 2: Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/note-mata
JWT_SECRET=your_secret_key_here_change_in_production
NODE_ENV=development
```

For MongoDB:
- **Local**: `mongodb://localhost:27017/note-mata`
- **Cloud (MongoDB Atlas)**: `mongodb+srv://username:password@cluster.mongodb.net/note-mata`

### Step 3: Install Frontend Dependencies

```bash
cd client
npm install
```

### Step 4: Start the Application

#### Terminal 1 - Backend
```bash
npm run dev
# or
npm start
```

#### Terminal 2 - Frontend
```bash
cd client
npm start
```

The application will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Videos
- `GET /api/videos` - Get all videos
- `POST /api/videos` - Add new video
- `GET /api/videos/:id` - Get video details
- `DELETE /api/videos/:id` - Delete video

### Playlists
- `GET /api/playlists` - Get all playlists
- `POST /api/playlists` - Create playlist
- `GET /api/playlists/:id` - Get playlist details
- `POST /api/playlists/:playlistId/videos/:videoId` - Add video to playlist
- `DELETE /api/playlists/:id` - Delete playlist

### Books
- `GET /api/books` - Get all books
- `POST /api/books` - Add book
- `GET /api/books/:id` - Get book details
- `PUT /api/books/:id` - Update book progress
- `DELETE /api/books/:id` - Delete book

### Notes
- `GET /api/notes` - Get all notes
- `POST /api/notes` - Create note
- `GET /api/notes/video/:videoId` - Get video notes
- `GET /api/notes/book/:bookId` - Get book notes
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

## Usage Guide

### Creating an Account
1. Go to the Register page
2. Enter username, email, and password
3. Click Register
4. You'll be automatically logged in

### Saving Videos
1. Navigate to Videos section
2. Click "Add Video"
3. Enter the YouTube Video ID (from the video URL: `youtube.com/watch?v=VIDEO_ID`)
4. Add title and channel name
5. Click "Add Video"

### Creating Playlists
1. Go to Playlists section
2. Click "Create Playlist"
3. Enter playlist name and description
4. Your playlist is created
5. You can add videos to playlists from the video page

### Managing Books
1. Go to Books section
2. Click "Add Book"
3. Enter book details and file URL
4. Click "Add Book"
5. Click "Read" to open the book and track your progress

### Taking Notes
- On any video or book page, scroll down to the Notes section
- Type your note and click "Add Note"
- Your notes are automatically saved and timestamped
- Delete notes as needed

## MongoDB Setup

### Local MongoDB
```bash
# Install MongoDB Community Edition
# Start MongoDB service
mongod
```

### MongoDB Atlas (Cloud)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a cluster
4. Get your connection string
5. Update `.env` with your connection string

## Deployment

### Backend (Heroku)
```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret

# Deploy
git push heroku main
```

### Frontend (Vercel/Netlify)
```bash
# Build the frontend
cd client
npm run build

# Deploy the build folder to Vercel or Netlify
```

## Development Tips

### Adding New Features
1. Create database models in `models/`
2. Create API routes in `routes/`
3. Add API methods in `client/src/services/api.js`
4. Create React components in `client/src/pages/` or `client/src/components/`

### Error Handling
- Check browser console for frontend errors
- Check terminal for backend errors
- Check MongoDB connection if data operations fail

### Debugging
- Use `console.log()` in both backend and frontend
- Check Network tab in browser DevTools
- Monitor MongoDB with MongoDB Compass

## Future Enhancements

- [ ] Advanced search and filters
- [ ] Collaborative playlists/collections
- [ ] Social sharing features
- [ ] Recommendation engine
- [ ] Advanced book reader with highlights
- [ ] Video transcripts and timestamps
- [ ] Cloud storage integration
- [ ] Export notes to PDF
- [ ] Dark mode
- [ ] Mobile app

## Troubleshooting

### "Cannot connect to MongoDB"
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- Verify MongoDB credentials

### "Port 5000 already in use"
```bash
# Change PORT in .env or kill process
# On Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# On Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### "CORS errors"
- Ensure frontend is on localhost:3000
- Verify backend proxy is set in client/package.json

### "Videos not loading"
- Check YouTube Video ID format
- Ensure video is not private/restricted

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues and questions, please open an issue on GitHub or contact the development team.

---

**Happy Learning! 📚📹✍️**
