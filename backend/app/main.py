from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import engine, Base
from app.routers import auth

app = FastAPI(
    title="JmauraStyle API",
    description="API for JmauraStyle - Your AI Personal Stylist",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    Base.metadata.create_all(bind=engine)

app.include_router(auth.router)

@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "JmauraStyle API"}
