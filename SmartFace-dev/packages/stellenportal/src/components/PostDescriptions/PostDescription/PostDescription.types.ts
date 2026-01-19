import type { HTMLAttributes } from 'react';

import type { PostDescription } from '../../../types/post';

export type PostDescriptionProps = PostDescription & HTMLAttributes<HTMLDivElement>;
