"use client";
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Terminal, Lock, ShieldCheck, Save, 
  LogOut, Cpu, Zap, PenTool, Trash2, Plus
} from 'lucide-react';

export const SKILL_CATEGORIES = {
  LANGUAGE: "Language",
  FRAMEWORK: "Framework & Library",
  TOOL: "Tool & Platform",
  COMPETENCY: "Engineering Competency",
} as const;

const CATEGORY_COLORS: Record<string, string> = {
  [SKILL_CATEGORIES.LANGUAGE]: "text-cyan-400 border-cyan-700/50 bg-cyan-950/30",
  [SKILL_CATEGORIES.FRAMEWORK]: "text-violet-400 border-violet-700/50 bg-violet-950/30",
  [SKILL_CATEGORIES.TOOL]: "text-amber-400 border-amber-700/50 bg-amber-950/30",
  [SKILL_CATEGORIES.COMPETENCY]: "text-green-400 border-green-700/50 bg-green-950/30",
};

export default function AdminPage() {
  const [mounted, setMounted] = useState(false);
  const [session, setSession] = useState<any>(null);
  
  // Auth State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Data Index State (For Deletion)
  const [projects, setProjects] = useState<any[]>([]);
  const [hobbies, setHobbies] = useState<any[]>([]);

  // Project Form State
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [solution, setSolution] = useState('');
  
  // NEW: Skill + Reasoning Builder State
  const [skillsList, setSkillsList] = useState<{
    name: string;
    category: string;
    reason: string;
  }[]>([]);
  
  const [currentSkill, setCurrentSkill] = useState('');
  const [currentCategory, setCurrentCategory] = useState<string>(SKILL_CATEGORIES.LANGUAGE);
  const [currentReason, setCurrentReason] = useState('');

  // Hobby Form State
  const [hobTitle, setHobTitle] = useState('');
  const [hobActivity, setHobActivity] = useState('');
  const [hobInsight, setHobInsight] = useState('');

  useEffect(() => {
    setMounted(true);
    checkUser();
    fetchData();
  }, []);

  async function checkUser() {
    const { data: { session } } = await supabase.auth.getSession();
    setSession(session);
  }

  async function fetchData() {
    const { data: projs } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    const { data: hobs } = await supabase.from('hobbies').select('*').order('created_at', { ascending: false });
    if (projs) setProjects(projs);
    if (hobs) setHobbies(hobs);
  }

  // --- Skill Builder Logic ---
  const addSkillToBatch = () => {
    if (!currentSkill.trim() || !currentReason.trim()) return;

    const normalizedSkill = currentSkill.trim().toLowerCase();
    
    const alreadyExists = skillsList.some(
      skill => skill.name.trim().toLowerCase() === normalizedSkill
    );

    if (alreadyExists) {
      alert("Skill already added.");
      return;
    }

    setSkillsList([
      ...skillsList,
      {
        name: currentSkill.trim(),
        category: currentCategory,
        reason: currentReason.trim()
      }
    ]);

    setCurrentSkill("");
    setCurrentCategory(SKILL_CATEGORIES.LANGUAGE);
    setCurrentReason("");
  };

  const removeSkillFromBatch = (index: number) => {
    setSkillsList(skillsList.filter((_, i) => i !== index));
  };

  // --- Auth Handlers ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert("ACCESS_DENIED: Invalid Credentials");
    else window.location.reload();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  // --- Data Mutation Handlers ---
  async function handleAddProject(e: React.FormEvent) {
    e.preventDefault();
    if (skillsList.length === 0) {
      alert("ERROR: Please add at least one skill with reasoning.");
      return;
    }

    const { error } = await supabase.from('projects').insert([{ 
      title, tagline, solution, skills: skillsList 
    }]);

    if (!error) {
      alert("SYSTEM_UPDATE: Technical records synchronized.");
      setTitle(''); setTagline(''); setSolution(''); setSkillsList([]);
      fetchData();
    } else {
      alert("UPLOAD_FAILED: Check if you updated your DB column to JSONB.");
    }
  }

  async function handleAddHobby(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.from('hobbies').insert([{ 
      title: hobTitle, activity: hobActivity, insight: hobInsight 
    }]);

    if (!error) {
      alert("HUMAN_LOG_UPDATED: Parallel process initialized.");
      setHobTitle(''); setHobActivity(''); setHobInsight('');
      fetchData();
    }
  }

  async function deleteItem(table: string, id: number) {
    const confirmPurge = confirm(`CONFIRM_PURGE: Delete record from ${table}?`);
    if (confirmPurge) {
      const { error } = await supabase.from(table).delete().eq('id', id);
      if (!error) fetchData();
    }
  }

  if (!mounted) return <div className="min-h-screen bg-slate-950" />;

  // --- LOGIN SCREEN ---
  if (!session) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center font-mono p-6">
        <div className="w-full max-w-md border border-slate-800 bg-slate-900/50 p-8">
          <div className="flex items-center gap-2 text-cyan-400 mb-8 border-b border-slate-800 pb-4 text-xs uppercase tracking-widest">
            <Lock size={16} /> Admin_Authentication
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              type="email" placeholder="ADMIN_ID" suppressHydrationWarning
              className="w-full bg-slate-950 border border-slate-800 p-3 text-sm text-slate-300 outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input 
              type="password" placeholder="ACCESS_KEY" 
              className="w-full bg-slate-950 border border-slate-800 p-3 text-sm text-slate-300 outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="w-full bg-cyan-600 text-slate-950 py-3 text-xs font-bold uppercase hover:bg-cyan-400">
              Initialize_Session
            </button>
          </form>
        </div>
      </main>
    );
  }

  // --- MAIN DASHBOARD ---
  return (
    <main className="min-h-screen bg-slate-950 p-6 md:p-10 font-mono text-slate-300">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12 pb-4 border-b border-slate-800">
          <h1 className="text-cyan-400 text-lg flex items-center gap-2">
            <Terminal size={20} /> GANATEJU_OS // COMMAND_CENTER
          </h1>
          <button onClick={handleLogout} className="text-[10px] text-slate-500 hover:text-red-500 flex items-center gap-2 uppercase tracking-widest transition-colors">
            <LogOut size={14} /> Terminate_Session
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          <div className="space-y-12">
            {/* PROJECT FORM */}
            <section className="bg-slate-900/20 border border-slate-800 p-6 space-y-6">
              <h2 className="text-xs text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                <Cpu size={14} /> // Project_Engineering_Init
              </h2>
              <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-slate-950 border border-slate-800 p-3 text-sm outline-none" placeholder="Project Title" />
              <input value={tagline} onChange={(e) => setTagline(e.target.value)} className="w-full bg-slate-950 border border-slate-800 p-3 text-sm outline-none" placeholder="Tagline" />
              
              {/* SKILL BUILDER UI */}
              <div className="p-4 border border-slate-800 bg-slate-950/50 space-y-4">
                <p className="text-[9px] text-violet-400 uppercase tracking-widest">// Skill_Reasoning_Builder</p>
                <div className="flex flex-col gap-2">
                  <input value={currentSkill} onChange={(e) => setCurrentSkill(e.target.value)} placeholder="Skill (e.g. OpenCV)" className="bg-slate-950 border border-slate-800 p-2 text-xs outline-none" />
                  
                  <select
                    value={currentCategory}
                    onChange={(e) => setCurrentCategory(e.target.value)}
                    className="bg-slate-950 border border-slate-800 p-2 text-xs outline-none"
                  >
                    {Object.values(SKILL_CATEGORIES).map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>

                  <input value={currentReason} onChange={(e) => setCurrentReason(e.target.value)} placeholder="Reasoning (Where/How it was used)" className="bg-slate-950 border border-slate-800 p-2 text-xs outline-none" />
                  
                  <button type="button" onClick={addSkillToBatch} className="w-full py-2 bg-violet-600/20 text-violet-400 border border-violet-500/30 text-[10px] uppercase hover:bg-violet-600 hover:text-white transition-all">
                    + Add_Skill_Node
                  </button>
                </div>
                
                {/* Pending Skills List */}
                <div className="space-y-2 mt-4">
                  {skillsList.map((s, i) => (
                    <div key={i} className="flex justify-between items-center bg-slate-900 p-2 border border-slate-800 text-[10px]">
                      
                      <div className="w-5/6 flex flex-col">
                        <div className="flex items-center gap-2 flex-wrap">
                            <b className="text-cyan-400">
                                {s.name}
                            </b>
                            <span className={`px-2 py-0.5 text-[8px] uppercase rounded border ${CATEGORY_COLORS[s.category] || "border-slate-700 text-slate-500"}`}>
                                {s.category}
                            </span>
                        </div>
                        <p className="text-slate-400 mt-1 truncate">
                            {s.reason}
                        </p>
                      </div>

                      <button onClick={() => removeSkillFromBatch(i)} className="text-red-500"><Trash2 size={12}/></button>
                    </div>
                  ))}
                </div>
              </div>

              <textarea value={solution} onChange={(e) => setSolution(e.target.value)} className="w-full bg-slate-950 border border-slate-800 p-3 text-sm h-24 outline-none resize-none" placeholder="Overall Engineering Fix" />
              <button onClick={handleAddProject} className="w-full bg-cyan-600 text-slate-950 py-3 font-bold uppercase text-xs">Sync_Project_Dossier</button>
            </section>

            {/* HOBBY FORM */}
            <section className="bg-slate-900/20 border border-slate-800 p-6">
              <h2 className="text-xs text-violet-400 mb-6 uppercase tracking-widest flex items-center gap-2">
                <PenTool size={14} /> // Human_Subroutine_Log
              </h2>
              <form onSubmit={handleAddHobby} className="space-y-4">
                <input value={hobTitle} onChange={(e) => setHobTitle(e.target.value)} className="w-full bg-slate-950 border border-slate-800 p-3 text-sm outline-none" placeholder="Log Category" />
                <input value={hobActivity} onChange={(e) => setHobActivity(e.target.value)} className="w-full bg-slate-950 border border-slate-800 p-3 text-sm outline-none" placeholder="Activity" />
                <textarea value={hobInsight} onChange={(e) => setHobInsight(e.target.value)} className="w-full bg-slate-950 border border-slate-800 p-3 text-sm h-24 outline-none resize-none" placeholder="Human Insight" />
                <button type="submit" className="w-full bg-violet-600 text-white py-3 font-bold uppercase text-xs">Update_Human_System</button>
              </form>
            </section>
          </div>

          {/* RECORDS LIST (For Deletion) */}
          <div className="space-y-8">
            <h2 className="text-[10px] text-slate-500 uppercase tracking-[0.4em] mb-4">// Live_System_Index</h2>
            <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
              <p className="text-[9px] text-slate-600 uppercase tracking-widest border-b border-slate-800 pb-2">Technical_Projects</p>
              {projects.map(p => (
                <div key={p.id} className="flex justify-between items-center p-3 border border-slate-900 bg-slate-900/30">
                  <span className="text-[11px] uppercase text-slate-400">{p.title}</span>
                  <button onClick={() => deleteItem('projects', p.id)} className="text-slate-700 hover:text-red-500"><Trash2 size={14} /></button>
                </div>
              ))}
              <p className="text-[9px] text-slate-600 uppercase tracking-widest border-b border-slate-800 pb-2 mt-8">Parallel_Logs</p>
              {hobbies.map(h => (
                <div key={h.id} className="flex justify-between items-center p-3 border border-slate-900 bg-slate-900/30">
                  <span className="text-[11px] uppercase text-slate-400">{h.activity}</span>
                  <button onClick={() => deleteItem('hobbies', h.id)} className="text-slate-700 hover:text-red-500"><Trash2 size={14} /></button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
