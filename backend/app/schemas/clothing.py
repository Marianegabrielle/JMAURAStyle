from pydantic import BaseModel
from uuid import UUID
from typing import Optional
from datetime import datetime
from app.models.clothing import CategoryEnum

class ClothingCreate(BaseModel):
    name: str
    category: CategoryEnum
    color: str

class ClothingUpdate(BaseModel):
    name: Optional[str] = None
    color: Optional[str] = None
    is_active: Optional[bool] = None

class ClothingResponse(BaseModel):
    id: UUID
    user_id: UUID
    name: str
    category: CategoryEnum
    color: str
    photo_url: Optional[str] = None
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True
