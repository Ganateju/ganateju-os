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
      <div className="flex flex-col mb-16">
        <h2 className="text-xs font-mono text-slate-500 uppercase tracking-[0.4em] mb-4">
          [SECTION_03]: TECHNICAL_COMPETENCY_MATRIX
        </h2>
        <div className="h-[1px] w-full bg-gradient-to-r from-slate-800 to-transparent" />
      </div>

      {/* 
        THE FIX: Changed to max 3 columns (lg:grid-cols-3). 
        This gives tags room to breathe horizontally, balancing the heights perfectly.
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        
        {CATEGORY_CONFIG.map(category => (
          <SkillBlock
            key={category.key}
            title={category.title}
            icon={category.icon}
            skills={skills[category.key as SkillCategory]}
          />
        ))}

        <SkillBlock
          title="ENGINEERING_PRINCIPLES"
          icon={<Brain size={18} />}
          skills={ENGINEERING_PRINCIPLES}
          accent="violet"
        />

      </div>
    </section>
  );
}

function SkillBlock({
  title,
  icon,
  skills,
  accent = "cyan",
}: {
  title: string;
  icon: React.ReactNode;
  skills: string[];
  accent?: "cyan" | "violet";
}) {
  // Enhanced, premium card aesthetics
  const border =
    accent === "violet"
      ? "border-violet-900/40 bg-violet-950/10 hover:border-violet-500/40 hover:bg-violet-950/20"
      : "border-slate-800/60 bg-slate-900/20 hover:border-cyan-500/30 hover:bg-slate-900/40";

  const iconColor =
    accent === "violet"
      ? "text-violet-400"
      : "text-cyan-400";

  // Sleeker, more interactive pill styles
  const pillStyle = 
    accent === "violet"
      ? "bg-violet-950/40 border-violet-900/50 text-violet-300 hover:bg-violet-900/60 hover:border-violet-400/50 hover:text-violet-100"
      : "bg-slate-950/50 border-slate-800/80 text-slate-400 hover:bg-slate-900 hover:border-cyan-500/50 hover:text-cyan-300";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`p-7 border rounded-2xl transition-all duration-300 w-full shadow-lg shadow-black/20 ${border}`}
    >
      {/* Header separated by a subtle border line */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800/50">
        <span className={iconColor}>
          {icon}
        </span>
        <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-200">
          {title}
        </h3>
      </div>

      {/* Skills map wrapping horizontally */}
      <div className="flex flex-wrap gap-2.5">
        {skills.map(skill => (
          <span
            key={skill}
            className={`px-3 py-1.5 border text-[11px] font-mono tracking-wide rounded-md transition-all duration-300 cursor-default shadow-sm ${pillStyle}`}
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
