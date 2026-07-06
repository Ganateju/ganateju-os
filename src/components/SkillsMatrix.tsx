"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Brain, Terminal as TerminalIcon } from "lucide-react";
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

  if (loading) return <div className="min-h-[400px] bg-slate-950" />;

  return (
    <section className="py-24 px-6 md:px-20 bg-[#050505]">
      {/* Fake Terminal Window Wrapper */}
      <div className="max-w-6xl mx-auto rounded-lg border border-slate-800 bg-[#0a0a0a] shadow-2xl overflow-hidden">
        
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-900/50">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
          </div>
          <p className="text-[10px] font-mono text-slate-500 flex items-center gap-2">
            <TerminalIcon size={12} /> root@ganateju_os:~
          </p>
          <div className="w-12" /> {/* Spacer for centering */}
        </div>

        {/* Terminal Body */}
        <div className="p-6 md:p-10 font-mono text-xs md:text-sm">
          
          {/* CLI Input Simulation */}
          <div className="mb-8 text-slate-300">
            <span className="text-green-400">root@ganateju_os</span>:
            <span className="text-blue-400">~/system</span>$ ./query_competencies.sh
            <br />
            <span className="text-slate-500 mt-2 inline-block">
              [SYSTEM] Compiling active skill nodes...
            </span>
          </div>

          {/* OS Directory Tree Architecture */}
          <div className="flex flex-col space-y-6">
            
            {/* Base Directory Node */}
            <div className="text-cyan-400 font-bold mb-2">
              ./competency_matrix/
            </div>

            {CATEGORY_CONFIG.map((category, index) => (
              <TerminalTreeRow
                key={category.key}
                title={category.title}
                icon={category.icon}
                skills={skills[category.key as SkillCategory]}
                isLast={false}
                delay={index * 0.15}
              />
            ))}

            <TerminalTreeRow
              title="ENGINEERING_PRINCIPLES"
              icon={<Brain size={14} />}
              skills={ENGINEERING_PRINCIPLES}
              isLast={true}
              accent="violet"
              delay={0.6}
            />
          </div>

          {/* Awaiting Input Prompt */}
          <div className="mt-12 flex items-center text-slate-300">
            <span className="text-green-400">root@ganateju_os</span>:
            <span className="text-blue-400">~/system</span>$ 
            <span className="w-2.5 h-4 bg-slate-300 animate-pulse ml-2 inline-block align-middle" />
          </div>

        </div>
      </div>
    </section>
  );
}

function TerminalTreeRow({
  title,
  icon,
  skills,
  isLast,
  accent = "cyan",
  delay = 0,
}: {
  title: string;
  icon: React.ReactNode;
  skills: string[];
  isLast: boolean;
  accent?: "cyan" | "violet";
  delay?: number;
}) {
  if (!skills || skills.length === 0) return null;

  const isViolet = accent === "violet";
  const textColor = isViolet ? "text-violet-400" : "text-cyan-400";
  const hoverBg = isViolet ? "hover:bg-violet-400" : "hover:bg-cyan-400";
  const marker = isLast ? "└──" : "├──";

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.3, delay }}
      className="relative flex flex-col group"
    >
      {/* Folder / Category Name */}
      <div className="flex items-center gap-2 text-slate-500">
        <span className="shrink-0">{marker}</span>
        <span className={textColor}>{icon}</span>
        <span className={`font-bold tracking-widest uppercase ${textColor}`}>
          {title}
        </span>
      </div>

      {/* Skills Container (with continuous vertical line on the left if not last item) */}
      <div className={`ml-1.5 pl-6 pt-3 pb-2 flex flex-wrap gap-2.5 ${!isLast ? 'border-l border-slate-800' : ''}`}>
        {skills.map((skill, index) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: delay + (index * 0.02), duration: 0.2 }}
            className={`px-2 py-0.5 border border-slate-800 bg-[#0a0a0a] text-slate-400 text-[11px] transition-colors cursor-crosshair ${hoverBg} hover:text-black`}
          >
            {skill}
          </motion.span> // FIXED TAG HERE
        ))}
      </div>
    </motion.div>
  );
}
