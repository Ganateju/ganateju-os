import { Code2, Boxes, Wrench, Cpu } from "lucide-react";

export type SkillCategory =
  | "Language"
  | "Framework & Library"
  | "Tool & Platform"
  | "Engineering Competency";

export type Skill = {
  name: string;
  category: SkillCategory;
  reason: string;
};

export type ProjectStatus =
  | "Patent Preparation"
  | "Functional MVP"
  | "Live Application"
  | "Validated"
  | "Research Project";

export type Project = {
  id: string;
  title: string;
  tagline: string;
  solution: string;
  status: ProjectStatus;
  skills: Skill[];
};

export const CATEGORY_CONFIG = [
  {
    key: "Language",
    title: "Languages",
    icon: <Code2 size={14} />,
  },
  {
    key: "Framework & Library",
    title: "Frameworks & Libraries",
    icon: <Boxes size={14} />,
  },
  {
    key: "Tool & Platform",
    title: "Tools & Platforms",
    icon: <Wrench size={14} />,
  },
  {
    key: "Engineering Competency",
    title: "Engineering Competencies",
    icon: <Cpu size={14} />,
  },
] as const;

export const STATUS_CONFIG: Record<
  ProjectStatus,
  {
    color: string;
    border: string;
  }
> = {
  "Patent Preparation": {
    color: "text-yellow-400",
    border: "border-yellow-500/30",
  },
  "Functional MVP": {
    color: "text-green-400",
    border: "border-green-500/30",
  },
  "Live Application": {
    color: "text-cyan-400",
    border: "border-cyan-500/30",
  },
  Validated: {
    color: "text-violet-400",
    border: "border-violet-500/30",
  },
  "Research Project": {
    color: "text-slate-400",
    border: "border-slate-600",
  },
};
