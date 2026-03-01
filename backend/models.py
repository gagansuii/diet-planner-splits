from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship

from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    created_at = Column(DateTime, nullable=True)

    history = relationship("DietHistory", back_populates="user")


class DietHistory(Base):
    __tablename__ = "diet_history"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    diet_type = Column(String)
    total_calories = Column(Integer)
    date = Column(DateTime)

    user = relationship("User", back_populates="history")


class Badge(Base):
    __tablename__ = "badges"

    id = Column(Integer, primary_key=True)
    level = Column(String)
    condition = Column(String)


class Achievement(Base):
    __tablename__ = "achievements"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    badge_id = Column(Integer, ForeignKey("badges.id"))
    achieved_at = Column(DateTime)


class FoodNutrition(Base):
    __tablename__ = "food_nutrition"

    id = Column(Integer, primary_key=True)
    food_name = Column(String, unique=True)
    calories = Column(Integer)
    protein = Column(Integer)
    carbs = Column(Integer)
    fats = Column(Integer)
    fiber = Column(Integer)
