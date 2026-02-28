import os
from typing import Optional, List, Dict
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel

security = HTTPBearer()

# In-memory "Database"
users_db: Dict[str, dict] = {}

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
    
    # Auto-register the tracker token if it doesn't exist
    if token not in users_db:
        users_db[token] = {
            "password_hash": "",
            "liked_projects": []
        }
        
    user = users_db[token]
    return {"username": token, **user}

@router.get("/api/user/me", response_model=UserProfile)
async def read_users_me(current_user: dict = Depends(get_current_user)):
    return {
        "username": current_user["username"],
        "liked_projects": current_user["liked_projects"]
    }

class LikeRequest(BaseModel):
    project_title: str

@router.post("/api/projects/like")
async def like_project(req: LikeRequest, current_user: dict = Depends(get_current_user)):
    username = current_user["username"]
    liked_projects = users_db[username]["liked_projects"]
    
    # Toggle like
    if req.project_title in liked_projects:
        liked_projects.remove(req.project_title)
        liked = False
    else:
        liked_projects.append(req.project_title)
        liked = True
        
    return {"liked": liked, "liked_projects": liked_projects}
