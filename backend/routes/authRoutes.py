from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from config.db import get_db
from models.User import User
from passlib.context import CryptContext
from pydantic import BaseModel
from fastapi.responses import JSONResponse
from routes.email_utils import send_email
import secrets


router = APIRouter()

class ForgotPasswordRequest(BaseModel):
    email:str

@router.post("/forgot-password")
def forgot_password(request: ForgotPasswordRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == request.email).first()

    if not User:
        raise HTTPException(status_code=404, detail="user not found")
    
    reset_token = secrets.token_urlsafe(32)

    reset_link = f"http://localhost:3000/reset-password?token={reset_token}"
    subject = "Reset Your Password"
    body = f"Click the link below to reset your password:\n{reset_link}"

    email_response = send_email(request.email,subject, body)

    return {"message": "Password reset link sent if the email is registers", "email_response": email_response}


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class UserSignup(BaseModel):
    username: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

@router.post("/register")
def register(user: UserSignup, db: Session = Depends(get_db)):
    hashed_password = pwd_context.hash(user.password)
    db_user = User(username=user.username, email=user.email, password=hashed_password)
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return {"message": "User registered successfully"}

@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    
    if not db_user or not pwd_context.verify(user.password, db_user.password):
        raise HTTPException(status_code=400, detail="Invalid email or password")
    
    return JSONResponse(content={"message": "Login successful", "user": {
        "id": db_user.id,
        "username": db_user.username,
        "email": db_user.email
    }})