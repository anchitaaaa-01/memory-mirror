import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
MONGO_DB = os.getenv("MONGO_DB")

client = MongoClient(MONGO_URI)
db = client[MONGO_DB]

users_collection = db["users"]
memories_collection = db["memories"]

# Ensure unique index on email
users_collection.create_index("email", unique=True)

