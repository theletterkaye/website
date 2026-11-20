import type { APIRoute } from 'astro';
import { timingSafeEqual } from 'node:crypto';
import { Redis } from '@upstash/redis';

// Runs on demand. Everything else on the site stays statically prerendered.
export const prerender = false;

/**
 * Storage for the private social dashboard at /studio.
 *
 * Unlike /swim, nothing here is readable without the passcode: the page shows
 * a posting plan and account numbers. Every request needs the passcode in the
 * `x-studio-passcode` header (env var STUDIO_PASSCODE).
 *
 * Two documents in Upstash Redis:
 *   studio:data:v1   pushed from Kaye's laptop (schedule, shot list, results)
 *   studio:marks:v1  written from the page (what she marked as posted or shot)
 *   studio:insights:v1  written once a day by the collector on the Mac Studio (per-post numbers and
 *                       the follower count, read from Instagram Insights)
 */

const DATA_KEY = 'studio:data:v1';
const MARKS_KEY = 'studio:marks:v1';
const INSIGHTS_KEY = 'studio:insights:v1';

const url = import.meta.env.KV_REST_API_URL ?? import.meta.env.UPSTASH_REDIS_REST_URL;
const token = import.meta.env.KV_REST_API_TOKEN ?? import.meta.env.UPSTASH_REDIS_REST_TOKEN;
const redis = url && token ? new Redis({ url, token }) : null;

// Local development has no Redis; keep the two documents in memory so the page can be exercised.
const mem: Record<string, unknown> = {};
const get = async (k: string) => (redis ? await redis.get(k) : mem[k]) ?? null;
const set = async (k: string, v: unknown) => { if (redis) await redis.set(k, v); else mem[k] = v; };

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });

const passcodeOk = (given: string | null) => {
  const expected = import.meta.env.STUDIO_PASSCODE;
  if (!expected || !given) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
};

const emptyMarks = () => ({ posted: {} as Record<string, string>, shots: {} as Record<string, string> });
const ID = /^[A-Za-z0-9_.:-]{1,60}$/;
const DAY = /^\d{4}-\d{2}-\d{2}$/;

export const GET: APIRoute = async ({ request }) => {
  if (!passcodeOk(request.headers.get('x-studio-passcode'))) return json({ error: 'Wrong passcode.' }, 401);
  try {
    return json({ data: await get(DATA_KEY), marks: (await get(MARKS_KEY)) ?? emptyMarks(), insights: await get(INSIGHTS_KEY) });
  } catch (err) {
    console.error('studio: load failed', err);
    return json({ error: 'Could not load.' }, 500);
  }
};

export const POST: APIRoute = async ({ request }) => {
  if (!passcodeOk(request.headers.get('x-studio-passcode'))) return json({ error: 'Wrong passcode.' }, 401);
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== 'object') return json({ error: 'Bad request.' }, 400);
  if (body.type === 'check') return json({ ok: true });

  try {
    // From the laptop: replace the plan and results.
    if (body.type === 'push') {
      if (!body.data || typeof body.data !== 'object' || JSON.stringify(body.data).length > 600_000) return json({ error: 'Bad data.' }, 400);
      await set(DATA_KEY, body.data);
      return json({ ok: true, marks: (await get(MARKS_KEY)) ?? emptyMarks(), insights: await get(INSIGHTS_KEY) });
    }
    // From the Mac Studio collector: replace the insights document.
    if (body.type === 'insights') {
      if (!body.insights || typeof body.insights !== 'object' || JSON.stringify(body.insights).length > 500_000) return json({ error: 'Bad insights.' }, 400);
      await set(INSIGHTS_KEY, body.insights);
      return json({ ok: true });
    }
    // From the page: mark something posted or shot (or undo it).
    if (body.type === 'mark') {
      const kind = body.kind === 'shots' ? 'shots' : body.kind === 'posted' ? 'posted' : null;
      if (!kind || typeof body.id !== 'string' || !ID.test(body.id)) return json({ error: 'Bad mark.' }, 400);
      const marks = ((await get(MARKS_KEY)) as ReturnType<typeof emptyMarks>) ?? emptyMarks();
      marks.posted ??= {}; marks.shots ??= {};
      if (body.on === false) delete marks[kind][body.id];
      else marks[kind][body.id] = typeof body.date === 'string' && DAY.test(body.date) ? body.date : new Date().toISOString().slice(0, 10);
      await set(MARKS_KEY, marks);
      return json({ marks });
    }
    return json({ error: 'Unknown request.' }, 400);
  } catch (err) {
    console.error('studio: save failed', err);
    return json({ error: 'Could not save.' }, 500);
  }
};
