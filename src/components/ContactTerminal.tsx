"use client";
import { Mail, Github, Linkedin, Instagram, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactTerminal() {
  const socialLinks = [
    { 
      name: 'EMAIL', 
      icon: <Mail size={16}/>, 
      label: '242fa05058@vignan.ac.in', // Your university email 
      href: 'mailto:242fa05058@vignan.ac.in' 
    },
    { 
      name: 'LINKEDIN', 
      icon: <Linkedin size={16}/>, 
      label: 'linkedin.com/in/ganateju', 
      href:'https://www.linkedin.com/in/ganateju-pothuganti-5622a1324?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' 
    },
    { 
      name: 'INSTAGRAM', 
      icon: <Instagram size={16}/>, 
      label: '@ganateju_pothuganti', 
      href: 'https://www.instagram.com/teju.words?igsh=MTJ6c3U5dzR3cXM5ZQ==' 
    },
    { 
      name: 'GITHUB', 
      icon: <Github size={16}/>, 
      label: 'github.com/Ganateju', 
      href: 'https://github.com/Ganateju' 
    }
  ];

  return (
    <section id="contact-footer" className="py-24 px-6 md:px-20 bg-slate-950 scroll-mt-20">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col mb-12 text-center md:text-left">
          <h2 className="text-xs font-mono text-slate-500 uppercase tracking-[0.4em] mb-4">
            [SECTION_06]: ESTABLISH_COMM_LINK
          </h2>
          <div className="h-[1px] w-full bg-gradient-to-r from-slate-800 to-transparent" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {socialLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              target="_blank"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group p-6 border border-slate-900 bg-slate-900/10 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all flex flex-col items-center text-center gap-4"
            >
              <div className="p-3 bg-slate-950 border border-slate-800 group-hover:text-cyan-400 transition-colors">
                {link.icon}
              </div>
              <div className="overflow-hidden w-full">
                <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest mb-1">{link.name}</p>
                <p className="text-[10px] font-mono text-slate-400 truncate group-hover:text-cyan-400 transition-colors">
                  {link.label}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* OPEN TO ANY ROLE LOGIC */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-12 p-8 border border-slate-900 bg-slate-900/5 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500" />
          <div className="flex items-center gap-3 mb-4 text-cyan-400">
            <Terminal size={18} />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em]">>_ ENGINEERING_DIRECTIVE</span>
          </div>
          <p className="text-sm text-slate-400 font-mono leading-relaxed italic">
            {`> > "I build systems that begin with constraints, not assumptions.
Whether the challenge involves software, AI, autonomous platforms or performance engineering, my goal remains the same: understand the problem deeply, engineer practical solutions, and continuously improve through measurement."`}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
