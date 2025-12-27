const FloatingShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large gradient orb - top right */}
      <div
        className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-30 animate-float"
        style={{
          background:
            "radial-gradient(circle, hsl(25 95% 55% / 0.4) 0%, transparent 70%)",
        }}
      />

      {/* Rainbow line accent */}
      <div
        className="absolute top-1/4 left-0 w-full h-[2px] opacity-20"
        style={{
          background: "var(--gradient-rainbow)",
        }}
      />

      {/* Small floating shapes */}
      <div
        className="absolute top-1/3 left-[10%] w-4 h-4 rounded-full animate-float"
        style={{
          background: "hsl(0 85% 60%)",
          animationDelay: "0s",
        }}
      />
      <div
        className="absolute top-1/2 right-[15%] w-3 h-3 rounded-full animate-float"
        style={{
          background: "hsl(45 95% 55%)",
          animationDelay: "1s",
        }}
      />
      <div
        className="absolute top-2/3 left-[20%] w-2 h-2 rounded-full animate-float"
        style={{
          background: "hsl(140 70% 45%)",
          animationDelay: "2s",
        }}
      />
      <div
        className="absolute top-[40%] right-[25%] w-3 h-3 rounded-full animate-float"
        style={{
          background: "hsl(200 85% 55%)",
          animationDelay: "1.5s",
        }}
      />
      <div
        className="absolute top-[60%] right-[10%] w-2 h-2 rounded-full animate-float"
        style={{
          background: "hsl(280 70% 60%)",
          animationDelay: "0.5s",
        }}
      />

      {/* Grid pattern - bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-64 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
};

export default FloatingShapes;
