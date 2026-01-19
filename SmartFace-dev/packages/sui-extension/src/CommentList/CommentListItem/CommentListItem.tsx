import { observer } from 'mobx-react';
import { type ReactNode, useCallback, useContext } from 'react';

import { CommentListContext } from '../CommentListContext';
import { S } from './CommentListItem.styles';
import type { CommentListItemProps } from './CommentListItem.types';

// TODO Check if ESLint autofix is correct
// eslint-disable-next-line unicorn/better-regex
const urlRegex = /((((https?:\/\/)|(www\.))[^/\s]+((\.\w+)|(:\d+)))|(localhost:\d+))[^\s]*/gi;

export const CommentListItem = observer(
  ({ timestamp, signature, text, toolbarChildren, ...otherProps }: CommentListItemProps) => {
    const { textUrlMaxLength } = useContext(CommentListContext);

    const shortenedUrlText = useCallback(() => {
      if (typeof text === 'string') {
        const textArray: (string | ReactNode)[] = [];
        const allUrlsFromComment = text.matchAll(urlRegex);
        let cursorPosition = 0;

        for (const url of allUrlsFromComment) {
          const { index: urlIndex } = url;
          if (urlIndex == null) {
            break;
          }
          const urlString = url[0];
          const hrefUrl = urlString.replace(/^www\./, 'http://www.');
          let tempUrl = textUrlMaxLength > 0 ? urlString.slice(0, textUrlMaxLength) : urlString;
          if (urlString.length > textUrlMaxLength) {
            tempUrl += '...';
          }
          textArray.push(
            text.slice(cursorPosition, urlIndex),
            <a key={urlIndex} href={hrefUrl} target="_blank">
              {tempUrl}
            </a>,
          );
          cursorPosition = urlIndex + urlString.length;
        }
        textArray.push(text.slice(cursorPosition));

        return textArray;
      } else {
        return text;
      }
    }, [text, textUrlMaxLength]);

    return (
      <S.CommentListItem {...otherProps}>
        <S.CommentHeader>
          <div>
            {signature && <S.Signature>{signature}:</S.Signature>}
            {timestamp && <S.TimeStamp>{timestamp}</S.TimeStamp>}
          </div>
          <S.Toolbar>{toolbarChildren && <S.ToolbarChildren>{toolbarChildren}</S.ToolbarChildren>}</S.Toolbar>
        </S.CommentHeader>
        <S.CommentField>{shortenedUrlText()}</S.CommentField>
      </S.CommentListItem>
    );
  },
);
