# User Registry Application - Complete Setup

## Overview

A simple React frontend with a FastAPI backend that allows users to register themselves. Users have a `userId` (unique identifier) and a `name`. The application displays a list of registered users with an option to add new users through a modal dialog.

## ✅ What's Been Set Up

### Project Structure
```
/Users/norton/Desktop/dev/my-app/
├── backend/
│   ├── main.py              # FastAPI application with user endpoints
│   ├── requirements.txt      # Python dependencies
│   └── .env                 # Environment variables
├── frontend/
│   ├── src/
│   │   ├── App.jsx          # Main React component
│   │   ├── App.css          # Component styling
│   │   ├── main.jsx         # React entry point
│   │   └── index.css        # Global styles
│   ├── package.json         # Node.js dependencies
│   ├── .env                 # Frontend environment (VITE_API_URL)
│   └── node_modules/        # Installed npm packages
├── venv/                    # Python virtual environment
├── agents.md                # Automation guide
└── README.md                # Original guide
```

### Backend (FastAPI)
- **Location:** `/Users/norton/Desktop/dev/my-app/backend/main.py`
- **Port:** 8000
- **Features:**
  - CORS middleware enabled for `http://localhost:5173` and `http://localhost:3000`
  - In-memory user storage (resets on server restart)
  - Data validation using Pydantic models

### Frontend (React + Vite)
- **Location:** `/Users/norton/Desktop/dev/my-app/frontend`
- **Port:** 5173
- **Features:**
  - User list with grid layout
  - "Add User" button that opens a modal
  - Form validation (required fields)
  - Error handling for duplicate user IDs
  - Responsive design

## 🚀 Running the Application

### Option 1: Run Both Servers (Recommended for Development)

**Terminal 1 - Backend:**
```bash
/Users/norton/Desktop/dev/my-app/venv/bin/uvicorn backend.main:app --reload --port 8000 --app-dir /Users/norton/Desktop/dev/my-app
```

**Terminal 2 - Frontend:**
```bash
cd /Users/norton/Desktop/dev/my-app/frontend && npm run dev
```

Then open: **http://localhost:5173**

### Option 2: Use Python Virtual Environment (Alternative)

**Terminal 1:**
```bash
cd /Users/norton/Desktop/dev/my-app
python3 -m venv venv  # Only if venv doesn't exist
source venv/bin/activate
python -m pip install -r backend/requirements.txt
uvicorn backend.main:app --reload --port 8000
```

**Terminal 2:**
```bash
cd /Users/norton/Desktop/dev/my-app/frontend
npm install  # Only if node_modules doesn't exist
npm run dev
```

## 📋 API Endpoints

All endpoints are available at: `http://localhost:8000`

### 1. GET /api/users
**Get all registered users**

```bash
curl http://localhost:8000/api/users
```

**Response:**
```json
{
  "users": [
    {"userId": "john_doe", "name": "John Doe"},
    {"userId": "jane_smith", "name": "Jane Smith"}
  ]
}
```

### 2. POST /api/users
**Register a new user**

```bash
curl -X POST http://localhost:8000/api/users \
  -H "Content-Type: application/json" \
  -d '{"userId": "new_user", "name": "New User Name"}'
```

**Success Response (201):**
```json
{
  "message": "User created successfully",
  "user": {"userId": "new_user", "name": "New User Name"}
}
```

**Error Response - Duplicate ID (400):**
```json
{
  "detail": "User ID already exists"
}
```

### 3. GET /api/health
**Health check**

```bash
curl http://localhost:8000/api/health
```

**Response:**
```json
{"status": "ok"}
```

### 4. GET /
**Welcome message**

```bash
curl http://localhost:8000/
```

**Response:**
```json
{"message": "API is running"}
```

## 🎨 Frontend Features

### User List
- Displays all registered users in a responsive grid
- Shows user name and ID for each user
- Users appear as cards with hover effects
- Shows empty state message when no users exist

### Add User Modal
- Triggered by "Add User" button in header
- Form fields:
  - User ID: Unique identifier (required)
  - Name: User's display name (required)
- Validation:
  - Both fields must be filled
  - User ID must be unique (error shown if duplicate)
- Actions: Submit button to add, Cancel to close, Close (×) button

### Styling
- Modern gradient background (purple/blue)
- Responsive grid layout
- Smooth animations and transitions
- Professional card-based UI
- Mobile-friendly design

## ✅ Testing Checklist

- [x] Backend starts without errors on port 8000
- [x] Frontend starts without errors on port 5173
- [x] API health check endpoint works
- [x] Can fetch empty users list
- [x] Can add a user via API
- [x] Can fetch users list with added user
- [x] Duplicate user ID validation works
- [x] Frontend connects to backend
- [x] CORS configuration allows frontend to call backend

## 📚 Documentation

### agents.md
Complete automation guide including:
- Quick start commands
- API endpoint documentation
- Development tasks
- Troubleshooting
- Deployment notes
- Common commands cheat sheet

### README.md
Original setup guide from project root

## 🔧 Configuration Files

### backend/.env
```env
APP_ENV=development
SECRET_KEY=your-secret-key-here
```

### frontend/.env
```env
VITE_API_URL=http://localhost:8000
```

## 📦 Dependencies

### Backend
- **fastapi**: Web framework
- **uvicorn**: ASGI server
- **python-dotenv**: Environment variable management
- **pydantic**: Data validation

### Frontend
- **react**: UI library
- **react-dom**: React DOM rendering
- **vite**: Build tool and dev server

## 🎯 Next Steps

### To Add More Features:

1. **Add Delete User**
   - Add `@app.delete("/api/users/{user_id}")` endpoint
   - Add delete button to user cards

2. **Add Update User**
   - Add `@app.put("/api/users/{user_id}")` endpoint
   - Add edit modal/form

3. **Add Database**
   - Replace in-memory storage with SQLite/PostgreSQL
   - Use SQLModel or SQLAlchemy ORM

4. **Add Authentication**
   - Implement JWT authentication
   - Add login/register endpoints

5. **Add Deployment**
   - Deploy backend to Railway, Render, or Heroku
   - Deploy frontend to Vercel or Netlify

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| `Port 8000 already in use` | Kill process or use different port: `--port 8001` |
| `CORS error in frontend` | Ensure backend CORS origins include frontend URL |
| `Cannot find venv` | Run `python3 -m venv venv` in my-app directory |
| `npm packages missing` | Run `npm install` in frontend directory |
| `Module not found error` | Ensure virtual environment is activated |
| `Frontend shows blank page` | Check browser console, verify API_URL in .env |
| `Duplicate user showing error` | Refresh page or check backend logs |

## 📞 Quick Commands

```bash
# Activate Python environment
source /Users/norton/Desktop/dev/my-app/venv/bin/activate

# Start backend
/Users/norton/Desktop/dev/my-app/venv/bin/uvicorn backend.main:app --reload --port 8000 --app-dir /Users/norton/Desktop/dev/my-app

# Start frontend
cd /Users/norton/Desktop/dev/my-app/frontend && npm run dev

# Test API
curl http://localhost:8000/api/users

# Build frontend for production
cd /Users/norton/Desktop/dev/my-app/frontend && npm run build

# View API docs
open http://localhost:8000/docs
```

## 📝 Current Status

✅ **All systems operational**

- Backend: Running on http://localhost:8000
- Frontend: Running on http://localhost:5173
- Database: In-memory storage
- Ready for development and testing

---

**Created:** May 5, 2026
**Project Root:** `/Users/norton/Desktop/dev/my-app`
