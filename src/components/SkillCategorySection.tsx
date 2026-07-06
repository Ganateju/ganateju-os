import { Skill } from "@/lib/constants";

export default function SkillCategorySection({
  title,
  icon,
  skills,
}: {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
}) {
  if (skills.length === 0) return null;

  return (
    <div className="space-y-6">
      {/* Category Header */}
      <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
        <span className="text-cyan-400">{icon}</span>
        <h4 className="text-[10px] font-mono uppercase tracking-[0.25em] text-cyan-400">
          {title}
        </h4>
      </div>

      {/* Skills */}
      <div className="space-y-6">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="pl-4 border-l border-slate-800 hover:border-cyan-500 transition-colors"
          >
            <h5 className="text-sm font-semibold text-slate-200">
              {skill.name}
            </h5>
            <p className="mt-1 text-xs text-slate-400 leading-relaxed">
              {skill.reason}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
