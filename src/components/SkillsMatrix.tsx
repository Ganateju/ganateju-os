"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Brain, Database } from "lucide-react";
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
      const { data, error } = await supabase
        .from("projects")
        .select("skills");

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

  if (loading)
    return <div className="min-h-[400px] bg-slate-950" />;

  return (
    <section className="py-24 px-6 md:px-20 bg-slate-950">
      <div className="flex flex-col mb-16">
        <h2 className="text-xs font-mono text-slate-500 uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
          <Database size={14} className="text-cyan-500" />
          [SECTION_03]: TECHNICAL_COMPETENCY_LEDGER
        </h2>
        <div className="h-[1px] w-full bg-gradient-to-r from-slate-800 to-transparent" />
      </div>

      {/* 
        THE LEDGER ARCHITECTURE:
        Stacks vertically, flows horizontally. Zero empty space, zero clicking required.
      */}
      <div className="flex flex-col gap-16 relative">
        
        {/* Subtle vertical connecting line down the left side (Desktop only) */}
        <div className="hidden lg:block absolute left-[15.5px] top-4 bottom-0 w-[1px] bg-gradient-to-b from-slate-800 via-slate-800 to-transparent" />

        {CATEGORY_CONFIG.map((category, index) => (
          <SkillRow
            key={category.key}
            title={category.title}
            icon={category.icon}
            skills={skills[category.key as SkillCategory]}
            delay={index * 0.1}
          />
        ))}

        <SkillRow
          title="ENGINEERING_PRINCIPLES"
          icon={<Brain size={16} />}
          skills={ENGINEERING_PRINCIPLES}
          accent="violet"
          delay={0.4}
        />

      </div>
    </section>
  );
}

function SkillRow({
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
  
  const iconColor = isViolet ? "text-violet-400" : "text-cyan-400";
  const iconBg = isViolet ? "bg-violet-950/30 border-violet-500/30" : "bg-cyan-950/20 border-cyan-500/30";
  
  const pillStyle = isViolet
    ? "bg-slate-900/40 border-slate-800/80 text-slate-400 hover:bg-violet-950/40 hover:border-violet-500/50 hover:text-violet-200"
    : "bg-slate-900/40 border-slate-800/80 text-slate-400 hover:bg-cyan-950/30 hover:border-cyan-500/50 hover:text-cyan-200";

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-16 group relative z-10">
      
      {/* 
        LEFT COLUMN (Category Header)
        Uses sticky positioning on desktop so it stays visible while scrolling through long skill lists 
      */}
      <div className="w-full lg:w-64 shrink-0">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, delay }}
          className="flex items-center gap-4 lg:sticky lg:top-28"
        >
          <div className={`p-2.5 rounded-xl border ${iconBg} shadow-lg transition-colors duration-500`}>
            <span className={iconColor}>{icon}</span>
          </div>
          <h3 className={`text-[11px] font-bold uppercase tracking-[0.2em] ${isViolet ? 'text-violet-100' : 'text-slate-100'}`}>
            {title}
          </h3>
        </motion.div>
      </div>

      {/* 
        RIGHT COLUMN (Skills Cloud)
        Uses flex-wrap to infinitely absorb skills. Fills the remaining space perfectly.
      */}
      <div className="flex-1 flex flex-wrap gap-2.5 items-start">
        {skills.map((skill, index) => (
          <motion.div
            key={skill}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: delay + (index * 0.02), duration: 0.3 }}
            className={`px-3.5 py-1.5 border text-[11px] font-mono tracking-wide rounded-md transition-all duration-300 cursor-default ${pillStyle}`}
          >
            {skill}
          </motion.div>
        ))}
      </div>
      
    </div>
  );
}
