import type { components } from '@hrworks/api-schema';

export type Post = components['schemas']['Post'];

export type PostWithPostOffer = Post & { postOffer: components['schemas']['PostOffer'] };
