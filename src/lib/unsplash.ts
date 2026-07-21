const UNSPLASH_ACCESS_KEY = import.meta.env.UNSPLASH_ACCESS_KEY;
const PHOTOGRAPHER = 'nirhimi';

interface UnsplashPhoto {
  id: string;
  width: number;
  height: number;
  color?: string;
  urls: { raw: string };
  alt_description: string | null;
  description: string | null;
  links: { download_location: string };
  user: { name: string };
}

// Words that indicate animal subjects
const ANIMAL_WORDS = [
  'lion', 'lioness', 'bird', 'hawk', 'eagle', 'owl', 'deer', 'fox',
  'elephant', 'rhino', 'rhinoceros', 'zebra', 'giraffe', 'monkey',
  'leopard', 'cheetah', 'hyena', 'buffalo', 'hippo', 'crane',
  'heron', 'flamingo', 'pelican', 'stork', 'ibis', 'antelope',
  'gazelle', 'wildebeest', 'warthog', 'jackal', 'vulture', 'ostrich',
  'ostriches', 'oryx', 'oryxes', 'impala', 'seal', 'seals', 'camel',
  'flock', 'sparring', 'horns', 'feathers',
];

function isAnimal(desc: string): boolean {
  const words = desc.toLowerCase().split(/\s+/);
  return ANIMAL_WORDS.some((a) => words.some((w) => w.includes(a)));
}

// Words that indicate urban/man-made subjects (site uses nature imagery only)
const URBAN_WORDS = [
  'city', 'cities', 'skyline', 'building', 'buildings', 'skyscraper',
  'street', 'road', 'car', 'cars', 'driving', 'bridge', 'urban',
  'downtown', 'architecture', 'traffic', 'highway', 'town', 'house',
  'houses', 'tower', 'train', 'taxi', 'boat', 'ship', 'ferris',
  'people', 'person', 'man', 'woman', 'crowd', 'sign', 'signpost',
  'signage', 'tent', 'camp', 'campsite',
];

function isUrban(desc: string): boolean {
  const words = desc.toLowerCase().split(/\s+/);
  return URBAN_WORDS.some((u) => words.some((w) => w === u || w === u + 's'));
}

// Palette fit: the site runs Ink/Forest darks, warm golds, dune/blush neutrals.
// Unsplash exposes each photo's average color as hex; keep photos that are
// dark, warm-toned, or muted earthy greens. Reject bright/cool/saturated.
function fitsPalette(hex?: string): boolean {
  if (!hex) return true;
  const n = parseInt(hex.replace('#', ''), 16);
  if (Number.isNaN(n)) return true;
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const lightness = (max + min) / 2 / 255;
  const sat = max === min ? 0 : (max - min) / (255 - Math.abs(max + min - 255));
  let hue = 0;
  if (max !== min) {
    if (max === r) hue = ((g - b) / (max - min)) % 6;
    else if (max === g) hue = (b - r) / (max - min) + 2;
    else hue = (r - g) / (max - min) + 4;
    hue = (hue * 60 + 360) % 360;
  }
  if (lightness < 0.3) return true;                      // ink/forest darks
  if (hue >= 15 && hue <= 75 && lightness < 0.85) return true;   // golds, sand, blush
  if (hue > 75 && hue <= 170 && sat < 0.45) return true; // muted greens
  if (sat < 0.12) return true;                           // near-neutral creams/grays
  return false;                                          // bright blues, vivid colors
}

// Search terms per category to rank photos (nature only)
const CATEGORY_TERMS: Record<string, string[]> = {
  'Brand Strategy': ['mountain', 'sunset', 'rock', 'arch', 'desert', 'canyon', 'cliff'],
  'AI + Marketing Systems': ['starry', 'stars', 'night', 'fog', 'mist', 'forest', 'dusk', 'milky'],
  'STR & Hospitality': ['ocean', 'dune', 'beach', 'coast', 'sand', 'wave'],
};

let cachedPhotos: UnsplashPhoto[] | null = null;

// Build-time assignment registry: each slug keeps one photo for the whole
// build (consistent across hero/thumbnail widths), and no two slugs share one.
const assignedBySlug = new Map<string, UnsplashPhoto>();
const usedPhotoIds = new Set<string>();

