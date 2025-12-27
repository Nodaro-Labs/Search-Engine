import requests
from bs4 import BeautifulSoup
import time
import json

HEADERS = {
    "User-Agent": "NodaroBot/1.0 (educational indexing)"
}

BASE_URL = "https://github.com/topics/open-source-hardware?o=asc&s=forks"
OUTPUT_FILE = "projects.json"


def fetch_page(page_num: int) -> BeautifulSoup:
    url = f"{BASE_URL}&page={page_num}"
    response = requests.get(url, headers=HEADERS, timeout=15)
    response.raise_for_status()
    return BeautifulSoup(response.text, "html.parser")


def extract_projects(soup: BeautifulSoup) -> list[dict]:
    projects = []

    articles = soup.find_all(
        "article",
        class_="border rounded color-shadow-small color-bg-subtle my-4"
    )

    for article in articles:
        repo_links = article.find_all("a", class_="Link")
        if len(repo_links) < 2:
            continue

        owner = repo_links[0].get_text(strip=True)
        name = repo_links[1].get_text(strip=True)

        desc = article.find("p", class_="color-fg-muted")
        topics = article.find_all("a", class_="topic-tag")

        projects.append({
            "title": f"{owner}/{name}",
            "summary": desc.get_text(strip=True) if desc else "",
            "keywords": [t.get_text(strip=True) for t in topics],
            "difficulty": None,
            "link": "https://github.com" + repo_links[1]["href"],
            "source": "GitHub"
        })

    return projects


def scrape_all_projects(max_pages: int = 50) -> list[dict]:
    all_projects = []

    for page in range(1, max_pages + 1):
        print(f"Scraping page {page}...")
        soup = fetch_page(page)
        page_projects = extract_projects(soup)

        if not page_projects:
            break

        all_projects.extend(page_projects)
        time.sleep(1)

    return all_projects


def save_to_json(data: list[dict], filename: str):
    with open(filename, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


projects = scrape_all_projects()
save_to_json(projects, OUTPUT_FILE)

print(f"\nSaved {len(projects)} projects to {OUTPUT_FILE}")
