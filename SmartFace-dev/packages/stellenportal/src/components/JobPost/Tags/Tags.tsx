import { S } from './Tags.styles';
import type { TagsProps } from './Tags.types';

// TODO: Consider using the tag component of sui-core (we might need to extract it)
export const Tags = ({ tags, ...otherProps }: TagsProps) => (
  <S.Container {...otherProps}>
    {tags.map((tag) => (
      <S.Tag key={tag}>{tag}</S.Tag>
    ))}
  </S.Container>
);
