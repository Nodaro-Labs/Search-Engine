import { Search } from "lucide-react";
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleHintClick = (hint: string) => {
    setQuery(hint);
    navigate(`/search?q=${encodeURIComponent(hint)}`);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Arcade Cabinet Search Interface */}
      <form onSubmit={handleSearch}>
        <div className="relative">
          {/* Outer Glow Frame */}
          <div
            className={`arcade-border p-1 transition-all duration-300 ${
              isFocused
                ? "neon-glow border-cyan-400"
                : "border-cyan-400/50"
            }`}
          >
            {/* Inner Search Area */}
            <div className="relative flex items-center bg-black/80 backdrop-blur-sm">
              {/* Left Decoration */}
              <div className="absolute left-4 w-2 h-2 bg-cyan-400 animate-pulse"></div>
              
              <Search
                className={`absolute left-12 transition-colors duration-200 ${
                  isFocused ? "text-cyan-400" : "text-cyan-400/50"
                }`}
                size={24}
              />
              
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="ENTER SEARCH QUERY..."
                className="w-full py-5 pl-20 pr-20 text-lg bg-transparent outline-none placeholder:text-cyan-400/40 text-cyan-300 font-mono uppercase tracking-wider"
              />
              
              {/* Right Decoration */}
              <div className="absolute right-4 w-2 h-2 bg-cyan-400 animate-pulse" style={{ animationDelay: "0.5s" }}></div>
              
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-12 text-cyan-400/50 hover:text-cyan-400 transition-colors font-mono text-xl"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-black font-mono font-bold text-lg uppercase tracking-wider arcade-button border-2 border-cyan-400 hover:neon-glow transition-all duration-300 hover:scale-105 relative overflow-hidden group"
            disabled={!query.trim()}
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              <Search size={20} />
              START SEARCH
            </span>
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)] translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          </button>
        </div>
      </form>

      {/* Quick Search Hints */}
      <div className="flex flex-wrap justify-center gap-3 mt-6">
        {["Arduino", "Raspberry Pi", "3D Printing", "Robotics", "IoT"].map(
          (hint) => (
            <button
              key={hint}
              type="button"
              onClick={() => handleHintClick(hint)}
              className="px-4 py-2 text-xs font-mono uppercase tracking-wider bg-cyan-500/10 text-cyan-300 border border-cyan-400/30 hover:bg-cyan-500/20 hover:border-cyan-400 hover:neon-glow transition-all duration-200"
            >
              {hint}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default SearchBar;
