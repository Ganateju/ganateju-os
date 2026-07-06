"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Brain } from "lucide-react";
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
    return <div className="min-h-[200px] bg-slate-950" />;

  return (
    <section className="py-24 px-6 md:px-20 bg-slate-950">
      <div className="flex flex-col mb-20">
        <h2 className="text-xs font-mono text-slate-500 uppercase tracking-[0.4em] mb-4">
          [SECTION_03]: TECHNICAL_COMPETENCY_MATRIX
        </h2>
        <div className="h-[1px] w-full bg-gradient-to-r from-slate-800 to-transparent" />
      </div>

      {/* 
        THE LEDGER ARCHITECTURE: 
        A clean, vertical stack of horizontal rows. 
        Scales infinitely without ever creating awkward empty gaps.
      */}
      <div className="flex flex-col gap-12 lg:gap-16">
        
        {CATEGORY_CONFIG.map((category, index) => (
          <SkillRow
            key={category.key}
            title={category.title}
            icon={category.icon}
            skills={skills[category.key as SkillCategory]}
            delay={index * 0.1}
          />
        ))}

        <div className="w-full h-[1px] bg-slate-900 my-4" /> {/* Subtle separator */}

        <SkillRow
          title="ENGINEERING_PRINCIPLES"
          icon={<Brain size={18} />}
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

  const iconColor = accent === "violet" ? "text-violet-400" : "text-cyan-400";
  
  const pillStyle = accent === "violet"
    ? "bg-violet-950/20 border-violet-900/40 text-violet-300 hover:bg-violet-900/40 hover:border-violet-500/50 hover:text-violet-100 hover:shadow-[0_0_15px_-3px_rgba(139,92,246,0.2)]"
    : "bg-slate-900/30 border-slate-800/60 text-slate-400 hover:bg-slate-800/60 hover:border-cyan-500/40 hover:text-cyan-300 hover:shadow-[0_0_15px_-3px_rgba(6,182,212,0.15)]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.4 }}
      className="flex flex-col lg:flex-row gap-6 lg:gap-12 group"
    >
      {/* LEFT COLUMN: Category Header (Fixed width on large screens) */}
      <div className="lg:w-64 shrink-0 flex items-start pt-1">
        <div className="flex items-center gap-3 lg:sticky lg:top-24">
          <div className={`p-2 rounded-md bg-slate-900/50 border border-slate-800 transition-colors duration-500 group-hover:border-${accent}-500/30`}>
            <span className={iconColor}>{icon}</span>
          </div>
          <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-200">
            {title}
          </h3>
        </div>
      </div>

      {/* RIGHT COLUMN: Skills Cloud */}
      <div className="flex-1 flex flex-wrap gap-3">
        {skills.map(skill => (
          <span
            key={skill}
            className={`px-3.5 py-1.5 border text-[11px] font-mono tracking-wide rounded-md transition-all duration-300 cursor-default ${pillStyle}`}
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
