from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer
from fastapi.openapi.utils import get_openapi

from app.routes import auth
from app.database import create_db
from app.logs import logger

logger.info("API iniciada")

app = FastAPI(
    title="Auth API",
    docs_url="/docs",         
    openapi_url="/openapi.json" 
)

# ✅ CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth.router, prefix="/auth")

@app.on_event("startup")
async def startup():
    await create_db()


@app.get("/openapi.json", include_in_schema=False)
async def custom_openapi():
    return get_openapi(
        title=app.title,
        version="1.0.0",
        routes=app.routes,
        security=[{"HTTPBearer": []}],
        components={
            "securitySchemes": {
                "HTTPBearer": {
                    "type": "http",
                    "scheme": "bearer"
                }
            }
        },
    )

from fastapi.openapi.utils import get_openapi

def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title="Auth API",
        version="1.0.0",
        description="API de autenticação",
        routes=app.routes,
    )
    openapi_schema["components"]["securitySchemes"] = {
        "HTTPBearer": {
            "type": "http",
            "scheme": "bearer"
        }
    }
    openapi_schema["security"] = [{"HTTPBearer": []}]
    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.openapi = custom_openapi