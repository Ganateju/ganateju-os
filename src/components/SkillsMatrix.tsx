"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { Cpu, Binary, Layers, Brain } from 'lucide-react';

export default function SkillsMatrix() {
  const [dynamicSkills, setDynamicSkills] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Hardcoded Personality & Philosophy Block
  const personalitySkills = [
    "Systems Thinking", "Adversarial Thinking", "Constraint-aware Engineering", 
    "Iterative Mindset", "Self-directed Learning", "Peer Leadership", 
    "Technical Idea Presentation", "Rapid Concept-to-Prototype"
  ];

  useEffect(() => {
    async function fetchSkills() {
      const { data } = await supabase.from('projects').select('skills');
      if (data) {
        // Flatten the array of skill objects and extract only the 'name' property
        const allSkillNames = data.flatMap(project => 
          (project.skills || []).map((s: any) => typeof s === 'object' ? s.name : s)
        );
        // Remove duplicates
        setDynamicSkills(Array.from(new Set(allSkillNames)));
      }
      setLoading(false);
    }
    fetchSkills();
  }, []);

  // Split dynamic skills into 3 chunks for the first 3 blocks
  const chunk1 = dynamicSkills.slice(0, Math.ceil(dynamicSkills.length / 3));
  const chunk2 = dynamicSkills.slice(chunk1.length, chunk1.length + Math.ceil(dynamicSkills.length / 3));
  const chunk3 = dynamicSkills.slice(chunk1.length + chunk2.length);

  if (loading) return <div className="min-h-[200px] bg-slate-950" />;

  return (
    <section className="py-24 px-6 md:px-20 bg-slate-950">
      <div className="flex flex-col mb-16">
        <h2 className="text-xs font-mono text-slate-500 uppercase tracking-[0.4em] mb-4">
          [SECTION_03]: TECHNICAL_COMPETENCY_MATRIX
        </h2>
        <div className="h-[1px] w-full bg-gradient-to-r from-slate-800 to-transparent" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SkillBlock title="Intelligent_Systems" icon={<Binary size={18}/>} skills={chunk1} />
        <SkillBlock title="Systems_Architect" icon={<Layers size={18}/>} skills={chunk2} />
        <SkillBlock title="Software_Engineering" icon={<Cpu size={18}/>} skills={chunk3} />

        {/* Hardcoded Personality Block */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="p-6 border border-violet-500/20 bg-violet-500/5 rounded-sm"
        >
          <div className="flex items-center gap-3 mb-6">
            <Brain className="text-violet-400" size={18} />
            <h3 className="text-[10px] font-bold text-slate-200 uppercase tracking-tighter">
              Engineering_Method
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {personalitySkills.map((skill) => (
              <span key={skill} className="text-[10px] font-mono text-violet-300/70">
                {`> ${skill}`}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SkillBlock({ title, icon, skills }: { title: string, icon: any, skills: string[] }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="p-6 border border-slate-900 bg-slate-900/10 rounded-sm hover:border-cyan-500/30 transition-all"
    >
      <div className="flex items-center gap-3 mb-6">
        <span className="text-cyan-400">{icon}</span>
        <h3 className="text-[10px] font-bold text-slate-200 uppercase tracking-tighter">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skillName) => (
          <span 
            key={skillName} // Unique string key prevents the [object Object] error
            className="px-2 py-1 bg-slate-950 border border-slate-800 text-[9px] font-mono text-slate-500 uppercase"
          >
            {skillName}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
