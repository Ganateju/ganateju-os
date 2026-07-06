import { Circle } from "lucide-react";
import { ProjectStatus, STATUS_CONFIG } from "@/lib/constants";

export default function StatusBadge({ status }: { status: ProjectStatus }) {
  const config = STATUS_CONFIG[status];
  
  if (!config) return null;

  return (
    <div
      className={`flex w-fit items-center gap-2 px-3 py-1 rounded-full border ${config.border}`}
    >
      <Circle size={8} className={`${config.color} fill-current`} />
      <span
        className={`text-[10px] font-mono uppercase tracking-widest ${config.color}`}
      >
        {status}
      </span>
    </div>
  );
}
