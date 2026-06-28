# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Prerequisites
- Node.js installed
- MongoDB running (or use MongoDB Atlas)
- Terminal/Command Prompt

### Step 1: Install All Dependencies
```bash
# From project root
npm install

# Install frontend dependencies
cd client && npm install && cd ..
```

### Step 2: Configure Database
Create `.env` file in root with:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/note-mata
JWT_SECRET=dev-secret-key
NODE_ENV=development
```

### Step 3: Start Backend
```bash
npm run dev
```
Backend will run at http://localhost:5000

### Step 4: Start Frontend (in new terminal)
```bash
cd client
npm start
```
Frontend will run at http://localhost:3000

### Step 5: Create Account & Start Using
1. Click "Register" and create your account
2. Click "Add Video" to save YouTube videos
3. Create "Playlists" to organize videos
4. Add "Books" and track reading progress
5. Create "Notes" while watching/reading

## 📝 Sample Test Data

### Add a YouTube Video
1. Go to Videos section
2. Click "Add Video"
3. Use this sample:
   - YouTube ID: `dQw4w9WgXcQ` (Rick Roll)
   - Title: "Never Gonna Give You Up"
   - Channel: "Rick Astley"

### Add a Book
1. Go to Books section
2. Click "Add Book"
3. Use this sample:
   - Title: "The Great Gatsby"
   - Author: "F. Scott Fitzgerald"
   - File URL: (any PDF URL)

## 🛠️ Common Commands

```bash
# Backend
npm start              # Production mode
npm run dev           # Development mode with auto-reload

# Frontend
cd client && npm start # Start development server
cd client && npm build # Build for production

# Database
# Start MongoDB
mongod               # Local
# Or use MongoDB Atlas connection string
```

## 🐛 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| "Cannot connect to MongoDB" | Check MONGODB_URI in .env and ensure MongoDB is running |
| "Port 5000/3000 in use" | Change PORT in .env or kill process using that port |
| "Module not found" | Run `npm install` in both root and client folder |
| "CORS errors" | Ensure backend runs on 5000 and frontend on 3000 |

## 📚 What Can You Do?

✅ Save YouTube videos and watch them on your platform
✅ Create playlists to organize videos
✅ Add and manage books
✅ Track reading progress
✅ Create time-stamped notes
✅ Organize all your digital content in one place

## 🎯 Next Steps

- Read the full [README.md](README.md) for detailed information
- Explore the API endpoints in the backend
- Customize styling in `client/src/App.css`
- Add more features as needed

---

Enjoy organizing your digital library! 🎉
