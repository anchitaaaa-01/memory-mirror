# app/routes.py

from fastapi import APIRouter, HTTPException, Body
from pydantic import BaseModel, EmailStr
from typing import Optional, List
from bson import ObjectId

from app.database import users_collection, memories_collection

router = APIRouter()

# ---------- Schemas ----------

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    relation: Optional[str] = None  # e.g., "son", "daughter", "doctor"

class UserResponse(BaseModel):
    id: str
    name: str
    email: EmailStr
    relation: Optional[str] = None

class MemoryCreate(BaseModel):
    user_id: str   # reference to user
    text: str      # memory text
    mood: Optional[str] = None  # e.g., "happy", "sad"
    image_url: Optional[str] = None

class MemoryResponse(BaseModel):
    id: str
    user_id: str
    text: str
    mood: Optional[str] = None
    image_url: Optional[str] = None


# ---------- Health & Root ----------

@router.get("/health")
def health_check():
    return {"ok": True}

@router.get("/")
def root():
    return {"message": "Hello, Memory Mirror is running 🚀"}


# ---------- Users ----------

@router.post("/users", response_model=UserResponse, status_code=201)
def create_user(user: UserCreate):
    if users_collection is None:
        raise HTTPException(status_code=500, detail="Database not connected")

    if users_collection.find_one({"email": user.email}):
        raise HTTPException(status_code=409, detail="Email already exists")

    doc = user.dict()
    result = users_collection.insert_one(doc)
    return {"id": str(result.inserted_id), **doc}


@router.get("/users", response_model=List[UserResponse])
def get_users():
    if users_collection is None:
        raise HTTPException(status_code=500, detail="Database not connected")

    users = []
    for u in users_collection.find({}):
        users.append({
            "id": str(u["_id"]),
            "name": u["name"],
            "email": u["email"],
            "relation": u.get("relation")
        })
    return users


@router.get("/users/{user_id}", response_model=UserResponse)
def get_user(user_id: str):
    if users_collection is None:
        raise HTTPException(status_code=500, detail="Database not connected")

    user = users_collection.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {
        "id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        "relation": user.get("relation")
    }


# ---------- Memories ----------

@router.post("/memories", response_model=MemoryResponse, status_code=201)
def create_memory(memory: MemoryCreate):
    if memories_collection is None or users_collection is None:
        raise HTTPException(status_code=500, detail="Database not connected")

    # check if user exists
    if not users_collection.find_one({"_id": ObjectId(memory.user_id)}):
        raise HTTPException(status_code=404, detail="User not found")

    doc = memory.dict()
    result = memories_collection.insert_one(doc)
    return {"id": str(result.inserted_id), **doc}


@router.get("/memories", response_model=List[MemoryResponse])
def get_memories():
    if memories_collection is None:
        raise HTTPException(status_code=500, detail="Database not connected")

    memories = []
    for m in memories_collection.find({}):
        memories.append({
            "id": str(m["_id"]),
            "user_id": m["user_id"],
            "text": m["text"],
            "mood": m.get("mood"),
            "image_url": m.get("image_url")
        })
    return memories


@router.get("/memories/{memory_id}", response_model=MemoryResponse)
def get_memory(memory_id: str):
    if memories_collection is None:
        raise HTTPException(status_code=500, detail="Database not connected")

    memory = memories_collection.find_one({"_id": ObjectId(memory_id)})
    if not memory:
        raise HTTPException(status_code=404, detail="Memory not found")
    return {
        "id": str(memory["_id"]),
        "user_id": memory["user_id"],
        "text": memory["text"],
        "mood": memory.get("mood"),
        "image_url": memory.get("image_url")
    }


@router.get("/users/{user_id}/memories", response_model=List[MemoryResponse])
def get_user_memories(user_id: str):
    if users_collection is None or memories_collection is None:
        raise HTTPException(status_code=500, detail="Database not connected")

    if not users_collection.find_one({"_id": ObjectId(user_id)}):
        raise HTTPException(status_code=404, detail="User not found")

    memories = []
    for m in memories_collection.find({"user_id": user_id}):
        memories.append({
            "id": str(m["_id"]),
            "user_id": m["user_id"],
            "text": m["text"],
            "mood": m.get("mood"),
            "image_url": m.get("image_url")
        })
    return memories

