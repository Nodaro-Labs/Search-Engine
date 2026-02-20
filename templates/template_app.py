from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from qdrant_client import QdrantClient
from sentence_transformers import SentenceTransformer
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)  

COLLECTION_NAME = "projects"
QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")

client = QdrantClient(url=QDRANT_URL, api_key=QDRANT_API_KEY)
model = SentenceTransformer("all-MiniLM-L6-v2")


def search_projects(query: str, limit: int = 5):
    query_vector = model.encode(query).tolist()

    results = client.query_points(
        collection_name=COLLECTION_NAME,
        query=query_vector,
        using="embedding",
        limit=limit,
        with_payload=True
    )

    projects = []
    for hit in results.points:
        payload = hit.payload
        payload["score"] = round(hit.score, 3)
        projects.append(payload)

    return projects


@app.route("/api/search", methods=["GET", "POST"])
def search():
    """REST API endpoint for search"""
    if request.method == "GET":
        query = request.args.get("q", "")
        limit = int(request.args.get("limit", 10))
    else:
        data = request.get_json() or {}
        query = data.get("query", "")
        limit = data.get("limit", 10)

    if not query:
        return jsonify({"error": "Query parameter is required"}), 400

    try:
        projects = search_projects(query, limit=limit)
        return jsonify({
            "query": query,
            "results": projects,
            "count": len(projects)
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/health", methods=["GET"])
def health():
    """Health check endpoint"""
    return jsonify({"status": "ok"})


if __name__ == "__main__":
    app.run(debug=True, port=5000)