async function fetchPhotos(): Promise<UnsplashPhoto[]> {
  if (cachedPhotos) return cachedPhotos;

  if (!UNSPLASH_ACCESS_KEY) {
    console.warn('[unsplash] No UNSPLASH_ACCESS_KEY found');
    return [];
  }

  try {
    const photos: UnsplashPhoto[] = [];

    for (const page of [1, 2, 3, 4, 5]) {
      const res = await fetch(
        `https://api.unsplash.com/users/${PHOTOGRAPHER}/photos?per_page=30&page=${page}&orientation=landscape`,
        { headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` } }
      );

      if (!res.ok) break;
      const data: UnsplashPhoto[] = await res.json();
      if (data.length === 0) break;

      for (const p of data) {
        if (p.width <= p.height) continue;
        const desc = p.alt_description || p.description || '';
        if (isAnimal(desc)) continue;
        if (isUrban(desc)) continue;
        if (!fitsPalette(p.color)) continue;
        photos.push(p);
      }
    }

    cachedPhotos = photos;
    console.log(`[unsplash] ${photos.length} nature photos loaded (animals/urban/off-palette excluded)`);
    return photos;
  } catch (err) {
    console.warn('[unsplash] Failed to fetch:', err);
    return [];
  }
}

function rankPhoto(photo: UnsplashPhoto, terms: string[]): number {
  const desc = (photo.alt_description || photo.description || '').toLowerCase();
  return terms.reduce((score, term) => score + (desc.includes(term) ? 1 : 0), 0);
}

/**
 * Get a landscape photo for a blog post, matched by category.
 */
export async function getPostImage(
  slug: string,
  category?: string,
  width = 1200
): Promise<{ url: string; alt: string; credit: string } | null> {
  const photos = await fetchPhotos();
  if (photos.length === 0) return null;

  const terms = CATEGORY_TERMS[category || ''] || ['landscape', 'mountain'];

  // Score and sort by relevance, pick the best match
  const scored = photos
    .map((p) => ({ photo: p, score: rankPhoto(p, terms) }))
    .sort((a, b) => b.score - a.score);

  // Use slug hash to pick among top matches so each post gets a different photo
  const topPool = scored.filter((s) => s.score > 0);
  const pool = topPool.length >= 3 ? topPool : scored;

  let photo: UnsplashPhoto;
  const existing = assignedBySlug.get(slug);
  if (existing) {
    photo = existing;
  } else {
    let hash = 0;
    for (let i = 0; i < slug.length; i++) {
      hash = ((hash << 5) - hash + slug.charCodeAt(i)) | 0;
    }
    // Linear-probe from the hashed index so no two posts share a photo
    let index = Math.abs(hash) % pool.length;
    for (let step = 0; step < pool.length; step++) {
      const candidate = pool[(index + step) % pool.length].photo;
      if (!usedPhotoIds.has(candidate.id)) {
        index = (index + step) % pool.length;
        break;
      }
    }
    photo = pool[index].photo;
    assignedBySlug.set(slug, photo);
    usedPhotoIds.add(photo.id);

    // Trigger download tracking once per photo per build (Unsplash guidelines;
    // pinging on every render burns through the 50 req/hr rate limit)
    fetch(photo.links.download_location, {
      headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` },
    }).catch(() => {});
  }

  return {
    url: `${photo.urls.raw}&w=${width}&q=80&fm=webp&fit=crop`,
    alt: photo.alt_description || `Photo by ${photo.user.name}`,
    credit: `Photo by ${photo.user.name} on Unsplash`,
  };
}

/**
 * Get images for multiple posts. One API fetch, different photo per post.
 */
export async function getPostImages(
  posts: { slug: string; category: string }[],
  width = 1200
): Promise<Map<string, { url: string; alt: string; credit: string }>> {
  const map = new Map<string, { url: string; alt: string; credit: string }>();

  for (const post of posts) {
    const result = await getPostImage(post.slug, post.category, width);
    if (result) map.set(post.slug, result);
  }

  return map;
}
