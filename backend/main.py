from fastapi import FastAPI
from routes.authRoutes import router as auth_router

app = FastAPI()

app.include_router(auth_router, prefix="/auth", tags=["Auth"])

@app.get("/")
def root():
    return {"message": "Welcome to CodeWhiz API"}
