import os
from qdrant_client import QdrantClient
from sentence_transformers import SentenceTransformer
from dotenv import load_dotenv

load_dotenv()

COLLECTION_NAME = "projects"
QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")

if not QDRANT_URL or not QDRANT_API_KEY:
    raise ValueError("Missing QDRANT_URL or QDRANT_API_KEY")

# Qdrant client
client = QdrantClient(
    url=QDRANT_URL,
    api_key=QDRANT_API_KEY,
)

# Embedding model (must match ingestion!)
model = SentenceTransformer("all-MiniLM-L6-v2")

def search_projects(query: str, limit: int = 5):
    query_vector = model.encode(query).tolist()
    
    results = client.query_points(
        collection_name=COLLECTION_NAME,
        query=query_vector,
        using="embedding",   # name of dense vector
        limit=limit,
        with_payload=True
    )
    
    return results.points  # Return the points list

if __name__ == "__main__":
    query = input("Search: ")
    hits = search_projects(query)
    
    print("\nResults:\n")
    for hit in hits:
        payload = hit.payload
        print(f"- {payload.get('title')}")
        print(f"  Score: {hit.score:.4f}")
        print(f"  Keywords: {payload.get('keywords')}")
        print(f"  Summary: {payload.get('summary')}")
        print(f"  Difficulty: {payload.get('difficulty')}")
        print(f"  Link: {payload.get('link')}")
        print()