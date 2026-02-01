"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Terminal, Cpu, Shield, Brain, ExternalLink } from 'lucide-react';

export default function ProjectLab() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      // Fetching all columns from your Supabase 'projects' table
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) setProjects(data);
      setLoading(false);
    }
    fetchProjects();
  }, []);

  if (loading) return (
    <div className="py-24 px-6 md:px-20 bg-slate-950 font-mono text-cyan-500 animate-pulse text-xs">
      // SYNCHRONIZING_WITH_DATABASE...
    </div>
  );

  return (
    <section className="py-24 px-6 md:px-20 bg-slate-950">
      <div className="flex flex-col mb-16">
        <h2 className="text-xs font-mono text-slate-500 uppercase tracking-[0.4em] mb-4">
          [SECTION_04]: PROJECT_LAB_ACTIVE_FILES
        </h2>
        <div className="h-[1px] w-full bg-gradient-to-r from-slate-800 to-transparent" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="group relative p-8 border border-slate-900 bg-slate-900/10 rounded-sm hover:border-cyan-500/30 transition-all overflow-hidden"
          >
            {/* Category Badge */}
            <div className="absolute top-0 right-0 px-3 py-1 bg-slate-800 text-[9px] font-mono text-slate-400 uppercase tracking-widest border-l border-b border-slate-700">
              {project.category || 'SYSTEM'}
            </div>

            <h3 className="text-2xl font-bold text-slate-100 mb-4 flex items-center gap-3">
              {project.title}
            </h3>
            
            <p className="text-sm text-slate-400 mb-8 font-mono leading-relaxed h-12 line-clamp-2">
              {project.tagline}
            </p>

            <div className="space-y-4 border-t border-slate-800/50 pt-6">
              <div>
                <span className="text-[10px] text-cyan-400 font-mono uppercase tracking-widest block mb-1">
                  _Engineering_Fix:
                </span>
                <p className="text-xs text-slate-500 font-mono italic leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Hover Decorator */}
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-cyan-500 transition-all group-hover:w-full" />
          </div>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-20 border border-dashed border-slate-800 text-slate-700 font-mono text-sm">
          // NO_ACTIVE_RECORDS_FOUND // USE_ADMIN_PANEL_TO_INITIALIZE
        </div>
      )}
    </section>
  );
}