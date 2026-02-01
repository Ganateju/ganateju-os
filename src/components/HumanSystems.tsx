"use client";
import { motion } from 'framer-motion';
import { Users, Trophy, MessageSquare, ShieldCheck } from 'lucide-react';

export default function HumanSystems() {
  const roles = [
    {
      title: "Class Representative",
      org: "VFSTR University",
      icon: <MessageSquare className="text-violet-400" />,
      desc: "Acting as the primary interface between 60+ stakeholders and university administration. Managing conflict resolution and communication pipelines.",
      skill: "Stakeholder Management"
    },
    {
      title: "Basketball Vice-Captain",
      org: "University Team",
      icon: <Trophy className="text-cyan-400" />,
      desc: "Strategic play-calling and team coordination under high-pressure environments. Focused on real-time decision making and discipline.",
      skill: "High-Pressure Leadership"
    }
  ];

  return (
    <section className="py-24 px-6 md:px-20 bg-slate-950">
      <div className="flex flex-col mb-16">
        <h2 className="text-xs font-mono text-slate-500 uppercase tracking-[0.4em] mb-4">
          [SECTION_04]: HUMAN_SYSTEMS
        </h2>
        <div className="h-[1px] w-full bg-gradient-to-r from-slate-800 to-transparent" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {roles.map((role, index) => (
          <motion.div 
            key={role.title}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="group p-8 border border-slate-900 bg-slate-900/20 rounded-sm hover:bg-slate-900/40 transition-all border-l-violet-500/30"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-sm group-hover:border-cyan-500/50 transition-colors">
                {role.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-100">{role.title}</h3>
                <p className="text-cyan-400 font-mono text-[10px] uppercase tracking-wider">{role.org}</p>
              </div>
            </div>
            
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              {role.desc}
            </p>

            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
              <ShieldCheck size={12} className="text-violet-500" />
              <span>CORE_COMPETENCY: {role.skill}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
