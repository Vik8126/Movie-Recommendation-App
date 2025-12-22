from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime

DATABASE_URL = "sqlite:///./movies.db"

engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


class MovieQuery(Base):
    __tablename__ = "movie_queries"

    id = Column(Integer, primary_key=True, index=True)
    user_input = Column(String, nullable=False)
    recommended_movies = Column(String, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)
