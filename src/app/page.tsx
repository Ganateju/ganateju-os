import Hero from '@/components/Hero';
import LeetCodeMetrics from '@/components/LeetCodeMetrics';
import LearningTicker from '@/components/LearningTicker';
import SkillsMatrix from '@/components/SkillsMatrix';
import TechnicalSkillsInAction from '@/components/TechnicalSkillsInAction';
import ParallelProcessing from '@/components/ParallelProcessing'; 
import ContactTerminal from '@/components/ContactTerminal'; // New component

export default function Home() {
  return (
    <main className="bg-slate-950 min-h-screen selection:bg-cyan-500/30">
      <Hero />
      
      <div className="py-8 border-y border-slate-900 bg-slate-950">
        <LearningTicker />
      </div>
      
      <div className="px-6 md:px-20 py-16">
         <LeetCodeMetrics />
      </div>

      <SkillsMatrix />

      <TechnicalSkillsInAction />

      <ParallelProcessing />

      {/* This is the landing spot for your CONNECT_SYSTEM button */}
      <ContactTerminal />

      <footer className="py-10 flex flex-col items-center justify-center border-t border-slate-900 bg-slate-950">
        <div className="text-slate-700 font-mono text-[10px] animate-pulse uppercase tracking-widest">
          // GANATEJU_OS // SYSTEM_STABLE // 2026 
        </div>
      </footer>
    </main>
  );
}