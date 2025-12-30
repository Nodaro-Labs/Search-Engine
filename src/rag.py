import os
from dotenv import load_dotenv
from google import genai
from google.genai import types
from search import search_projects

load_dotenv()

# Configure Gemini
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("Missing GEMINI_API_KEY in .env file")

client = genai.Client(api_key=GEMINI_API_KEY)

def format_search_results(hits) -> str:
    #Convert search results into a structured text format for the LLM.
    results_text = ""
    for idx, hit in enumerate(hits, 1):
        payload = hit.payload
        results_text += f"""
Project {idx}:
Title: {payload.get('title', 'N/A')}
Summary: {payload.get('summary', 'N/A')}
Keywords: {', '.join(payload.get('keywords', []))}
Difficulty: {payload.get('difficulty', 'Not specified')}
Link: {payload.get('link', 'N/A')}
Relevance Score: {hit.score:.4f}
---
"""
    return results_text.strip()

def generate_rag_response(query: str, hits) -> str:
    #Use Gemini to generate a helpful summary of search results.
    
    # Format the search results
    search_context = format_search_results(hits)
    
    # Create the prompt
    prompt = f"""You are a helpful hardware project guide for Nodaro, a platform that helps people discover open-source hardware projects.

User Query: "{query}"

Here are the most relevant hardware projects found:

{search_context}

Please provide a helpful, well-organized response that:
1. Briefly acknowledges what the user is looking for
2. Groups the projects by difficulty level (Beginner, Intermediate, Advanced, or Not Specified)
3. For each project, explain why it's relevant to the query in 1-2 sentences
4. Uses clear formatting with emojis for difficulty levels (🔰 Beginner, ⚙️ Intermediate, 🚀 Advanced)
5. Ends with a practical recommendation on which project to start with
6. Includes the GitHub links for each project

Important guidelines:
- DO NOT invent or hallucinate any projects
- Only mention projects that were provided in the search results
- Be concise but informative
- Focus on educational value and accessibility
- If no projects match well, be honest about it

Format your response to be friendly, clear, and actionable."""

    # Generate response using Gemini
    response = client.models.generate_content(
        model='gemini-2.5-flash',
        contents=prompt
    )
    
    return response.text

def search_with_rag(query: str, limit: int = 5) -> dict:
    #Perform search and return both raw results and RAG-enhanced explanation.
    
    # Get search results
    hits = search_projects(query, limit=limit)
    
    # Generate RAG response
    rag_response = generate_rag_response(query, hits)
    
    return {
        "query": query,
        "raw_results": [
            {
                "title": hit.payload.get('title'),
                "summary": hit.payload.get('summary'),
                "keywords": hit.payload.get('keywords'),
                "difficulty": hit.payload.get('difficulty'),
                "link": hit.payload.get('link'),
                "score": hit.score
            }
            for hit in hits
        ],
        "rag_response": rag_response
    }

if __name__ == "__main__":
    # Example usage
    query = input("Search: ")
    
    print("\n" + "="*60)
    print("🔍 SEARCHING WITH RAG")
    print("="*60 + "\n")
    
    result = search_with_rag(query, limit=5)
    
    print("📊 RAG-Enhanced Response:\n")
    print(result['rag_response'])
    
    print("\n" + "="*60)