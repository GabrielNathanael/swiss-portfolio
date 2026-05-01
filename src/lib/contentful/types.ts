// lib\contentful\types.ts
// lib/contentful/types.ts
import { Asset, Entry } from "contentful";

// ===== Tag Content Type =====
export interface TagFields {
  name: string;
  category: string;
}

export interface TagSkeleton {
  contentTypeId: "tag";
  fields: TagFields;
}

export type TagEntry = Entry<TagSkeleton>;

// ===== Project Content Type =====
export interface ProjectFields {
  title: string;
  description: string;
  image?: Asset;
  githubUrl?: string;
  demoUrl?: string;
  featured?: boolean;
  orientation?: "horizontal" | "vertical";
  projectType?: "Indie" | "Collab";
  sortOrder?: number;
  tags?: TagEntry[];
  year?: number;
}

export interface ProjectSkeleton {
  contentTypeId: "project";
  fields: ProjectFields;
}

export type ProjectEntry = Entry<ProjectSkeleton>;

// ===== Certificate Content Type =====
export interface CertificateFields {
  title: string;
  issuer: string;
  year: number;
  image?: Asset;
  sortOrder?: number;
  highlight?: boolean;
}

export interface CertificateSkeleton {
  contentTypeId: "certificate";
  fields: CertificateFields;
}

export type CertificateEntry = Entry<CertificateSkeleton>;

// ===== Experience Content Type =====
export interface ExperienceFields {
  position: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  isCurrent?: boolean;
  employmentType:
    | "Full-time"
    | "Internship"
    | "Part-time"
    | "Contract"
    | "Freelance";
  website?: string;
  description: string;
  technologies?: string[];
  tools?: string[];
  responsibilities?: string[];
  projectWebsite?: string[];
}

export interface ExperienceSkeleton {
  contentTypeId: "experience";
  fields: ExperienceFields;
}

export type ExperienceEntry = Entry<ExperienceSkeleton>;

// ===== Profile Content Type =====
export interface ProfileFields {
  photo?: Asset;
  resume?: Asset;
}

export interface ProfileSkeleton {
  contentTypeId: "profile";
  fields: ProfileFields;
}

export type ProfileEntry = Entry<ProfileSkeleton>;

// ===== App Types (Final Output) =====
export interface Profile {
  photo: string;
  resume: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl: string | null;
  demoUrl: string | null;
  featured: boolean;
  year: number;
  orientation: "vertical" | "horizontal";
  projectType: "Indie" | "Collab";
  sortOrder: number;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  year: string;
  image: string;
  sortOrder: number;
  highlight: boolean;
}

export interface Experience {
  id: string;
  position: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | null;
  iscurrent: boolean;
  employmentType:
    | "Full-time"
    | "Internship"
    | "Part-time"
    | "Contract"
    | "Freelance";
  website?: string;
  description: string;
  technologies: string[];
  tools?: string[];
  responsibilities?: string[];
  projectWebsite?: Array<{ title: string; url: string }>;
}