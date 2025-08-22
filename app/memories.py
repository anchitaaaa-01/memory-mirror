from fastapi import APIRouter
from pydantic import BaseModel
from app.database import db

router = APIRouter()

memories_collection = db["memories"]

class Memory(BaseModel):
    title: str
    description: str
    date: str  # you can later use datetime

@router.post("/memories")
def create_memory(memory: Memory):
    memories_collection.insert_one(memory.dict())
    return {"message": "Memory saved successfully!"}

@router.get("/memories")
def get_memories():
    memories = list(memories_collection.find({}, {"_id": 0}))
    return {"memories": memories}
