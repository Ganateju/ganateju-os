"use client";

import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Brain, Cpu, ArrowRight } from "lucide-react";
import { SkillCategory, Skill, CATEGORY_CONFIG } from "@/lib/constants";

const ENGINEERING_PRINCIPLES = [
  "Systems Thinking",
  "Constraint-aware Engineering",
  "Adversarial Thinking",
  "Iterative Mindset",
  "Rapid Concept-to-Prototype",
  "Technical Communication",
  "Peer Leadership",
  "Self-directed Learning"
];

export default function SkillsMatrix() {
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [skills, setSkills] = useState<Record<SkillCategory, string[]>>({
    Language: [],
    "Framework & Library": [],
    "Tool & Platform": [],
    "Engineering Competency": [],
  });

  useEffect(() => {
    async function fetchSkills() {
      const { data, error } = await supabase.from("projects").select("skills");

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      if (!data) {
        setLoading(false);
        return;
      }

      const grouped: Record<SkillCategory, Set<string>> = {
        Language: new Set<string>(),
        "Framework & Library": new Set<string>(),
        "Tool & Platform": new Set<string>(),
        "Engineering Competency": new Set<string>(),
      };

      data.forEach(project => {
        (project.skills || []).forEach((skill: Skill) => {
          if (grouped[skill.category]) {
            grouped[skill.category].add(skill.name);
          }
        });
      });

      setSkills({
        Language: [...grouped.Language].sort(),
        "Framework & Library": [...grouped["Framework & Library"]].sort(),
        "Tool & Platform": [...grouped["Tool & Platform"]].sort(),
        "Engineering Competency": [...grouped["Engineering Competency"]].sort(),
      });

      setLoading(false);
    }

    fetchSkills();
  }, []);

  if (loading) return <div className="min-h-[400px] bg-[#050505]" />;

  return (
    <section className="py-24 bg-[#050505] overflow-hidden">
      
      {/* Section Header */}
      <div className="px-6 md:px-20 flex flex-col mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-mono text-slate-500 uppercase tracking-[0.4em] flex items-center gap-2">
            <Cpu size={14} className="text-cyan-500" />
            [SECTION_03]: SYSTEM_PIPELINE
          </h2>
          {/* Scroll Hint for Desktop Users */}
          <div className="hidden md:flex items-center gap-2 text-[10px] text-slate-600 font-mono uppercase tracking-widest animate-pulse">
            Scroll Track <ArrowRight size={12} />
          </div>
        </div>
        <div className="h-[1px] w-full bg-gradient-to-r from-slate-800 to-transparent" />
      </div>

      {/* 
        HORIZONTAL TIMELINE CONTAINER
        Uses snap scrolling and hides the default scrollbar for a native app feel.
      */}
      <div 
        ref={scrollRef}
        className="relative w-full flex overflow-x-auto snap-x snap-mandatory px-6 md:px-20 pb-16 pt-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        
        {/* The Continuous Data Bus Line (The Timeline Axis) */}
        <div className="absolute top-[58px] left-0 h-[1px] w-[200vw] bg-slate-800/80 z-0" />

        <div className="flex gap-8 lg:gap-12 relative z-10">
          {CATEGORY_CONFIG.map((category, index) => (
            <TimelineNode
              key={category.key}
              title={category.title}
              icon={category.icon}
              skills={skills[category.key as SkillCategory]}
              delay={index * 0.15}
            />
          ))}

          <TimelineNode
            title="ENGINEERING_PRINCIPLES"
            icon={<Brain size={16} />}
            skills={ENGINEERING_PRINCIPLES}
            accent="violet"
            delay={0.6}
          />
          
          {/* Empty spacer so the last item doesn't stick to the right edge */}
          <div className="w-[10vw] shrink-0" />
        </div>

      </div>
    </section>
  );
}

function TimelineNode({
  title,
  icon,
  skills,
  accent = "cyan",
  delay = 0,
}: {
  title: string;
  icon: React.ReactNode;
  skills: string[];
  accent?: "cyan" | "violet";
  delay?: number;
}) {
  if (!skills || skills.length === 0) return null;

  const isViolet = accent === "violet";
  const glowColor = isViolet ? "shadow-violet-500/30" : "shadow-cyan-500/30";
  const nodeBg = isViolet ? "bg-violet-500" : "bg-cyan-500";
  const textColor = isViolet ? "text-violet-400" : "text-cyan-400";
  const panelBorder = isViolet ? "border-violet-500/30" : "border-cyan-500/30";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.5, delay }}
      className="shrink-0 w-[85vw] sm:w-[350px] lg:w-[400px] snap-center flex flex-col items-start relative group"
    >
      
      {/* TIMELINE CONNECTION NODE */}
      <div className="flex flex-col items-center ml-8 mb-6 relative">
        {/* The glowing dot on the timeline axis */}
        <div className={`w-3 h-3 rounded-full ${nodeBg} shadow-[0_0_12px_2px] ${glowColor} transition-transform duration-300 group-hover:scale-125`} />
        {/* The vertical pipe dropping down to the panel */}
        <div className="w-[1px] h-6 bg-slate-700 group-hover:bg-slate-500 transition-colors" />
      </div>

      {/* THE DATA PANEL */}
      <div className={`w-full p-6 bg-[#0a0a0a] border ${panelBorder} rounded-xl shadow-xl transition-colors duration-500 group-hover:bg-[#0c0c0c]`}>
        
        {/* Panel Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
          <div className={`p-2 rounded-lg bg-slate-950 border border-slate-800 ${textColor}`}>
            {icon}
          </div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-200">
            {title}
          </h3>
        </div>

        {/* Skills Layout */}
        <div className="flex flex-wrap gap-2.5">
          {skills.map((skill, index) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: delay + 0.2 + (index * 0.03), duration: 0.3 }}
              className={`px-3 py-1.5 border border-slate-800 bg-slate-950/50 text-[11px] font-mono tracking-wide text-slate-400 rounded-md cursor-default transition-all duration-300 ${isViolet ? 'hover:text-violet-200 hover:border-violet-500/50' : 'hover:text-cyan-200 hover:border-cyan-500/50'}`}
            >
              {skill}
            </motion.span>
          ))}
        </div>

      </div>
    </motion.div>
  );
}
