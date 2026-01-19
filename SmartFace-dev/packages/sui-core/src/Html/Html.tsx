import { observer } from 'mobx-react';
import type { ElementType, HTMLAttributes } from 'react';

type HTMLProps = {
  html: string;
  htmlTag?: ElementType;
} & HTMLAttributes<HTMLElement>;

export const HTML = observer(({ html, htmlTag, ...otherProps }: HTMLProps) => {
  const Tag = htmlTag || 'div';

  return <Tag dangerouslySetInnerHTML={{ __html: html }} {...otherProps} />;
});
