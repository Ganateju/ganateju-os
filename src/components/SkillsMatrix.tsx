"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Brain, Network } from "lucide-react";
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
    <section className="py-24 px-6 md:px-20 bg-[#020617] overflow-hidden relative">
      
      {/* Ambient Graph Background (Faint grid lines to sell the Node Graph vibe) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none" />

      <div className="flex flex-col mb-20 relative z-10">
        <h2 className="text-xs font-mono text-slate-500 uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
          <Network size={14} className="text-cyan-500" />
          [SECTION_03]: SYSTEM_TOPOLOGY_MAP
        </h2>
        <div className="h-[1px] w-full bg-gradient-to-r from-slate-800 to-transparent" />
      </div>

      {/* MASONRY LAYOUT: Keeps columns tightly packed, removing ugly blank spaces.
      */}
      <div className="columns-1 md:columns-2 xl:columns-3 gap-8 xl:gap-12 relative z-10">
        
        {CATEGORY_CONFIG.map((category, index) => (
          <TopologyCluster
            key={category.key}
            title={category.title}
            icon={category.icon}
            skills={skills[category.key as SkillCategory]}
            delay={index * 0.1}
          />
        ))}

        <TopologyCluster
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

function TopologyCluster({
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
  const glowColor = isViolet ? "shadow-violet-500/20" : "shadow-cyan-500/20";
  const borderColor = isViolet ? "border-violet-500/30" : "border-cyan-500/30";
  const textColor = isViolet ? "text-violet-400" : "text-cyan-400";
  const nodeBg = isViolet ? "bg-violet-500" : "bg-cyan-500";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      // break-inside-avoid ensures the cluster doesn't get sliced in half by the masonry layout
      className="break-inside-avoid mb-10 inline-block w-full"
    >
      {/* ROOT NODE (The Category Header) */}
      <div className={`flex items-center gap-3 p-3 rounded-lg border ${borderColor} bg-slate-900/50 backdrop-blur-sm shadow-[0_0_15px_-3px] ${glowColor} w-max relative z-10`}>
        <div className={textColor}>{icon}</div>
        <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-slate-100 pr-2">
          {title}
        </h3>
      </div>

      {/* THE CIRCUIT TRACE (Connecting lines from Root Node to Skills) */}
      <div className="relative pl-6 pt-4 ml-6 border-l-2 border-slate-800/80">
        
        {/* Horizontal Connector branching off the main trunk */}
        <div className="absolute top-0 left-[-2px] w-4 h-4 border-b-2 border-l-2 border-slate-800/80 rounded-bl-lg" />

        {/* SKILLS CLUSTER (The End Nodes) */}
        <div className="flex flex-wrap gap-3 relative z-10 pt-2">
          {skills.map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: delay + (index * 0.03), duration: 0.3 }}
              className="group flex items-center gap-2 px-3 py-1.5 bg-slate-900/40 border border-slate-800/80 rounded-full hover:border-slate-600 transition-colors cursor-default"
            >
              {/* Individual Node Indicator (The dot) */}
              <div className={`w-1.5 h-1.5 rounded-full ${nodeBg} transition-all duration-300 group-hover:shadow-[0_0_8px_1px] ${glowColor}`} />
              
              <span className="text-[11px] font-mono tracking-wide text-slate-400 group-hover:text-slate-200 transition-colors">
                {skill}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </motion.div>
  );
}
