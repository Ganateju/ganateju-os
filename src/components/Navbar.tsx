"use client";
import { useState, useEffect } from 'react';
import { Cpu, Terminal, Activity, FileDown } from 'lucide-react';

export default function Navbar() {
  const [time, setTime] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(new Date().toLocaleTimeString());
    
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Function to handle the Resume/CV download
  const handleExecuteCV = () => {
    const link = document.createElement('a');
    // Ensure your PDF is named exactly 'Ganateju_Resume.pdf' in your public folder
    link.href = '/Ganateju_Resume.pdf'; 
    link.download = 'Ganateju_Pothuganti_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md px-6 py-3 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Cpu className="text-cyan-400 w-5 h-5 animate-pulse" />
        <span className="font-mono text-slate-200 font-bold tracking-tighter">
          GANATEJU_OS <span className="text-cyan-400">v1.0</span>
        </span>
      </div>

      <div className="hidden md:flex items-center gap-8 font-mono text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Activity className="w-3 h-3 text-green-500" />
          {/* Status reflects your open-to-all-roles stance */}
          <span>STATUS: <span className="text-green-500 uppercase">ADAPTIVE_ENGAGEMENT</span></span>
        </div>
        <div className="flex items-center gap-2">
          <Terminal className="w-3 h-3 text-cyan-400" />
          <span>LOC: HYD_IN</span>
        </div>
        
        <span className="text-slate-500 min-w-[100px]">
          {mounted ? `[${time}]` : "[INITIALIZING...]"}
        </span>
      </div>

      <button 
        onClick={handleExecuteCV}
        className="flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 px-4 py-1.5 text-xs font-mono hover:bg-cyan-500 hover:text-slate-950 transition-all cursor-pointer group"
      >
        <FileDown size={14} className="group-hover:animate-bounce" />
        EXECUTE_CV
      </button>
    </nav>
  );
}