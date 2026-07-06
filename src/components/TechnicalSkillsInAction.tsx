"use client";

import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Orbit, ShieldCheck } from "lucide-react";
import { Project, Skill, SkillCategory, CATEGORY_CONFIG } from "@/lib/constants";
import StatusBadge from "@/components/StatusBadge";
import SkillCategorySection from "@/components/SkillCategorySection";

function groupSkills(skills: Skill[] = []) {
  const grouped: Record<SkillCategory, Skill[]> = {
    Language: [],
    "Framework & Library": [],
    "Tool & Platform": [],
    "Engineering Competency": [],
  };

  skills.forEach((skill) => {
    if (grouped[skill.category]) {
      grouped[skill.category].push(skill);
    }
  });

  return grouped;
}

export default function TechnicalSkillsInAction() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      // Strong typing implemented
      setProjects((data ?? []) as Project[]);
      setLoading(false);
    }

    fetchProjects();
  }, []);

  // Performance optimization: Group skills only when projects data changes
  const enhancedProjects = useMemo(() => {
    return projects.map((project) => ({
      ...project,
      groupedSkills: groupSkills(project.skills),
    }));
  }, [projects]);

  if (loading) return <div className="min-h-screen bg-slate-950" />;

  return (
    <section id="technical-logs" className="py-24 px-6 md:px-20 bg-slate-950 scroll-mt-20">
      <div className="flex flex-col mb-16">
        <h2 className="text-xs font-mono text-slate-500 uppercase tracking-[0.4em] mb-4">
          [SECTION_04]: TECHNICAL_SKILLS_IN_ACTION
        </h2>
        <div className="h-[1px] w-full bg-gradient-to-r from-slate-800 to-transparent" />
      </div>

      <div className="grid grid-cols-1 gap-12">
        {enhancedProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className="relative rounded-sm border border-slate-900 bg-slate-900/5 p-8 hover:border-cyan-500/20 transition-all"
          >
            {/* Visually balanced Header Layout */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-slate-950 border border-slate-800 shrink-0 mt-1">
                <Orbit size={18} className="text-cyan-400" />
              </div>
              <div className="flex flex-col items-start">
                <h3 className="text-2xl font-bold text-slate-100">
                  {project.title}
                </h3>
                <p className="mt-2 text-xs font-mono uppercase tracking-[0.2em] text-slate-500 mb-4">
                  {project.tagline}
                </p>
                <StatusBadge status={project.status} />
              </div>
            </div>

            {/* ===================== */}
            {/* Technical Categories */}
            {/* ===================== */}
            <div className="mt-10 space-y-10">
              {CATEGORY_CONFIG.map((category) => (
                <SkillCategorySection
                  key={category.key}
                  title={category.title}
                  icon={category.icon}
                  skills={project.groupedSkills[category.key]}
                />
              ))}
            </div>

            {/* ===================== */}
            {/* Engineering Defense Log */}
            {/* ===================== */}
            <div className="mt-12 pt-8 border-t border-slate-800">
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck size={15} className="text-violet-400" />
                <h4 className="text-[10px] uppercase tracking-[0.25em] font-mono text-violet-400">
                  Engineering Defense Log
                </h4>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed max-w-5xl">
                {project.solution}
              </p>
            </div>
          </motion.div>
        ))}

        {projects.length === 0 && (
          <div className="border border-dashed border-slate-800 rounded-sm py-20 text-center">
            <p className="font-mono text-slate-600">
              // NO_ACTIVE_PROJECTS_FOUND
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
