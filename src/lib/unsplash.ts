const UNSPLASH_ACCESS_KEY = import.meta.env.UNSPLASH_ACCESS_KEY;
const PHOTOGRAPHER = 'nirhimi';

interface UnsplashPhoto {
  id: string;
  width: number;
  height: number;
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

// Search terms per category to rank photos
const CATEGORY_TERMS: Record<string, string[]> = {
  'Brand Strategy': ['mountain', 'sunset', 'rock', 'arch', 'desert'],
  'AI + Marketing Systems': ['city', 'road', 'driving', 'car', 'starry'],
  'STR & Hospitality': ['ocean', 'dune', 'beach', 'coast', 'sand', 'wave'],
};

let cachedPhotos: UnsplashPhoto[] | null = null;

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
        photos.push(p);
      }
    }

    cachedPhotos = photos;
    console.log(`[unsplash] ${photos.length} landscape photos loaded (animals excluded)`);
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

  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = ((hash << 5) - hash + slug.charCodeAt(i)) | 0;
  }
  const index = Math.abs(hash) % pool.length;
  const photo = pool[index].photo;

  // Trigger download tracking (Unsplash guidelines)
  fetch(photo.links.download_location, {
    headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` },
  }).catch(() => {});

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
