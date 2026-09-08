from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.classify import router as classify_router
from app.core.config import get_settings

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    print(
        "\n========================================================\n"
        "  🤖 GreenCycle LK AI Service is SUCCESSFULLY running!\n"
        "  📚 Docs available at: http://localhost:8000/docs\n"
        "========================================================\n",
        flush=True,
    )
    yield


app = FastAPI(title="GreenCycle LK AI Service", version="0.1.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(classify_router, prefix="/api")


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}
