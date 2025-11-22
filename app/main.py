from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from bson import ObjectId

from app.routes import router  # all your users/memories endpoints

# ---------- Custom encoder for ObjectId ----------
def custom_jsonable_encoder(obj):
    if isinstance(obj, ObjectId):
        return str(obj)
    return jsonable_encoder(obj)

class CustomJSONResponse(JSONResponse):
    def render(self, content) -> bytes:
        return super().render(custom_jsonable_encoder(content))

# ---------- Create FastAPI app ----------
app = FastAPI(
    title="Memory Mirror API",
    description="Hackathon backend for Memory Mirror project 🪞",
    version="1.0.0",
    default_response_class=CustomJSONResponse,
)

# ---------- CORS Setup (allow frontend access) ----------
origins = [
    "http://localhost:8080",            # Local frontend
    "https://lucid-mirror.lovable.app"  # Deployed Lovable frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- Include API Routes under /api ----------
app.include_router(router, prefix="/api", tags=["api"])
