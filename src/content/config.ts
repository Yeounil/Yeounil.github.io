import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    year: z.string(),
    role: z.string(),
    summary: z.string(),
    featured: z.object({
      title: z.string(),
      caption: z.string(),
      stack: z.string(),
      art: z.enum(['tiles', 'network', 'voice']),
      order: z.number(),
    }).optional(),
    result: z.object({
      value: z.string(),
      context: z.string().optional(),
      comparison: z.string().optional(),
    }),
    stack: z.array(z.string()),
    github: z.string().url().optional(),
    githubBackend: z.string().url().optional(),
    githubFrontend: z.string().url().optional(),
    order: z.number(),
  }),
});

export const collections = { projects };
