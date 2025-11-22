# app/main.py

from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from bson import ObjectId

from app.routes import router   # ⬅ only this router now

# Custom encoder for ObjectId
def custom_jsonable_encoder(obj):
    if isinstance(obj, ObjectId):
        return str(obj)
    return jsonable_encoder(obj)

class CustomJSONResponse(JSONResponse):
    def render(self, content) -> bytes:
        return super().render(custom_jsonable_encoder(content))

# Create FastAPI app instance
app = FastAPI(
    title="Memory Mirror API",
    description="Hackathon backend for Memory Mirror project 🪞",
    version="1.0.0",
    default_response_class=CustomJSONResponse,
)

# Include all API routes (users + memories live in routes.py)
app.include_router(router, tags=["api"])

