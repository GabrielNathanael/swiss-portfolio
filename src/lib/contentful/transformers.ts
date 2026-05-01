// lib\contentful\transformers.ts
// lib/contentful/transformers.ts
import { Asset, Entry } from "contentful";
import {
  ProjectSkeleton,
  CertificateSkeleton,
  ExperienceSkeleton,
  TagSkeleton,
  ProfileSkeleton,
  Project,
  Certificate,
  Experience,
  Profile,
} from "./types";

/**
 * Extract image URL from Contentful Asset
 */
const getImageUrl = (asset: Asset | undefined): string => {
  if (!asset?.fields?.file?.url) {
    return "https://via.placeholder.com/800x600?text=No+Image";
  }
  const url = asset.fields.file.url as string;
  return url.startsWith("//") ? `https:${url}` : url;
};

/**
 * Transform Project Entry → App Project
 */
export const transformProject = (
  entry: Entry<ProjectSkeleton, undefined, string>
): Project => {
  const fields = entry.fields;

  // Extract tag names from linked Tag entries
  const tags =
    (fields.tags as Entry<TagSkeleton, undefined, string>[] | undefined)?.map(
      (tag) => tag.fields.name as string
    ) || [];

  return {
    id: entry.sys.id,
    title: fields.title as string,
    description: fields.description as string,
    image: getImageUrl(fields.image as Asset | undefined),
    tags,
    githubUrl: (fields.githubUrl as string | undefined) || null,
    demoUrl: (fields.demoUrl as string | undefined) || null,
    featured: (fields.featured as boolean | undefined) || false,
    year: (fields.year as number | undefined) || new Date().getFullYear(),
    orientation:
      (fields.orientation as "horizontal" | "vertical" | undefined) ||
      "horizontal",
    projectType:
      (fields.projectType as "Indie" | "Collab" | undefined) || "Indie",
    sortOrder: (fields.sortOrder as number | undefined) || 0,
  };
};

/**
 * Transform Certificate Entry → App Certificate
 */
export const transformCertificate = (
  entry: Entry<CertificateSkeleton, undefined, string>
): Certificate => {
  const fields = entry.fields;

  return {
    id: entry.sys.id,
    title: fields.title as string,
    issuer: fields.issuer as string,
    year: String(fields.year as number), // Convert Integer → String
    image: getImageUrl(fields.image as Asset | undefined),
    sortOrder: (fields.sortOrder as number | undefined) || 0,
    highlight: (fields.highlight as boolean | undefined) || false,
  };
};

/**
 * Transform Experience Entry → App Experience
 */
export const transformExperience = (
  entry: Entry<ExperienceSkeleton, undefined, string>
): Experience => {
  const fields = entry.fields;

  // Format date from Contentful Date to YYYY-MM format
  const formatDate = (date: string | undefined): string | null => {
    if (!date) return null;
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}`;
  };

  const parseProjectWebsites = (
    websites: string[] | undefined
  ): Array<{ title: string; url: string }> => {
    if (!websites) return [];

    return websites.map((item) => {
      const [title, url] = item.split("::");
      return {
        title: title?.trim() || "Website",
        url: url?.trim() || "#",
      };
    });
  };
  return {
    id: entry.sys.id,
    position: fields.position as string,
    company: fields.company as string,
    location: fields.location as string,
    startDate: formatDate(fields.startDate as string | undefined) || "",
    endDate: formatDate(fields.endDate as string | undefined),
    iscurrent: (fields.isCurrent as boolean | undefined) || false, // isCurrent → iscurrent
    employmentType: fields.employmentType as
      | "Full-time"
      | "Internship"
      | "Part-time"
      | "Contract"
      | "Freelance",
    website: fields.website as string | undefined,
    description: fields.description as string,
    technologies: (fields.technologies as string[] | undefined) || [],
    tools: fields.tools as string[] | undefined,
    responsibilities: fields.responsibilities as string[] | undefined,
    projectWebsite: parseProjectWebsites(
      fields.projectWebsite as string[] | undefined
    ),
  };
};

/**
 * Transform Profile Entry → App Profile
 */
export const transformProfile = (
  entry: Entry<ProfileSkeleton, undefined, string>
): Profile => {
  const fields = entry.fields;

  return {
    photo: getImageUrl(fields.photo as Asset | undefined),
    resume: getImageUrl(fields.resume as Asset | undefined), // PDF URL works same as image
  };
};

/**
 * Generate Tag Categories from Tag entries
 * Output: { "Languages": ["JavaScript", "TypeScript"], ... }
 */
export const generateTagCategories = (
  tags: Entry<TagSkeleton, undefined, string>[]
): Record<string, string[]> => {
  const categories: Record<string, string[]> = {};

  tags.forEach((tag) => {
    const category = tag.fields.category as string;
    const name = tag.fields.name as string;

    if (!categories[category]) {
      categories[category] = [];
    }

    categories[category].push(name);
  });

  // Sort tags within each category
  Object.keys(categories).forEach((category) => {
    categories[category].sort();
  });

  return categories;
};