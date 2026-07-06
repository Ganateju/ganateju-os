"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

// 1. Define the exact type based on your Supabase schema
type HobbyLog = {
  id: number;
  created_at: string;
  title: string;
  activity: string;
};

export default function ParallelProcessing() {
  const [logs, setLogs] = useState<HobbyLog[]>([]);

  useEffect(() => {
    async function fetchLogs() {
      const { data, error } = await supabase
        .from('hobbies')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Error fetching logs:", error);
        return;
      }
      
      if (data) setLogs(data);
    }
    fetchLogs();
  }, []);

  return (
    <section className="py-24 px-6 md:px-20 bg-slate-950">
      <h2 className="text-xs font-mono text-slate-500 uppercase tracking-[0.4em] mb-12">
        [SECTION_05]: PARALLEL_PROCESSING_LOGS
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {logs.map((log) => (
          <div 
            key={log.id} 
            className="p-6 border border-slate-900 bg-slate-900/5 hover:border-slate-700 transition-all rounded-sm"
          >
            <h3 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2">
              {log.title}
            </h3>
            {/* Removed margin-bottom since it's the last element now */}
            <p className="text-lg font-bold text-slate-200 tracking-tight">
              {log.activity}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
