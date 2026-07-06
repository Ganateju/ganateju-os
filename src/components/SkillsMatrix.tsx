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
        MASONRY LAYOUT FIX: 
        Uses CSS columns instead of CSS grid to allow independent card heights. 
      */}
      <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-5 gap-6">
        
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
  const border =
    accent === "violet"
      ? "border-violet-500/20 bg-violet-500/5 hover:border-violet-500/40"
      : "border-slate-900 bg-slate-900/10 hover:border-cyan-500/30";

  const text =
    accent === "violet"
      ? "text-violet-300/80 border-violet-500/20"
      : "text-slate-400 border-slate-800";

  const iconColor =
    accent === "violet"
      ? "text-violet-400"
      : "text-cyan-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      /* 
        break-inside-avoid prevents the card from being cut in half across columns
        inline-block w-full ensures standard rendering behavior within CSS columns
      */
      className={`break-inside-avoid inline-block w-full mb-6 p-6 border rounded-sm transition-all ${border}`}
    >
      <div className="flex items-center gap-3 mb-6">
        <span className={iconColor}>
          {icon}
        </span>
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-200">
          {title}
        </h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.map(skill => (
          <span
            key={skill}
            className={`px-2.5 py-1 border bg-slate-950 text-[10px] font-mono tracking-wide rounded-sm ${text} hover:text-slate-200 transition-colors cursor-default`}
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
