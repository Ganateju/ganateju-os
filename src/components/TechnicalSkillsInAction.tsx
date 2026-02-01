"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Orbit, ShieldCheck, Zap, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TechnicalSkillsInAction() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTechnicalLogs() {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) setProjects(data);
      setLoading(false);
    }
    fetchTechnicalLogs();
  }, []);

  if (loading) return <div className="min-h-screen bg-slate-950" />;

  return (
    // Added id="technical-logs" for Hero button navigation
    <section id="technical-logs" className="py-24 px-6 md:px-20 bg-slate-950 scroll-mt-20">
      <div className="flex flex-col mb-16">
        <h2 className="text-xs font-mono text-slate-500 uppercase tracking-[0.4em] mb-4">
          [SECTION_04]: TECHNICAL_SKILLS_IN_ACTION
        </h2>
        <div className="h-[1px] w-full bg-gradient-to-r from-slate-800 to-transparent" />
      </div>

      <div className="grid grid-cols-1 gap-12">
        {projects.map((node, index) => (
          <motion.div 
            key={node.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative p-8 border border-slate-900 bg-slate-900/5 hover:bg-slate-900/10 transition-all rounded-sm"
          >
            {/* System Header */}
            <div className="flex items-center gap-4 mb-10">
              <div className="p-3 bg-slate-950 border border-slate-800 group-hover:border-cyan-500/50 transition-colors">
                <Orbit className="text-cyan-400" size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-100 tracking-tight">{node.title}</h3>
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-1 italic">
                  {node.tagline}
                </p>
              </div>
            </div>

            {/* Dynamic Skills Mapping with Reasoning */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {node.skills?.map((skillObj: any, i: number) => (
                <div key={i} className="relative pl-6 border-l border-slate-800 hover:border-cyan-500 transition-colors group/skill">
                  <div className="absolute -left-[5px] top-0 h-2 w-2 rounded-full bg-slate-800 group-hover/skill:bg-cyan-500 transition-colors" />
                  
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-tighter">
                      {skillObj.name}
                    </span>
                    <Activity size={10} className="text-slate-700" />
                  </div>

                  <p className="text-[11px] text-slate-400 font-mono leading-relaxed italic">
                    {`// ${skillObj.reason}`}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom Engineering Logic */}
            <div className="mt-12 pt-6 border-t border-slate-900/50">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck size={14} className="text-violet-400" />
                <span className="text-[9px] font-mono text-violet-400 uppercase tracking-[0.2em]">Engineering_Defense_Log</span>
              </div>
              <p className="text-xs text-slate-500 font-mono leading-relaxed max-w-4xl">
                {node.solution}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}