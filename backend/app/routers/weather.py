from fastapi import APIRouter, Depends
from app.core.deps import get_current_user
from app.models.user import User
from app.services.weather import get_weather

router = APIRouter(prefix="/weather", tags=["Weather"])

@router.get("/")
def get_current_weather(current_user: User = Depends(get_current_user)):
    city = current_user.city or "Yaoundé"
    return get_weather(city)

@router.get("/{city}")
def get_weather_by_city(city: str, current_user: User = Depends(get_current_user)):
    return get_weather(city)
