"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Network, ChevronRight } from "lucide-react";
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
  const [activeNode, setActiveNode] = useState<string>("Language");

  const [skills, setSkills] = useState<Record<string, string[]>>({
    Language: [],
    "Framework & Library": [],
    "Tool & Platform": [],
    "Engineering Competency": [],
    "Engineering Principles": ENGINEERING_PRINCIPLES, // Added here for easy mapping
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

      const grouped: Record<string, Set<string>> = {
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
        "Engineering Principles": ENGINEERING_PRINCIPLES,
      });

      setLoading(false);
    }

    fetchSkills();
  }, []);

  if (loading) return <div className="min-h-[400px] bg-slate-950" />;

  // Combine config with the Principles for the UI loop
  const MINDMAP_NODES = [
    ...CATEGORY_CONFIG,
    { key: "Engineering Principles", title: "Engineering Principles", icon: <Brain size={14} /> }
  ];

  return (
    <section className="py-24 px-6 md:px-20 bg-slate-950 overflow-hidden">
      <div className="flex flex-col mb-16">
        <h2 className="text-xs font-mono text-slate-500 uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
          <Network size={14} className="text-cyan-500" />
          [SECTION_03]: NEURAL_COMPETENCY_MAP
        </h2>
        <div className="h-[1px] w-full bg-gradient-to-r from-slate-800 to-transparent" />
      </div>

      {/* MINDMAP / NODE TREE ARCHITECTURE 
        Mobile: Stacks normally. 
        Desktop: Expands horizontally like a file tree or node graph.
      */}
      <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-0">
        
        {/* LEVEL 1: The Branches (Categories) */}
        <div className="w-full lg:w-1/3 flex flex-col gap-3 relative z-10 lg:pr-8 lg:border-r border-slate-800/50">
          {MINDMAP_NODES.map((node) => {
            const isActive = activeNode === node.key;
            const isViolet = node.key === "Engineering Principles";
            
            const activeBg = isViolet ? "bg-violet-950/40 border-violet-500/50" : "bg-cyan-950/30 border-cyan-500/50";
            const inactiveBg = "bg-slate-900/20 border-slate-800 hover:border-slate-600 hover:bg-slate-900/50";
            const activeText = isViolet ? "text-violet-300" : "text-cyan-300";
            const iconColor = isViolet ? "text-violet-400" : "text-cyan-400";

            return (
              <button
                key={node.key}
                onClick={() => setActiveNode(node.key)}
                className={`group relative flex items-center justify-between w-full p-4 border rounded-xl transition-all duration-300 text-left ${isActive ? activeBg : inactiveBg}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-slate-950 border border-slate-800 ${isActive ? `shadow-[0_0_15px_-3px] ${isViolet ? 'shadow-violet-500/20' : 'shadow-cyan-500/20'}` : ''}`}>
                    <span className={iconColor}>{node.icon}</span>
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-widest ${isActive ? activeText : 'text-slate-400 group-hover:text-slate-300'}`}>
                    {node.title}
                  </span>
                </div>

                <ChevronRight 
                  size={16} 
                  className={`transition-transform duration-300 ${isActive ? `opacity-100 translate-x-0 ${activeText}` : 'opacity-0 -translate-x-4 text-slate-600 group-hover:opacity-100 group-hover:-translate-x-2'}`} 
                />

                {/* Connecting Line (Only visible on Desktop when active) */}
                {isActive && (
                  <motion.div 
                    layoutId="active-connection"
                    className={`hidden lg:block absolute -right-8 top-1/2 w-8 h-[1px] ${isViolet ? 'bg-violet-500/50' : 'bg-cyan-500/50'}`} 
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* LEVEL 2: The Leaves (Skills of the Active Category) */}
        <div className="w-full lg:w-2/3 lg:pl-12 min-h-[400px] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeNode}
              initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -20, filter: "blur(4px)" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
            >
              {skills[activeNode]?.map((skill, index) => {
                const isViolet = activeNode === "Engineering Principles";
                const borderHover = isViolet ? "hover:border-violet-400/50" : "hover:border-cyan-400/50";
                const textHover = isViolet ? "group-hover:text-violet-200" : "group-hover:text-cyan-200";
                const dotColor = isViolet ? "bg-violet-500/50 group-hover:bg-violet-400 shadow-violet-500/50" : "bg-cyan-500/50 group-hover:bg-cyan-400 shadow-cyan-500/50";

                return (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.03, duration: 0.2 }}
                    className={`group relative flex items-center gap-3 p-3 border border-slate-800/60 bg-slate-900/20 rounded-lg transition-all duration-300 cursor-default ${borderHover} hover:bg-slate-900/60`}
                  >
                    {/* The specific "Node" connection dot */}
                    <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 group-hover:shadow-[0_0_8px_1px] ${dotColor}`} />
                    
                    <span className={`text-[11px] font-mono tracking-wide text-slate-400 transition-colors ${textHover}`}>
                      {skill}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
