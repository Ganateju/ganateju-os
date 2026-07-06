"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import {
  Brain,
  Code2,
  Boxes,
  Wrench,
  Cpu
} from "lucide-react";

type SkillCategory =
  | "Language"
  | "Framework & Library"
  | "Tool & Platform"
  | "Engineering Competency";

type Skill = {
  name: string;
  category: SkillCategory;
  reason: string;
};

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

const CATEGORY_CONFIG = [
  {
    key: "Language",
    title: "Languages",
    icon: <Code2 size={18} />
  },
  {
    key: "Framework & Library",
    title: "Frameworks_&_Libraries",
    icon: <Boxes size={18} />
  },
  {
    key: "Tool & Platform",
    title: "Tools_&_Platforms",
    icon: <Wrench size={18} />
  },
  {
    key: "Engineering Competency",
    title: "Engineering_Competencies",
    icon: <Cpu size={18} />
  }
] as const;

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {CATEGORY_CONFIG.map(category => (
          <SkillBlock
            key={category.key}
            title={category.title}
            icon={category.icon}
            skills={skills[category.key as SkillCategory]}
          />
        ))}

        <SkillBlock
          title="Engineering_Method"
          icon={<Brain size={18} />}
          skills={ENGINEERING_METHOD}
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
      ? "border-violet-500/20 bg-violet-500/5"
      : "border-slate-900 bg-slate-900/10 hover:border-cyan-500/30";

  const text =
    accent === "violet"
      ? "text-violet-300/80"
      : "text-slate-500";

  const iconColor =
    accent === "violet"
      ? "text-violet-400"
      : "text-cyan-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      className={`p-6 border rounded-sm transition-all ${border}`}
    >
      <div className="flex items-center gap-3 mb-6">
        <span className={iconColor}>
          {icon}
        </span>
        <h3 className="text-[10px] font-bold uppercase tracking-tighter text-slate-200">
          {title}
        </h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.map(skill => (
          <span
            key={skill}
            className={`px-2 py-1 border border-slate-800 bg-slate-950 text-[10px] font-mono tracking-wide ${text}`}
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
