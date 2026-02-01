"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { PenTool, Music, Dumbbell, Zap } from 'lucide-react';

export default function ParallelProcessing() {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase.from('hobbies').select('*').order('created_at', { ascending: false });
      if (data) setLogs(data);
    }
    fetch();
  }, []);

  return (
    <section className="py-24 px-6 md:px-20 bg-slate-950">
      <h2 className="text-xs font-mono text-slate-500 uppercase tracking-[0.4em] mb-12">[SECTION_05]: PARALLEL_PROCESSING_LOGS</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {logs.map((log) => (
          <div key={log.id} className="p-6 border border-slate-900 bg-slate-900/5 hover:border-slate-700 transition-all">
            <h3 className="text-[10px] font-mono text-slate-500 uppercase mb-1">{log.title}</h3>
            <p className="text-lg font-bold text-slate-200 mb-4">{log.activity}</p>
            <p className="text-[11px] text-slate-500 font-mono leading-relaxed italic">
              {`// ${log.insight}`}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}