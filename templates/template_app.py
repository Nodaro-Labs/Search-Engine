from flask import Flask, render_template, request
import os
from qdrant_client import QdrantClient
from sentence_transformers import SentenceTransformer
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

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


@app.route("/", methods=["GET", "POST"])
def home():
    projects = []
    query = ""

    if request.method == "POST":
        query = request.form.get("query")
        if query:
            projects = search_projects(query)

    return render_template("results.html", projects=projects, query=query)


if __name__ == "__main__":
    app.run(debug=True)