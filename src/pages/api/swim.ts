import type { APIRoute } from 'astro';
import { timingSafeEqual } from 'node:crypto';
import { Redis } from '@upstash/redis';
import { DEFAULT_DATA, applyEdit } from '../../data/swim.js';

// Runs on demand. Everything else on the site stays statically prerendered.
export const prerender = false;

/**
 * Storage for the family swim tracker at /swim.
 *
 * GET returns everything (anyone with the link can read, so the kids can check
 * their times). POST applies one edit and needs the family passcode in the
 * `x-swim-passcode` header; the passcode itself lives in the SWIM_PASSCODE env
 * var. All data is one JSON document in Upstash Redis.
 */

const KEY = 'swim-tracker:v1';

// The Vercel Marketplace integration names these KV_*; a direct Upstash setup
// names them UPSTASH_REDIS_*. Accept either.
const url = import.meta.env.KV_REST_API_URL ?? import.meta.env.UPSTASH_REDIS_REST_URL;
const token = import.meta.env.KV_REST_API_TOKEN ?? import.meta.env.UPSTASH_REDIS_REST_TOKEN;
const redis = url && token ? new Redis({ url, token }) : null;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });

const load = async () => (redis ? await redis.get(KEY) : null) ?? DEFAULT_DATA;

const passcodeOk = (given: string | null) => {
  const expected = import.meta.env.SWIM_PASSCODE;
  if (!expected || !given) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
};

export const GET: APIRoute = async () => {
  try {
    return json({ data: await load() });
  } catch (err) {
    console.error('swim: load failed', err);
    return json({ error: 'Could not load times.' }, 500);
  }
};

export const POST: APIRoute = async ({ request }) => {
  if (!passcodeOk(request.headers.get('x-swim-passcode'))) {
    return json({ error: 'Wrong passcode.' }, 401);
  }

  const edit = await request.json().catch(() => null);

  // Lets the page confirm a passcode before switching into edit mode.
  if (edit?.type === 'check') return json({ ok: true });

  if (!redis) return json({ error: 'Storage is not connected yet.' }, 503);

  try {
    const next = applyEdit(await load(), edit);
    if (!next) return json({ error: 'That edit did not look right.' }, 400);
    await redis.set(KEY, next);
    return json({ data: next });
  } catch (err) {
    console.error('swim: save failed', err);
    return json({ error: 'Could not save.' }, 500);
  }
};
