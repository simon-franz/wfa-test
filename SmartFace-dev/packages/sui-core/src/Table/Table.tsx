import { stringifyDimension } from '@hrworks/sui-shared/functions/stringifyDimension';
import { observer } from 'mobx-react';
import { useId } from 'react';

import { S } from './Table.styles';
import type { TableProps } from './Table.types';
import { TableContext } from './TableContext';

export const Table = observer(
  ({
    id: _id,
    children,
    columnDefinitions,
    alternatingColors = true,
    hoverable = true,
    fullHeight,
    stickyHead,
    ...otherProps
  }: TableProps) => {
    const generatedId = useId();
    const id = _id || generatedId;

    const styleRules = () => {
      if (!columnDefinitions) {
        return null;
      }

      const computedProportions: Record<number, Partial<CSSStyleDeclaration>> = {};

      for (const columnDefinition of columnDefinitions) {
        const { columnIndex, width, minWidth, maxWidth, horizontalAlignment, verticalAlignment } = columnDefinition;

        const temp = document.createElement('div');

        if (width == null) {
          if (minWidth != null) {
            temp.style.minWidth = stringifyDimension(minWidth);
          }
          if (maxWidth != null) {
            temp.style.width = stringifyDimension(maxWidth);
          }
        } else if (width === 'fit-content') {
          temp.style.width = '1%';
          temp.style.whiteSpace = 'nowrap';
        } else {
          const widthString = stringifyDimension(width);
          temp.style.width = widthString;
          temp.style.minWidth = widthString;
        }

        if (horizontalAlignment) {
          temp.style.textAlign = horizontalAlignment;
        }
        if (verticalAlignment) {
          temp.style.verticalAlign = verticalAlignment;
        }

        computedProportions[columnIndex] = temp.style.cssText;
      }

      return Object.entries(computedProportions)
        .map(
          ([index, styles]) =>
            `:where(#${_id}) th:nth-child(${index}),:where(#${_id}) td:nth-child(${index}){${styles}}`,
        )
        .join('');
    };

    return (
      <S.Scroller $fullHeight={fullHeight} id={id} {...otherProps}>
        <S.Table fullHeight={fullHeight}>
          <style>{styleRules()}</style>
          <TableContext.Provider
            value={{
              alternatingColors,
              hoverable,
              stickyHead,
            }}
          >
            {children}
          </TableContext.Provider>
        </S.Table>
      </S.Scroller>
    );
  },
);
