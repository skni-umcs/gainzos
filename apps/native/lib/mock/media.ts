import type { MediaDTO } from '@gainzos/types';

/**
 * All mock media point at the bundled placeholder. `url: ''` signals "no remote
 * source" — the <Img> primitive falls back to the local placeholder asset.
 */
export const PLACEHOLDER_MEDIA: MediaDTO = { id: 0, url: '' };

/** Local fallback used by <Img> when a MediaDTO has no usable url. */
export const placeholderImage = require('@/assets/placeholder.png');
