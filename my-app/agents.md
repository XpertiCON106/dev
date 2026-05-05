# User Registry Application - Automation Guide

This document outlines automation tasks and quick commands for development and deployment.

## Project Structure

```
my-app/
├── backend/
│   ├── main.py           # FastAPI application
│   ├── requirements.txt   # Python dependencies
│   └── .env              # Environment variables
├── frontend/
│   ├── src/
│   │   ├── App.jsx       # Main React component
│   │   ├── App.css       # Component styles
│   │   └── main.jsx      # Entry point
│   ├── package.json      # Node dependencies
│   └── .env              # Environment variables
└── venv/                 # Python virtual environment
```

## Quick Start Commands

### 1. Backend Setup (First Time)

```bash
cd /Users/norton/Desktop/dev/my-app

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r backend/requirements.txt
```

### 2. Run Backend

```bash
cd /Users/norton/Desktop/dev/my-app
source venv/bin/activate
uvicorn backend.main:app --reload --port 8000
```

**Output:** API will be available at `http://localhost:8000`
**Swagger UI:** `http://localhost:8000/docs`

### 3. Run Frontend

```bash
cd /Users/norton/Desktop/dev/my-app/frontend
npm run dev
```

**Output:** React app will be available at `http://localhost:5173`

### 4. Combined Development (Run Both)

Open two terminal tabs and run:

**Tab 1 - Backend:**
```bash
cd /Users/norton/Desktop/dev/my-app && source venv/bin/activate && uvicorn backend.main:app --reload --port 8000
```

**Tab 2 - Frontend:**
```bash
cd /Users/norton/Desktop/dev/my-app/frontend && npm run dev
```

## API Endpoints

### GET /api/users
Retrieve all registered users.

**Request:**
```bash
curl http://localhost:8000/api/users
```

**Response:**
```json
{
  "users": [
    {"userId": "user1", "name": "John Doe"},
    {"userId": "user2", "name": "Jane Smith"}
  ]
}
```

### POST /api/users
Register a new user.

**Request:**
```bash
curl -X POST http://localhost:8000/api/users \
  -H "Content-Type: application/json" \
  -d '{"userId": "user1", "name": "John Doe"}'
```

**Response (Success):**
```json
{
  "message": "User created successfully",
  "user": {"userId": "user1", "name": "John Doe"}
}
```

**Response (Error - User ID exists):**
```json
{
  "detail": "User ID already exists"
}
```

### GET /api/health
Health check endpoint.

**Request:**
```bash
curl http://localhost:8000/api/health
```

**Response:**
```json
{"status": "ok"}
```

## Frontend Features

### User Registration Form
- **User ID:** Unique identifier for each user
- **Name:** Display name for the user
- **Validation:** Both fields are required
- **Error Handling:** Displays error if User ID already exists

### User List
- Displays all registered users in a grid layout
- Shows user name and ID for each user
- Responsive design that works on mobile and desktop

### Modal Dialog
- Opens when "Add User" button is clicked
- Form with input fields for User ID and Name
- Submit and Cancel buttons
- Close button (×) in the header
- Shows error messages inline

## Development Tasks

### Add a New User Programmatically

```bash
curl -X POST http://localhost:8000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "john_doe_123",
    "name": "John Doe"
  }'
```

### Test the Frontend-Backend Connection

1. Start both backend and frontend (see "Combined Development" above)
2. Navigate to `http://localhost:5173`
3. Click "Add User" button
4. Enter a user ID and name
5. Click "Add User" in the modal
6. Verify the user appears in the list

### Check Backend Logs

Look for these log entries in the backend terminal:

```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete
```

### Troubleshooting

#### CORS Error in Frontend
If you see a CORS error:
- Ensure backend is running on `http://localhost:8000`
- Check that `http://localhost:5173` is in the `origins` list in `backend/main.py`

#### "Address already in use" Error
If port 8000 is in use:
```bash
# Change the port
uvicorn backend.main:app --reload --port 8001
# Then update VITE_API_URL in frontend/.env to http://localhost:8001
```

#### Module Not Found Errors in Backend
Ensure virtual environment is activated:
```bash
source venv/bin/activate
```

#### Blank Page in Frontend
- Check browser console for errors (F12)
- Ensure API_URL is correctly set in `frontend/.env`
- Verify backend is running and accessible

## Deployment Notes

### Backend Deployment (Production)
```bash
# Install gunicorn
pip install gunicorn

# Run with gunicorn (production-grade ASGI server)
gunicorn backend.main:app -w 4 --worker-class uvicorn.workers.UvicornWorker
```

### Frontend Deployment (Production)
```bash
# Build for production
cd frontend && npm run build

# Output will be in frontend/dist/
```

### Environment Variables for Production

**backend/.env:**
```env
APP_ENV=production
SECRET_KEY=your-secure-secret-key-here
```

**frontend/.env:**
```env
VITE_API_URL=https://your-api-domain.com
```

## Installation/Setup Steps for Fresh Install

```bash
# 1. Clone or navigate to project
cd /Users/norton/Desktop/dev/my-app

# 2. Setup backend
python3 -m venv venv
source venv/bin/activate
pip install -r backend/requirements.txt

# 3. Setup frontend
cd frontend
npm install
cd ..

# 4. Start development
# Terminal 1:
source venv/bin/activate && uvicorn backend.main:app --reload --port 8000

# Terminal 2:
cd frontend && npm run dev
```

## Common Commands Cheat Sheet

| Task | Command |
|------|---------|
| Activate backend env | `source venv/bin/activate` |
| Deactivate backend env | `deactivate` |
| Install backend deps | `pip install -r backend/requirements.txt` |
| Install frontend deps | `cd frontend && npm install` |
| Start backend | `uvicorn backend.main:app --reload --port 8000` |
| Start frontend | `cd frontend && npm run dev` |
| Build frontend | `cd frontend && npm run build` |
| Add new Python package | `pip install <package> && pip freeze > backend/requirements.txt` |
| Add new Node package | `cd frontend && npm install <package>` |
| Check API docs | Open `http://localhost:8000/docs` |
| Test API endpoint | `curl http://localhost:8000/api/users` |
