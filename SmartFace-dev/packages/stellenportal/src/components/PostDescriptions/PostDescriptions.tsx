import type { PostSectionKey } from '../../types/post';
import { PostDescription } from './PostDescription';
import type { PostDescriptionsProps } from './PostDescriptions.types';

export const PostDescriptions = ({ postDescriptions }: PostDescriptionsProps) => {
  const sectionKeys: PostSectionKey[] = ['introduction', 'tasks', 'profile', 'offer', 'summary'];

  return (
    <>
      {sectionKeys.map((key) => (
        <PostDescription
          key={key}
          title={postDescriptions[key].title}
          description={postDescriptions[key].description}
        />
      ))}
    </>
  );
};
