'''import os
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
users_collection.create_index("email", unique=True)'''
# app/database.py

import os
from dotenv import load_dotenv
from pymongo import MongoClient

# Load env vars from .env
load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
MONGO_DB = os.getenv("MONGO_DB", "memory_mirror")

client = None
db = None

try:
    if not MONGO_URI:
        print("WARNING: MONGO_URI is not set. MongoDB will not be connected.")
    else:
        client = MongoClient(MONGO_URI)
        db = client[MONGO_DB]
        print("✅ Connected to MongoDB:", MONGO_DB)
except Exception as e:
    print("⚠️ Error connecting to MongoDB:", e)

# ----- collections -----
if db is not None:
    users_collection = db["users"]
    memories_collection = db["memories"]

    # Unique index on email
    try:
        users_collection.create_index("email", unique=True)
    except Exception as e:
        print("⚠️ Error creating index on users.email:", e)
else:
    # MAKE SURE these names always exist so imports never fail
    users_collection = None
    memories_collection = None


