import { useState, useEffect } from "react";
import { Zap } from "lucide-react";

interface ArcadeEntryProps {
  onEnter: () => void;
}

const ArcadeEntry = ({ onEnter }: ArcadeEntryProps) => {
  const [loading, setLoading] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoading(false);
          setTimeout(() => setShowButton(true), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
      {/* CRT Scanlines Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="h-full w-full bg-[linear-gradient(transparent_50%,rgba(0,255,0,0.03)_50%)] bg-[length:100%_4px]"></div>
      </div>

      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="h-full w-full bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center">
        {/* NODARO Logo/Title */}
        <div className="mb-12">
          <h1 className="text-7xl md:text-9xl font-bold mb-4 arcade-title">
            NODARO
          </h1>
          <div className="text-2xl md:text-3xl text-cyan-400 font-mono tracking-wider arcade-subtitle">
            ARCADE SEARCH ENGINE
          </div>
        </div>

        {/* Loading Bar */}
        {loading && (
          <div className="w-80 md:w-96 mx-auto">
            <div className="relative h-8 border-4 border-cyan-400 bg-black shadow-[0_0_20px_rgba(0,255,255,0.5)]">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-300 ease-out shadow-[0_0_20px_rgba(0,255,255,0.8)]"
                style={{ width: `${progress}%` }}
              >
                <div className="h-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)] animate-shimmer"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center text-cyan-400 font-mono text-sm font-bold">
                {progress}%
              </div>
            </div>
            <div className="mt-4 text-cyan-400 font-mono text-sm animate-pulse">
              INITIALIZING ARCADE SYSTEM...
            </div>
          </div>
        )}

        {/* Enter Button */}
        {showButton && (
          <button
            onClick={onEnter}
            className="mt-8 px-12 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white font-bold text-2xl uppercase tracking-wider border-4 border-cyan-300 shadow-[0_0_30px_rgba(0,255,255,0.6)] hover:shadow-[0_0_50px_rgba(0,255,255,0.9)] transition-all duration-300 hover:scale-110 arcade-button relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-3">
              <Zap className="w-6 h-6" />
              INSERT COIN
            </span>
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)] translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          </button>
        )}

        {/* Retro Instructions */}
        {showButton && (
          <div className="mt-8 text-cyan-400 font-mono text-sm animate-pulse">
            PRESS TO ENTER ARCADE
          </div>
        )}
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-4 left-4 w-16 h-16 border-4 border-cyan-400 opacity-50"></div>
      <div className="absolute top-4 right-4 w-16 h-16 border-4 border-cyan-400 opacity-50"></div>
      <div className="absolute bottom-4 left-4 w-16 h-16 border-4 border-cyan-400 opacity-50"></div>
      <div className="absolute bottom-4 right-4 w-16 h-16 border-4 border-cyan-400 opacity-50"></div>
    </div>
  );
};

export default ArcadeEntry;
