import { useState, useEffect } from "react";
import { Cpu } from "lucide-react";
import { getUsername } from "@/lib/auth";

const Header = () => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    setUser(getUsername());
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b-4 border-foreground shadow-[0_4px_0_0_rgba(40,32,16,1)]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary flex items-center justify-center border-2 border-foreground shadow-[2px_2px_0_0_rgba(40,32,16,1)]">
              <Cpu className="text-primary-foreground" size={24} />
            </div>
            <span className="text-xl font-pixel text-foreground tracking-tight">
              Nodaro<span className="text-primary">Search</span>
            </span>
          </div>

          {/* Auth Display */}
          <div className="flex items-center gap-4">
            {user && (
              <span className="hidden sm:inline text-sm font-pixel text-foreground uppercase">
                Hi, {user}!
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
