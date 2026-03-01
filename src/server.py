from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from search import search_projects
import auth

app = FastAPI()

# Enable CORS for local frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:8080", 
        "http://127.0.0.1:8080",
        "https://*.vercel.app",  # Allow all Vercel preview deployments
        "https://nodaro-search.vercel.app",  # Your production domain
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)

@app.get("/api/search")
async def search_api(q: str = Query("")):
    try:
        results = search_projects(q)
        
        # Format the Payload so JSON serialization works smoothly
        formatted_results = []
        for hit in results:
            payload = hit.payload or {}
            score = getattr(hit, 'score', 0.0)
            formatted_results.append({
                "title": payload.get("title", "Unknown Project"),
                "description": payload.get("summary", ""),
                "category": payload.get("category", "Electronics"), # Fallback category
                "likes": payload.get("likes", 0),  
                "color": payload.get("color", "hsl(28 90% 55%)"), # Nodaro primary color fallback
                "score": float(score),
                "link": payload.get("link", "#")
            })
            
        return formatted_results
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
