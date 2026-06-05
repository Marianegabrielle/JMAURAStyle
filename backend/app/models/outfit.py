from sqlalchemy import Column, String, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
import enum
from app.core.database import Base

class EventTypeEnum(str, enum.Enum):
    cours = "cours"
    entretien = "entretien"
    soiree = "soiree"
    sport = "sport"
    casual = "casual"

class GeneratedByEnum(str, enum.Enum):
    ai = "ai"
    manual = "manual"

class Outfit(Base):
    __tablename__ = "outfits"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    top_id = Column(String(36), ForeignKey("clothes.id"), nullable=True)
    bottom_id = Column(String(36), ForeignKey("clothes.id"), nullable=True)
    shoes_id = Column(String(36), ForeignKey("clothes.id"), nullable=True)
    event_type = Column(Enum(EventTypeEnum), nullable=False)
    generated_by = Column(Enum(GeneratedByEnum), default=GeneratedByEnum.ai)
    weather_desc = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="outfits")
    history = relationship("OutfitHistory", back_populates="outfit")