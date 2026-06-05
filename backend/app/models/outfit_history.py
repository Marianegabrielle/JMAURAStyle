from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy import String as UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
from app.core.database import Base

class OutfitHistory(Base):
    __tablename__ = "outfit_history"

    id = Column(UUID(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(UUID(36), ForeignKey("users.id"), nullable=False)
    outfit_id = Column(UUID(36), ForeignKey("outfits.id"), nullable=False)
    worn_at = Column(DateTime(timezone=True), server_default=func.now())
    notes = Column(String, nullable=True)

    user = relationship("User", back_populates="outfit_history")
    outfit = relationship("Outfit", back_populates="history")
