import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Zap, Gamepad2, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden crt-scanlines">
      {/* Animated Grid Background */}
      <div className="fixed inset-0 arcade-grid opacity-30 pointer-events-none"></div>

      {/* Neon Corner Decorations */}
      <div className="fixed top-0 left-0 w-32 h-32 border-l-4 border-t-4 border-cyan-400 opacity-50"></div>
      <div className="fixed top-0 right-0 w-32 h-32 border-r-4 border-t-4 border-cyan-400 opacity-50"></div>
      <div className="fixed bottom-0 left-0 w-32 h-32 border-l-4 border-b-4 border-cyan-400 opacity-50"></div>
      <div className="fixed bottom-0 right-0 w-32 h-32 border-r-4 border-b-4 border-cyan-400 opacity-50"></div>

      <Header />

      {/* Main Arcade Cabinet */}
      <div className="container mx-auto px-4 pt-32 pb-16 relative z-10">
        {/* Arcade Cabinet Frame */}
        <div className="max-w-5xl mx-auto">
          {/* Top Marquee */}
          <div className="arcade-border bg-black/90 p-6 mb-8 text-center">
            <h1 className="arcade-title text-4xl md:text-6xl mb-2 animate-glow">
              NODARO
            </h1>
            <p className="arcade-subtitle text-cyan-400 text-sm md:text-lg">
              HARDWARE PROJECT ARCADE
            </p>
          </div>

          {/* Main Screen Area */}
          <div className="arcade-border bg-gradient-to-b from-black via-[#0a0a0a] to-black p-8 md:p-12 relative">
            {/* Screen Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-purple-500/10 pointer-events-none"></div>

            {/* Content */}
            <div className="relative z-10">
              {/* Welcome Message */}
              <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <Sparkles className="w-8 h-8 text-cyan-400 animate-pulse" />
                  <h2 className="arcade-subtitle text-2xl md:text-4xl text-cyan-300">
                    WELCOME TO THE ARCADE
                  </h2>
                  <Sparkles className="w-8 h-8 text-cyan-400 animate-pulse" />
                </div>
                <p className="text-cyan-200/80 font-mono text-sm md:text-base max-w-2xl mx-auto">
                  INSERT YOUR SEARCH QUERY TO BEGIN YOUR QUEST FOR OPEN-SOURCE HARDWARE PROJECTS
                </p>
              </div>

              {/* Arcade Search Interface */}
              <div className="mb-12">
                <SearchBar />
              </div>

              {/* Quick Play Buttons */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
                {["Arduino", "Raspberry Pi", "3D Printing", "Robotics", "IoT"].map((category) => (
                  <button
                    key={category}
                    onClick={() => navigate(`/search?q=${encodeURIComponent(category)}`)}
                    className="arcade-button px-4 py-6 bg-gradient-to-b from-cyan-500/20 to-purple-500/20 border-2 border-cyan-400 text-cyan-300 font-mono text-xs md:text-sm uppercase tracking-wider hover:neon-glow transition-all duration-300 hover:scale-105 relative overflow-hidden group"
                  >
                    <span className="relative z-10">{category}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/30 to-cyan-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  </button>
                ))}
              </div>

              {/* Stats Display */}
              <div className="grid grid-cols-3 gap-4 md:gap-8 mb-12">
                {[
                  { label: "PROJECTS", value: "12K+", icon: Gamepad2 },
                  { label: "MAKERS", value: "45K+", icon: Zap },
                  { label: "SEARCHES", value: "500+", icon: Search },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="arcade-border bg-black/50 p-6 text-center group hover:neon-glow transition-all duration-300"
                  >
                    <stat.icon className="w-8 h-8 mx-auto mb-3 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                    <div className="arcade-subtitle text-2xl md:text-3xl text-cyan-400 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-cyan-500/70 font-mono text-xs uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Instructions */}
              <div className="text-center">
                <div className="inline-block arcade-border bg-black/70 p-6">
                  <p className="text-cyan-300/80 font-mono text-xs md:text-sm">
                    <span className="text-cyan-400">[SPACE]</span> TO SEARCH | 
                    <span className="text-cyan-400"> [ENTER]</span> TO START | 
                    <span className="text-cyan-400"> [ESC]</span> TO EXIT
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Control Panel */}
          <div className="arcade-border bg-black/90 p-6 mt-8">
            <div className="flex items-center justify-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                <span className="text-cyan-400 font-mono text-xs">LIVE</span>
              </div>
              <div className="text-cyan-500/50 font-mono text-xs">
                © 2024 NODARO ARCADE
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-cyan-400 font-mono text-xs">ONLINE</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Particles Effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
              opacity: 0.3,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Index;
