from fastapi import HTTPException, status, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.database import AsyncSessionLocal
from app.models.user import User
from app.schemas.user import UserCreate
from app.core.security import hash_password, verify_password
from app.core.jwt import create_token, get_current_user
from app.logs import logger
from datetime import timedelta
from app.config import ACCESS_TOKEN_EXPIRE_MINUTES


async def get_db():
    async with AsyncSessionLocal() as session:
        yield session


async def register_user(user: UserCreate, db: AsyncSession):
    stmt = select(User).where(User.email == user.email)
    result = await db.execute(stmt)
    if result.scalar():
        logger.warning(f"Falha ao registrar: email já existe - {user.email}")
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = User(
        username=user.username,
        email=user.email,
        hashed_password=hash_password(user.password),
    )
    db.add(new_user)
    await db.commit()

    logger.info(f"Novo usuário registrado: {user.email}")
    return new_user


async def authenticate_user(email: str, password: str, db: AsyncSession):
    stmt = select(User).where(User.email == email)
    result = await db.execute(stmt)
    user = result.scalar()

    if not user or not verify_password(password, user.hashed_password):
        logger.warning(f"Tentativa de login inválida para: {email}")
        raise HTTPException(status_code=401, detail="Invalid credentials")

    logger.info(f"Usuário autenticado com sucesso: {user.email}")

    access_token = create_token(
        {"sub": str(user.id), "username": user.username},
        timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
        token_type="access"
    )

    refresh_token = create_token(
        {"sub": str(user.id)},
        timedelta(days=7),
        token_type="refresh"
    )

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer"
    }


async def delete_account(current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    stmt = select(User).where(User.id == current_user.id)
    result = await db.execute(stmt)
    user = result.scalar()

    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    await db.delete(user)
    await db.commit()

    logger.info(f"🗑️ Conta excluída: {user.email}")
    return {"message": "Conta excluída com sucesso"}
