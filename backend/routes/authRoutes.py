from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from config.db import get_db
from models.User import User
from passlib.context import CryptContext
from pydantic import BaseModel, EmailStr
from fastapi.responses import JSONResponse
from routes.email_utils import send_email
import secrets

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Pydantic Models
class ForgotPasswordRequest(BaseModel):
    email: EmailStr

class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str

class UserSignup(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str



@router.post("/forgot-password")
def forgot_password(request: ForgotPasswordRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == request.email).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Generate a reset token
    reset_token = secrets.token_urlsafe(32)
    user.reset_token = reset_token
    db.commit()

    # Create reset link
    reset_link = f"http://localhost:3000/reset-password?token={reset_token}"

    # Send email
    subject = "Reset Your Password"
    body = f"Click the link below to reset your password:\n{reset_link}"
    email_response = send_email(request.email, subject, body)

    return JSONResponse(
        content={"message": "Password reset link sent if the email is registered", "email_response": email_response}
    )



@router.post("/reset-password")
def reset_password(request: ResetPasswordRequest, db: Session = Depends(get_db)):
    print(f"Received reset token: {request.token}")  # Debugging

    user = db.query(User).filter(User.reset_token == request.token).first()

    print(f"User found: {user}")  # Debugging

    if not user:
        raise HTTPException(status_code=400, detail="Invalid or expired token")

    # Update user's password
    user.password = pwd_context.hash(request.new_password)
    user.reset_token = None  # Clear reset token after use
    db.commit()

    print("Password reset successfully!")  # Debugging

    return {"message": "Password has been successfully reset"}


# ✅ Register Endpoint
@router.post("/register")
def register(user: UserSignup, db: Session = Depends(get_db)):
    hashed_password = pwd_context.hash(user.password)
    db_user = User(username=user.username, email=user.email, password=hashed_password)

    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    return {"message": "User registered successfully"}


# ✅ Login Endpoint
@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()

    if not db_user or not pwd_context.verify(user.password, db_user.password):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    return JSONResponse(content={
        "message": "Login successful",
        "user": {
            "id": db_user.id,
            "username": db_user.username,
            "email": db_user.email
        }
    })
