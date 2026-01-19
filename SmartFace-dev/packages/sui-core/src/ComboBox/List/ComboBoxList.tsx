import { LocalizationContext } from '@hrworks/localization';
import { observer } from 'mobx-react';
import { useContext } from 'react';

import LoadingAnimation from '../../LoadingAnimation';
import { useComboBoxList } from '../';
import { S } from './ComboBoxList.styles';
import type { ComboBoxListProps } from './ComboBoxList.types';

export const ComboBoxList = observer(({ containerRef, currentCache, loadMore, ...otherProps }: ComboBoxListProps) => {
  const { translate } = useContext(LocalizationContext);

  const { shouldGetResult, virtualItems, height, optionRef, onMouseLeave } = useComboBoxList(
    containerRef,
    currentCache,
    loadMore,
  );

  return (
    <S.List ref={containerRef} virtualItems={virtualItems} height={height} onMouseLeave={onMouseLeave} {...otherProps}>
      {virtualItems == null ? (
        shouldGetResult ? (
          <S.Loading>
            <LoadingAnimation type="shimmer" count={1} minWidth={40} maxWidth={90} />
            <LoadingAnimation type="shimmer" count={1} minWidth={10} maxWidth={60} />
            <LoadingAnimation type="shimmer" count={1} minWidth={25} maxWidth={75} />
          </S.Loading>
        ) : null
      ) : virtualItems.length === 0 ? (
        <S.NotFound>{translate('combo-box-not-found')}</S.NotFound>
      ) : (
        virtualItems.map((item) => {
          if (!currentCache || item.index > currentCache.options.length) {
            return null;
          }
          const option = [...currentCache.options][item.index];

          return option ? (
            <S.ComboBoxOption
              key={item.key}
              ref={optionRef}
              option={option}
              index={item.index}
              data-index={item.index}
              $itemStart={item.start}
            />
          ) : (
            currentCache.isLoading && (
              <S.LoadingAbsolute key={item.key} ref={optionRef} data-index={item.index} itemStart={item.start}>
                <LoadingAnimation type="shimmer" count={1} minWidth={40} maxWidth={90} />
                <LoadingAnimation type="shimmer" count={1} minWidth={10} maxWidth={60} />
                <LoadingAnimation type="shimmer" count={1} minWidth={25} maxWidth={75} />
              </S.LoadingAbsolute>
            )
          );
        })
      )}
    </S.List>
  );
});
