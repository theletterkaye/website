import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const casestudies = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/casestudies' }),
  schema: z.object({
    title: z.string(),
    client: z.string(),
    description: z.string(),
    role: z.string(),
    timeline: z.string(),
    industry: z.string(),
    pillars: z.array(z.enum(['Brand Strategy', 'AI + Marketing Systems', 'STR & Hospitality'])),
    featured: z.boolean().default(false),
    order: z.number(),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
    challenge: z.string(),
    insight: z.string(),
    approach: z.string(),
    results: z.array(z.object({
      stat: z.string(),
      label: z.string(),
    })),
    reflection: z.string(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    // Core
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),

    // Taxonomy
    category: z.enum(['Brand Strategy', 'AI + Marketing Systems', 'STR & Hospitality']),
    tags: z.array(z.string()),

    // Display
    excerpt: z.string(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),

    // SEO
    metaTitle: z.string().optional(),
    canonicalUrl: z.string().optional(),

    // AEO — Featured Snippets
    keyTakeaways: z.array(z.string()).default([]),
    faq: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).default([]),

    // GEO — Generative Engine Optimization
    tldr: z.string(),
    topics: z.array(z.string()),
  }),
});

export const collections = { casestudies, blog };
