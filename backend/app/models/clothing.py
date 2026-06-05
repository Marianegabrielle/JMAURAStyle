from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey, Enum
from sqlalchemy import String as UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
import enum
from app.core.database import Base

class CategoryEnum(str, enum.Enum):
    top = "top"
    bottom = "bottom"
    shoes = "shoes"
    accessory = "accessory"

class Clothing(Base):
    __tablename__ = "clothes"

    id = Column(UUID(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(UUID(36), ForeignKey("users.id"), nullable=False)
    name = Column(String, nullable=False)
    category = Column(Enum(CategoryEnum), nullable=False)
    color = Column(String, nullable=False)
    photo_url = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="clothes")
