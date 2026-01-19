'use client';
import Title from '@hrworks/sui-core/Title';

import { Card, CardBody, CardHeader } from '../../Card';
import { HTML } from '../../Html';
import type { PostDescriptionProps } from './PostDescription.types';

export const PostDescription = ({ title, description, ...otherProps }: PostDescriptionProps) => {
  if (!title && !description) {
    return;
  }

  return (
    <Card {...otherProps}>
      <CardHeader>
        <Title headerTag="h2">{title}</Title>
      </CardHeader>
      <CardBody>
        <HTML html={description} />
      </CardBody>
    </Card>
  );
};
