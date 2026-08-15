// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// Hidden page prefixes: kept out of the sitemap so they're only reachable by
// someone who was given the link. `/for/` is also disallowed in robots.txt;
// `/hm-` deliberately is not, since listing it there would advertise that it
// exists. The noindex meta tag on those pages does the real work.
const HIDDEN = ['/for/', '/hm-'];

// https://astro.build/config
export default defineConfig({
  site: 'https://kayeputnam.com',
  adapter: vercel(),
  integrations: [
    mdx(),
    sitemap({ filter: (page) => !HIDDEN.some((prefix) => page.includes(prefix)) }),
  ],
});
