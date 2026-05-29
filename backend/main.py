from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app.models import models  # noqa
from app.routes import auth, analyze, cleaning, tables, clients

Base.metadata.create_all(bind=engine)

app = FastAPI(title="DataCleaner API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(analyze.router)
app.include_router(cleaning.router)
app.include_router(tables.router)
app.include_router(clients.router)
