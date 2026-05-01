/**
 * STATIC DATA: Tech Stack
 * File: src/lib/data/techstack.ts
 */
import {
  SiPython, SiPhp, SiJavascript, SiTypescript,
  SiNextdotjs, SiReact, SiLaravel,
  SiGooglecloud, SiDocker, SiMysql,
  SiPostgresql, SiGit, SiTailwindcss, SiNodedotjs,
} from "react-icons/si";
import { Cloud, ShieldCheck } from "lucide-react";

export interface TechItem {
  name: string;
  category: "language" | "framework" | "cloud" | "security" | "database" | "tools";
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export const techStack: TechItem[] = [
  { name: "TypeScript",   category: "language",  icon: SiTypescript,  color: "text-blue-500" },
  { name: "JavaScript",   category: "language",  icon: SiJavascript,  color: "text-yellow-400" },
  { name: "PHP",          category: "language",  icon: SiPhp,         color: "text-indigo-500" },
  { name: "Python",       category: "language",  icon: SiPython,      color: "text-yellow-500" },

  { name: "Next.js",      category: "framework", icon: SiNextdotjs,   color: "text-[var(--color-text-primary)]" },
  { name: "React",        category: "framework", icon: SiReact,       color: "text-cyan-400" },
  { name: "Node.js",      category: "framework", icon: SiNodedotjs,   color: "text-green-500" },
  { name: "Tailwind CSS", category: "framework", icon: SiTailwindcss, color: "text-cyan-500" },
  { name: "Laravel",      category: "framework", icon: SiLaravel,     color: "text-red-500" },

  { name: "PostgreSQL",   category: "database",  icon: SiPostgresql,  color: "text-blue-600" },
  { name: "MySQL",        category: "database",  icon: SiMysql,       color: "text-blue-500" },

  { name: "AWS",          category: "cloud",     icon: Cloud,         color: "text-orange-400" },
  { name: "Google Cloud", category: "cloud",     icon: SiGooglecloud, color: "text-blue-400" },

  { name: "Docker",       category: "tools",     icon: SiDocker,      color: "text-blue-400" },
  { name: "Git",          category: "tools",     icon: SiGit,         color: "text-orange-500" },

  { name: "Cyber Security", category: "security", icon: ShieldCheck,  color: "text-emerald-500" },
];

export const techCategories: Record<TechItem["category"], string> = {
  language: "Languages", framework: "Frameworks", database: "Database",
  cloud: "Cloud", tools: "Tools", security: "Security",
};

export const categoryOrder: TechItem["category"][] = [
  "language", "framework", "database", "cloud", "tools", "security",
];