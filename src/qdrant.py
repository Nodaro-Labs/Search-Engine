import json
import uuid
import os

from dotenv import load_dotenv
from sentence_transformers import SentenceTransformer
from sklearn.feature_extraction.text import TfidfVectorizer

from qdrant_client import QdrantClient
from qdrant_client.models import (
    PointStruct,
    VectorParams,
    SparseVectorParams,
    Distance,
)

load_dotenv()

# --------------------
# Config
# --------------------
COLLECTION_NAME = "projects"

QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")

if not QDRANT_URL or not QDRANT_API_KEY:
    raise ValueError("Missing QDRANT_URL or QDRANT_API_KEY env vars")

# --------------------
# Qdrant client
# --------------------
client = QdrantClient(
    url=QDRANT_URL,
    api_key=QDRANT_API_KEY,
)

# --------------------
# Recreate collection (HYBRID)
# --------------------
client.recreate_collection(
    collection_name=COLLECTION_NAME,
    vectors_config={
        "embedding": VectorParams(
            size=384,                # all-MiniLM-L6-v2
            distance=Distance.COSINE
        )
    },
    sparse_vectors_config={
        "sparse": SparseVectorParams()
    },
)

print("✅ Collection recreated")

# --------------------
# Load data
# --------------------
with open("src/projects.json", "r") as f:
    projects = json.load(f)

# --------------------
# Models
# --------------------
dense_model = SentenceTransformer("all-MiniLM-L6-v2")

texts_for_sparse = [
    f"{p['title']} {' '.join(p.get('keywords', []))} {p.get('difficulty', '')}"
    for p in projects
]

sparse_vectorizer = TfidfVectorizer(stop_words="english")
sparse_matrix = sparse_vectorizer.fit_transform(texts_for_sparse)

# --------------------
# Build points
# --------------------
points = []

for idx, project in enumerate(projects):
    dense_text = (
        f"{project['title']} "
        f"{project.get('summary', '')} "
        f"{' '.join(project.get('keywords', []))}"
    )

    dense_vector = dense_model.encode(dense_text).tolist()

    sparse_row = sparse_matrix[idx]
    sparse_vector = {
        "indices": sparse_row.indices.tolist(),
        "values": sparse_row.data.tolist(),
    }

    points.append(
        PointStruct(
            id=str(uuid.uuid4()),
            vector={
                "embedding": dense_vector,
                "sparse": sparse_vector,
            },
            payload=project,
        )
    )

# --------------------
# Upload
# --------------------
client.upsert(
    collection_name=COLLECTION_NAME,
    points=points,
)

print(f"🚀 Ingested {len(points)} projects into Qdrant Cloud")
