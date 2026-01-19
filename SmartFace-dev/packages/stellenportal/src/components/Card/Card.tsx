'use client';

import { S } from './Card.styles';
import type { CardProps } from './Card.types';

// TODO: Can we remove this component in the future and replace it with the one from SUI?
export const Card = (props: CardProps) => <S.Container {...props} />;
