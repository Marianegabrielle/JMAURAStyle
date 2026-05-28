from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID
from datetime import datetime, timedelta
from app.core.database import get_db
from app.core.deps import get_current_user
from app.models.user import User
from app.models.clothing import Clothing
from app.models.outfit import Outfit, EventTypeEnum, GeneratedByEnum
from app.models.outfit_history import OutfitHistory
from app.services.weather import get_weather
from app.services.ai import generate_outfit
from app.schemas.outfit import OutfitResponse, OutfitCreate, ManualOutfitCreate
from pydantic import BaseModel

router = APIRouter(prefix="/outfits", tags=["Outfits"])

class GenerateOutfitRequest(BaseModel):
    event_type: EventTypeEnum

@router.post("/generate", response_model=OutfitResponse)
def generate(
    request: GenerateOutfitRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    city = current_user.city or "Yaoundé"
    weather = get_weather(city)
    
    clothes = db.query(Clothing).filter(
        Clothing.user_id == current_user.id,
        Clothing.is_active == True
    ).all()
    
    if not clothes:
        raise HTTPException(status_code=400, detail="Aucun vêtement dans la garde-robe")
    
    seven_days_ago = datetime.utcnow() - timedelta(days=7)
    recent_outfits = db.query(OutfitHistory).join(Outfit).filter(
        OutfitHistory.user_id == current_user.id,
        Outfit.event_type == request.event_type,
        OutfitHistory.worn_at >= seven_days_ago
    ).all()
    
    excluded = [
        {"top_id": str(h.outfit.top_id), "bottom_id": str(h.outfit.bottom_id)}
        for h in recent_outfits if h.outfit
    ]
    
    clothes_data = [
        {"id": str(c.id), "name": c.name, "category": c.category.value, "color": c.color}
        for c in clothes
    ]
    
    ai_result = generate_outfit(clothes_data, weather, request.event_type.value, excluded)
    
    outfit = Outfit(
        user_id=current_user.id,
        top_id=ai_result.get("top_id"),
        bottom_id=ai_result.get("bottom_id"),
        shoes_id=ai_result.get("shoes_id"),
        event_type=request.event_type,
        generated_by=GeneratedByEnum.ai,
        weather_desc=weather.get("summary")
    )
    db.add(outfit)
    db.commit()
    db.refresh(outfit)
    
    history = OutfitHistory(user_id=current_user.id, outfit_id=outfit.id)
    db.add(history)
    db.commit()
    
    return outfit

@router.get("/history", response_model=List[OutfitResponse])
def get_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    outfits = db.query(Outfit).filter(
        Outfit.user_id == current_user.id
    ).order_by(Outfit.created_at.desc()).all()
    return outfits

@router.post("/manual", response_model=OutfitResponse, status_code=201)
def create_manual_outfit(
    top_id: UUID = None,
    bottom_id: UUID = None,
    shoes_id: UUID = None,
    event_type: EventTypeEnum = EventTypeEnum.casual,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    outfit = Outfit(
        user_id=current_user.id,
        top_id=top_id,
        bottom_id=bottom_id,
        shoes_id=shoes_id,
        event_type=event_type,
        generated_by=GeneratedByEnum.manual
    )
    db.add(outfit)
    db.commit()
    db.refresh(outfit)
    
    history = OutfitHistory(user_id=current_user.id, outfit_id=outfit.id)
    db.add(history)
    db.commit()
    
    return outfit
