import { useCallback, useState } from 'react';

import { S } from './DataWidget.styles';
import type { DataWidgetProps } from './DataWidget.types';
import { DataWidgetCard } from './DataWidgetCard';

export const DataWidget = ({ value, children, ...otherProps }: DataWidgetProps) => {
  const [showValue, setShowValue] = useState(true);
  const [initialRender, setIsInitialRender] = useState(true);

  const onToggleValue = useCallback(() => {
    initialRender && setIsInitialRender(false);
    setShowValue(!showValue);
  }, [initialRender, showValue]);

  const content = showValue ? <S.Value as="div">{value}</S.Value> : <div>{children}</div>;

  return (
    <S.Wrapper>
      <DataWidgetCard
        key={'' + showValue}
        onToggleValue={onToggleValue}
        initialRender={initialRender}
        data-show-value={!!showValue}
        {...otherProps}
      >
        {content}
      </DataWidgetCard>
    </S.Wrapper>
  );
};
