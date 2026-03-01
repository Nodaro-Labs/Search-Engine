import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, ExternalLink, Tag, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import FloatingShapes from "@/components/FloatingShapes";

interface SearchResult {
  title: string;
  summary: string;
  keywords: string[];
  link: string;
  source: string;
  score: number;
}

interface SearchResponse {
  query: string;
  results: SearchResult[];
  count: number;
}

const API_BASE_URL = "http://localhost:5000";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/search?q=${encodeURIComponent(query)}&limit=20`
        );
        
        if (!response.ok) {
          throw new Error(`Search failed: ${response.statusText}`);
        }

        const data: SearchResponse = await response.json();
        setResults(data.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch results");
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="min-h-screen bg-background relative">
      <FloatingShapes />
      <Header />

      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Back button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        {/* Search header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Search Results
          </h1>
          {query && (
            <p className="text-muted-foreground">
              Found {loading ? "..." : results.length} results for "
              <span className="text-foreground font-medium">{query}</span>"
            </p>
          )}
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span>Searching...</span>
            </div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6">
            <p className="text-destructive">{error}</p>
            <p className="text-sm text-muted-foreground mt-2">
              Make sure the Flask server is running on port 5000
            </p>
          </div>
        )}

        {/* Results */}
        {!loading && !error && results.length > 0 && (
          <div className="space-y-6">
            {results.map((project, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-6 shadow-soft hover:shadow-elevated transition-all duration-300 border border-border"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-foreground mb-2 hover:text-primary transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {project.summary || "No description available"}
                    </p>

                    {project.keywords && project.keywords.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.keywords.slice(0, 8).map((keyword, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs"
                          >
                            <Tag size={12} />
                            {keyword}
                          </span>
                        ))}
                        {project.keywords.length > 8 && (
                          <span className="text-xs text-muted-foreground self-center">
                            +{project.keywords.length - 8} more
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-muted-foreground">
                        Similarity:{" "}
                        <span className="font-medium text-foreground">
                          {(project.score * 100).toFixed(1)}%
                        </span>
                      </span>
                      {project.source && (
                        <span className="text-muted-foreground">
                          Source: {project.source}
                        </span>
                      )}
                    </div>
                  </div>

                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors whitespace-nowrap"
                  >
                    <ExternalLink size={16} />
                    View Project
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No results */}
        {!loading && !error && results.length === 0 && query && (
          <div className="text-center py-12">
            <Search size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              No results found for "{query}". Try a different search term.
            </p>
          </div>
        )}

        {/* No query */}
        {!query && (
          <div className="text-center py-12">
            <Search size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              Enter a search query to find hardware projects.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
