from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.sql import func
from app.database import Base


class User(Base):
    __tablename__ = "users"
    id            = Column(Integer, primary_key=True)
    email         = Column(String(255), nullable=False, unique=True)
    password_hash = Column(String(255), nullable=False)


class CleaningLog(Base):
    __tablename__ = "cleaning_logs"
    id         = Column(Integer, primary_key=True)
    table_name = Column(String(255), nullable=False)
    done_at    = Column(DateTime(timezone=True), server_default=func.now())


class AnalysisReport(Base):
    __tablename__ = "analysis_reports"
    id                 = Column(Integer, primary_key=True)
    table_name         = Column(String(255), nullable=False)
    missing_values     = Column(JSONB, nullable=False)
    duplicates         = Column(Integer, nullable=False)
    datatype_anomalies = Column(JSONB, nullable=False)
    done_at            = Column(DateTime(timezone=True), server_default=func.now())
