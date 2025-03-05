from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os
from dotenv import load_dotenv


load_dotenv()


DATABASE_URL = os.getenv("DATABASE_URL", "mysql+pymysql://root:aryany19@localhost/codewhiz_db")

try:
    
    engine = create_engine(DATABASE_URL, echo=True)  # Set echo=False in production
    print("Database connection established successfully!")
except Exception as e:
    print(f"Error connecting to the database: {e}")

SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
