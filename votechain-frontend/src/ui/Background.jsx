function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#050816]">
      {/* Grid base */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_60%)]" />

      {/* Grid lines */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Glow orbs */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-purple-600/30 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[450px] h-[450px] bg-blue-600/30 blur-[120px] rounded-full" />

      {/* Floating nodes */}
      <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
      <div className="absolute top-1/2 left-2/3 w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
      <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />

      {/* Connection lines (simple effect) */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <line x1="20%" y1="30%" x2="60%" y2="50%" stroke="white" />
        <line x1="60%" y1="50%" x2="80%" y2="70%" stroke="white" />
      </svg>
    </div>
  );
}

export default Background;
