import { Gamepad2, Menu } from "lucide-react";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b-2 border-cyan-400/50 shadow-[0_0_20px_rgba(0,255,255,0.3)]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 arcade-border bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center neon-glow">
              <Gamepad2 className="text-black" size={20} />
            </div>
            <span className="arcade-subtitle text-xl text-cyan-400">
              NODARO
            </span>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-6">
            {["EXPLORE", "CATEGORIES", "SUBMIT", "ABOUT"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-cyan-300/80 font-mono text-sm uppercase tracking-wider hover:text-cyan-400 transition-colors relative group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              className="hidden md:inline-flex font-mono text-xs uppercase tracking-wider text-cyan-300 hover:text-cyan-400 hover:bg-cyan-500/10 border border-cyan-400/30"
            >
              SIGN IN
            </Button>
            <Button 
              className="hidden md:inline-flex font-mono text-xs uppercase tracking-wider bg-gradient-to-r from-cyan-500 to-purple-500 text-black hover:neon-glow border-2 border-cyan-400"
            >
              START
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden text-cyan-400 hover:bg-cyan-500/10"
            >
              <Menu size={20} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
