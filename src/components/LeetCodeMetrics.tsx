"use client";
import { Activity, Zap, Shield } from 'lucide-react';

export default function LeetCodeMetrics() {
  // Verified Solve Counts
  const stats = [
    { label: "ALGO_EASY", value: 84, color: "text-green-500", bar: "bg-green-500" },
    { label: "ALGO_MEDIUM", value: 142, color: "text-cyan-400", bar: "bg-cyan-400" },
    { label: "ALGO_HARD", value: 21, color: "text-violet-500", bar: "bg-violet-500" },
  ];

  return (
    <div className="p-8 border border-slate-800 bg-slate-900/20 rounded-sm shadow-2xl relative overflow-hidden">
      {/* Animated Scanline Effect */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-cyan-500/20 animate-scan" />
      
      <div className="flex justify-between items-center mb-10">
        <h3 className="text-xs font-mono text-slate-500 uppercase tracking-widest flex items-center gap-2">
          <Activity size={14} className="text-cyan-400" />
          [ALGORITHMIC_PERFORMANCE_MONITOR]
        </h3>
        <span className="text-[10px] font-mono text-green-500 animate-pulse">● LIVE_SYSTEM</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {stats.map((stat) => (
          <div key={stat.label} className="group">
            <div className="flex justify-between items-end mb-2">
              <span className="text-[10px] text-slate-500 font-mono">{stat.label}</span>
              <span className={`text-3xl font-bold ${stat.color} tracking-tighter`}>{stat.value}</span>
            </div>
            <div className="w-full h-[2px] bg-slate-800">
              <div className={`h-full ${stat.bar} shadow-[0_0_8px] shadow-current`} style={{ width: `${(stat.value / 250) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-6 border-t border-slate-800/50 pt-8">
        <div className="flex items-center gap-3">
          <Zap size={14} className="text-cyan-400" />
          <div className="font-mono">
            <p className="text-[9px] text-slate-600 uppercase">Solve_Frequency</p>
            <p className="text-slate-300 text-xs font-bold uppercase">CONSISTENT</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Activity size={14} className="text-violet-500" />
          <div className="font-mono">
            <p className="text-[9px] text-slate-600 uppercase">Neural_Load</p>
            <p className="text-slate-300 text-xs font-bold uppercase">OPTIMAL</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Shield size={14} className="text-green-500" />
          <div className="font-mono">
            <p className="text-[9px] text-slate-600 uppercase">Verification</p>
            <p className="text-slate-300 text-xs font-bold uppercase">AUTHENTICATED</p>
          </div>
        </div>
      </div>
    </div>
  );
}