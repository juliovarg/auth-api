from fastapi import APIRouter, Depends
from app.schemas.user import UserCreate, UserOut, Token
from app.services.auth_service import register_user, authenticate_user, get_db
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.user import User
from app.core.jwt import get_current_user
from app.services.auth_service import delete_account
from fastapi import Request
from jose import jwt, JWTError
from datetime import timedelta
from app.config import ACCESS_TOKEN_EXPIRE_MINUTES
from app.core.jwt import create_token, JWT_SECRET, JWT_ALGORITHM
from fastapi import HTTPException, Request

router = APIRouter()

@router.post("/register", response_model=UserOut)
async def register(user: UserCreate, db: AsyncSession = Depends(get_db)):
    return await register_user(user, db)

@router.post("/login", response_model=Token)
async def login(form_data: UserCreate, db: AsyncSession = Depends(get_db)):
    return await authenticate_user(form_data.email, form_data.password, db)

@router.delete("/delete-account")
async def delete(current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    return await delete_account(current_user, db)

@router.post("/refresh")
async def refresh_token(request: Request):
    body = await request.json()
    refresh_token = body.get("refresh_token")

    if not refresh_token:
        raise HTTPException(status_code=400, detail="Refresh token ausente")

    try:
        payload = jwt.decode(refresh_token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "refresh":
            raise HTTPException(status_code=401, detail="Tipo de token inválido")

        new_access_token = create_token(
            {"sub": payload["sub"]},
            expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
            token_type="access"
        )

        return {"access_token": new_access_token, "token_type": "bearer"}

    except JWTError:
        raise HTTPException(status_code=401, detail="Refresh token inválido ou expirado")

