from pydantic import BaseModel
from uuid import UUID
from typing import Optional
from datetime import datetime
from app.models.outfit import EventTypeEnum, GeneratedByEnum

class OutfitResponse(BaseModel):
    id: UUID
    user_id: UUID
    top_id: Optional[UUID] = None
    bottom_id: Optional[UUID] = None
    shoes_id: Optional[UUID] = None
    event_type: EventTypeEnum
    generated_by: GeneratedByEnum
    weather_desc: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

class OutfitCreate(BaseModel):
    event_type: EventTypeEnum

class ManualOutfitCreate(BaseModel):
    top_id: Optional[UUID] = None
    bottom_id: Optional[UUID] = None
    shoes_id: Optional[UUID] = None
    event_type: EventTypeEnum
