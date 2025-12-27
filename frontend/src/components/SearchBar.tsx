import { Search } from "lucide-react";
import { useState } from "react";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Rainbow border wrapper */}
      <div
        className={`p-[2px] rounded-2xl transition-all duration-300 ${
          isFocused
            ? "rainbow-border shadow-elevated"
            : "bg-border shadow-soft"
        }`}
      >
        <div className="relative flex items-center bg-card rounded-[14px]">
          <Search
            className={`absolute left-5 transition-colors duration-200 ${
              isFocused ? "text-primary" : "text-muted-foreground"
            }`}
            size={22}
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search hardware projects, components, tutorials..."
            className="w-full py-4 pl-14 pr-5 text-lg bg-transparent rounded-[14px] outline-none placeholder:text-muted-foreground text-foreground"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-5 text-muted-foreground hover:text-foreground transition-colors"
            >
              ✕
            </button>
          )}
        </div>
      </div>
      
      {/* Search hints */}
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {["Arduino", "Raspberry Pi", "3D Printing", "Robotics", "IoT"].map(
          (hint) => (
            <button
              key={hint}
              onClick={() => setQuery(hint)}
              className="px-4 py-1.5 text-sm font-medium bg-accent text-accent-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-200"
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
