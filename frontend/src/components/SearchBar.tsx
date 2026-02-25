import { Search } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Retro thick border wrapper */}
      <div
        className={`p-2 bg-foreground transition-all duration-300 ${isFocused
          ? "shadow-elevated -translate-y-1"
          : "shadow-soft"
          }`}
      >
        <form
          className="relative flex items-center bg-background border-4 border-foreground w-full"
          onSubmit={handleSubmit}
        >
          <Search
            className={`absolute left-5 transition-colors duration-200 ${isFocused ? "text-primary" : "text-muted-foreground"
              }`}
            size={24}
            strokeWidth={3}
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search hardware components..."
            className="w-full py-5 pl-16 pr-6 text-xl bg-transparent outline-none placeholder:text-muted-foreground font-bold text-foreground
            focus:ring-0"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                onSearch(""); // Reset search
              }}
              className="absolute right-5 text-foreground hover:text-primary transition-colors bg-secondary p-1 border-2 border-foreground"
            >
              ✕
            </button>
          )}
        </form>
      </div>

      {/* Search hints */}
      <div className="flex flex-wrap justify-center gap-3 mt-6">
        {["Arduino", "Raspberry Pi", "3D Printing", "Robotics", "IoT"].map(
          (hint) => (
            <button
              key={hint}
              type="button"
              onClick={() => {
                setQuery(hint);
                onSearch(hint);
              }}
              className="px-4 py-2 text-xs font-pixel uppercase bg-card text-foreground border-2 border-foreground shadow-[2px_2px_0_0_rgba(40,32,16,1)] hover:bg-primary hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_rgba(40,32,16,1)] transition-all duration-200"
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
