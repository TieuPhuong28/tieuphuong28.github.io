import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// One Markdown file per project in src/content/projects.
// The file name becomes the page URL: yoko-onsen.md -> /work/yoko-onsen/
const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    summary: z.string().default(""),
    category: z.string().default("Brand Identity"),
    client: z.string().optional(),
    role: z.string().optional(),
    timeline: z.string().optional(),
    platforms: z.string().optional(),
    cover: z.string(),
    gallery: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects };
