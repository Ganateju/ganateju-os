"use client";
import { motion } from 'framer-motion';

export default function LearningTicker() {
  const skills = [
    "NEURAL NETWORKS", "RTOS", "SIGNAL PROCESSING", "TENSORFLOW", 
    "NEXT.JS 14", "FUSION 360", "VHDL", "QUANTUM COMPUTING", 
    "OPENCV", "NODE.JS", "CONTROL SYSTEMS"
  ];

  const duplicatedSkills = [...skills, ...skills];

  return (
    <div className="w-full overflow-hidden whitespace-nowrap py-1">
      <motion.div 
        initial={{ x: 0 }}
        animate={{ x: "-50%" }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="flex gap-12 items-center"
      >
        {duplicatedSkills.map((skill, index) => (
          <div key={index} className="flex items-center gap-4">
            <span className="text-[11px] font-mono text-cyan-400 font-bold tracking-[0.2em]">
              {skill}
            </span>
            <span className="w-1.5 h-1.5 bg-violet-600 rounded-full shadow-[0_0_8px_#8b5cf6]" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}