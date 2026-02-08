import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, ExternalLink, Tag, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";

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
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden crt-scanlines">
      {/* Animated Grid Background */}
      <div className="fixed inset-0 arcade-grid opacity-30 pointer-events-none"></div>

      <Header />

      <div className="container mx-auto px-4 py-8 md:py-12 pt-32">
        {/* Back button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-6 font-mono uppercase tracking-wider text-sm"
        >
          <ArrowLeft size={18} />
          BACK TO ARCADE
        </Link>

        {/* Search header */}
        <div className="arcade-border bg-black/80 p-6 mb-8">
          <h1 className="arcade-title text-3xl md:text-4xl mb-2">
            SEARCH RESULTS
          </h1>
          {query && (
            <p className="text-cyan-300/80 font-mono text-sm">
              FOUND {loading ? "..." : results.length} RESULTS FOR "
              <span className="text-cyan-400 font-bold">{query.toUpperCase()}</span>"
            </p>
          )}
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-3 text-cyan-400">
              <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
              <span className="font-mono uppercase tracking-wider">SEARCHING...</span>
            </div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="arcade-border bg-red-500/10 border-red-500/50 p-6 mb-6">
            <p className="text-red-400 font-mono">{error}</p>
            <p className="text-sm text-red-400/70 mt-2 font-mono">
              MAKE SURE THE FLASK SERVER IS RUNNING ON PORT 5000
            </p>
          </div>
        )}

        {/* Results */}
        {!loading && !error && results.length > 0 && (
          <div className="space-y-6">
            {results.map((project, index) => (
              <div
                key={index}
                className="arcade-border bg-black/60 p-6 hover:neon-glow transition-all duration-300 border-cyan-400/50"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="arcade-subtitle text-xl text-cyan-300 mb-2 hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-cyan-200/70 mb-4 line-clamp-2 font-mono text-sm">
                      {project.summary || "NO DESCRIPTION AVAILABLE"}
                    </p>

                    {project.keywords && project.keywords.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.keywords.slice(0, 8).map((keyword, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 rounded font-mono text-xs uppercase"
                          >
                            <Tag size={12} />
                            {keyword}
                          </span>
                        ))}
                        {project.keywords.length > 8 && (
                          <span className="text-xs text-cyan-400/50 self-center font-mono">
                            +{project.keywords.length - 8} MORE
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex items-center gap-4 text-sm font-mono">
                      <span className="text-cyan-400/70">
                        SIMILARITY:{" "}
                        <span className="text-cyan-400 font-bold">
                          {(project.score * 100).toFixed(1)}%
                        </span>
                      </span>
                      {project.source && (
                        <span className="text-cyan-400/70">
                          SOURCE: {project.source}
                        </span>
                      )}
                    </div>
                  </div>

                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-black font-mono font-bold text-sm uppercase tracking-wider hover:neon-glow transition-all whitespace-nowrap arcade-button"
                  >
                    <ExternalLink size={16} />
                    VIEW
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No results */}
        {!loading && !error && results.length === 0 && query && (
          <div className="text-center py-12 arcade-border bg-black/60 p-8">
            <Search size={48} className="mx-auto text-cyan-400 mb-4" />
            <p className="text-cyan-300/80 font-mono">
              NO RESULTS FOUND FOR "{query.toUpperCase()}". TRY A DIFFERENT SEARCH TERM.
            </p>
          </div>
        )}

        {/* No query */}
        {!query && (
          <div className="text-center py-12 arcade-border bg-black/60 p-8">
            <Search size={48} className="mx-auto text-cyan-400 mb-4" />
            <p className="text-cyan-300/80 font-mono">
              ENTER A SEARCH QUERY TO FIND HARDWARE PROJECTS.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
