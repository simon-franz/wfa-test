'use client';
import { S } from './Title.styles';
import type { TitleProps } from './Title.types';

export const Title = ({ ...otherProps }: TitleProps) => <S.Title {...otherProps} />;
