from sqlalchemy import Column, Integer, String, Float, DateTime, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

Base = declarative_base()

class Product(Base):
    __tablename__ = "products"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    price = Column(Float, nullable=False)
    link = Column(Text, nullable=False)
    description = Column(Text, nullable=True)
    scraped_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class ProductCreate(BaseModel):
    name: str
    price: float
    link: str
    description: Optional[str] = None

class ProductResponse(BaseModel):
    id: int
    name: str
    price: float
    link: str
    description: Optional[str] = None
    scraped_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True