from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List, Optional
from uuid import UUID
from app.core.database import get_db
from app.core.deps import get_current_user
from app.models.user import User
from app.models.clothing import Clothing, CategoryEnum
from app.schemas.clothing import ClothingCreate, ClothingUpdate, ClothingResponse

router = APIRouter(prefix="/clothes", tags=["Wardrobe"])

@router.post("/", response_model=ClothingResponse, status_code=201)
def add_clothing(
    name: str = Form(...),
    category: CategoryEnum = Form(...),
    color: str = Form(...),
    photo: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    photo_url = None
    if photo:
        import os
        upload_dir = "/app/uploads"
        os.makedirs(upload_dir, exist_ok=True)
        file_path = f"{upload_dir}/{current_user.id}_{photo.filename}"
        with open(file_path, "wb") as f:
            f.write(photo.file.read())
        photo_url = f"/uploads/{current_user.id}_{photo.filename}"

    clothing = Clothing(
        user_id=current_user.id,
        name=name,
        category=category,
        color=color,
        photo_url=photo_url
    )
    db.add(clothing)
    db.commit()
    db.refresh(clothing)
    return clothing

@router.get("/", response_model=List[ClothingResponse])
def get_clothes(
    active_only: bool = True,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = db.query(Clothing).filter(Clothing.user_id == current_user.id)
    if active_only:
        query = query.filter(Clothing.is_active == True)
    return query.all()

@router.patch("/{clothing_id}", response_model=ClothingResponse)
def update_clothing(
    clothing_id: UUID,
    data: ClothingUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    clothing = db.query(Clothing).filter(
        Clothing.id == clothing_id,
        Clothing.user_id == current_user.id
    ).first()
    if not clothing:
        raise HTTPException(status_code=404, detail="Clothing not found")
    
    for field, value in data.model_dump(exclude_none=True).items():
        setattr(clothing, field, value)
    
    db.commit()
    db.refresh(clothing)
    return clothing

@router.delete("/{clothing_id}", status_code=204)
def delete_clothing(
    clothing_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    clothing = db.query(Clothing).filter(
        Clothing.id == clothing_id,
        Clothing.user_id == current_user.id
    ).first()
    if not clothing:
        raise HTTPException(status_code=404, detail="Clothing not found")
    
    db.delete(clothing)
    db.commit()
