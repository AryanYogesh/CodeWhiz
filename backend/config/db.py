from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get DATABASE_URL from .env or use default (change credentials accordingly)
DATABASE_URL = os.getenv("DATABASE_URL", "mysql+pymysql://root:aryany19@localhost/codewhiz")

try:
    # Create Engine
    engine = create_engine(DATABASE_URL, echo=True)  # Set echo=False in production
    print("Database connection established successfully!")
except Exception as e:
    print(f"Error connecting to the database: {e}")

# Create a new session
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)

# Define the Base class
Base = declarative_base()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
