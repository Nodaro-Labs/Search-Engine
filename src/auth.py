import os
from typing import Optional, List, Dict
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
import database

security = HTTPBearer()

router = APIRouter()

class UserProfile(BaseModel):
    username: str
    liked_projects: List[str]

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return {"username": token}

@router.get("/api/user/me", response_model=UserProfile)
async def read_users_me(current_user: dict = Depends(get_current_user)):
    username = current_user["username"]
    liked_projects = database.get_user_likes(username)
    return {
        "username": username,
        "liked_projects": liked_projects
    }

class LikeRequest(BaseModel):
    project_title: str

@router.post("/api/projects/like")
async def like_project(req: LikeRequest, current_user: dict = Depends(get_current_user)):
    username = current_user["username"]
    liked, liked_projects, total_likes = database.toggle_like(username, req.project_title)
        
    return {"liked": liked, "liked_projects": liked_projects, "total_likes": total_likes}
