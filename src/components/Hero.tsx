"use client";
import { motion } from 'framer-motion';
import { Terminal, Share2 } from 'lucide-react';

export default function Hero() {
  // 1. Function to scroll to the technical defense section
  const initializeProjects = () => {
    const element = document.getElementById('technical-logs');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  // 2. Updated function to scroll directly to the Contact Terminal
  const connectSystem = () => {
    const element = document.getElementById('contact-footer');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-20 bg-slate-950 overflow-hidden">
      {/* Subtle Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10"
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="h-[1px] w-12 bg-violet-500"></span>
          <span className="text-violet-400 font-mono text-sm tracking-widest uppercase">
            Specializing in AIML & ECE 
          </span>
        </div>

        <h1 className="text-5xl md:text-8xl font-bold text-slate-100 mb-6 tracking-tight">
          Ganateju <br /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600">
            Pothuganti 
          </span>
        </h1>

        <p className="max-w-xl text-slate-400 text-lg md:text-xl mb-10 leading-relaxed">
          Where <span className="text-cyan-400 border-b border-cyan-400/30">Hardware</span> Meets 
          <span className="text-violet-400 italic"> Adaptive Intelligence</span>. 
          Designing systems like <span className="text-slate-200">AeroToroid</span> to bridge physical constraints with neural potential. 
        </p>

        <div className="flex flex-wrap gap-4">
          <button 
            onClick={initializeProjects}
            className="flex items-center gap-2 px-6 py-3 bg-cyan-500 text-slate-950 font-bold rounded-sm hover:bg-cyan-400 transition-all cursor-pointer"
          >
            <Terminal size={18} /> INITIALIZE_PROJECTS
          </button>
          
          {/* UPDATED: CONNECTION BUTTON */}
          <button 
            onClick={connectSystem}
            className="flex items-center gap-2 px-6 py-3 border border-slate-700 text-slate-300 font-bold rounded-sm hover:border-cyan-500 hover:text-cyan-400 transition-all cursor-pointer"
          >
            <Share2 size={18} /> CONNECT_SYSTEM
          </button>
        </div>
      </motion.div>

      {/* SYSTEM STATS FOOTER */}
      <div className="absolute bottom-20 right-20 hidden lg:block z-10 font-mono text-[10px] text-slate-600 border-l border-slate-800 pl-4">
        <p>// 100M_PR: 10.2s</p>
        <p>// STATUS: OPEN_TO_ALL_ROLES</p>
        <p>// LOCATION: VFSTR_OFF_CAMPUS </p>
      </div>
    </section>
  );
}