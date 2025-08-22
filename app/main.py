from fastapi import FastAPI
from app.routes import router
from app.memories import router as memories_router
from bson import ObjectId
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

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
    default_response_class=CustomJSONResponse
)

# Include routes
app.include_router(router, tags=["users"])
app.include_router(memories_router, tags=["memories"])

