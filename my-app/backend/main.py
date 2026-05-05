from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

# ── CORS ─────────────────────────────────────────────────────────────────────
# Allow your React dev server to call this API
origins = [
    "http://localhost:5173",   # Vite default
    "http://localhost:3000",   # CRA default
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Data Models ──────────────────────────────────────────────────────────────
class User(BaseModel):
    userId: str
    name: str

# ── In-Memory Storage ────────────────────────────────────────────────────────
users_db: dict[str, str] = {}

# ── Routes ────────────────────────────────────────────────────────────────────
@app.get("/")
def root():
    return {"message": "API is running"}

@app.get("/api/users")
def get_users():
    """Get all users"""
    return {
        "users": [
            {"userId": user_id, "name": name}
            for user_id, name in users_db.items()
        ]
    }

@app.post("/api/users")
def create_user(user: User):
    """Create a new user"""
    if user.userId in users_db:
        raise HTTPException(status_code=400, detail="User ID already exists")
    
    users_db[user.userId] = user.name
    return {"message": "User created successfully", "user": user}

@app.get("/api/health")
def health_check():
    return {"status": "ok"}
