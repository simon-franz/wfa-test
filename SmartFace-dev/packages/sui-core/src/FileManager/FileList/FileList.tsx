import { LocalizationContext } from '@hrworks/localization';
import { MISSING_STRING } from '@hrworks/sui-shared';
import { formatBytes } from '@hrworks/sui-shared/functions/formatBytes';
import { observer } from 'mobx-react';
import { useContext } from 'react';

import Icon from '../../Icon';
import Progress from '../../Progress';
import { HeadlessFileList } from '../';
import { S } from './FileList.styles';
import type { FileListProps } from './FileList.types';

export const FileList = observer(({ disabled, ...otherProps }: FileListProps) => {
  const { translate } = useContext(LocalizationContext);

  return (
    <HeadlessFileList>
      {({ fileList }) =>
        !!fileList.length && (
          <S.Table {...otherProps}>
            {fileList.map(({ id, displayName, remove, progress, size, ignoreSize, displayUrl }) => {
              const progressSnapshot = progress?.get();

              return (
                <S.Item key={id} disabled={disabled}>
                  {displayUrl ? (
                    <S.DisplayNameWithURL href={displayUrl} target="_blank">
                      {displayName || displayUrl}
                    </S.DisplayNameWithURL>
                  ) : (
                    <S.DisplayNameDiv>{displayName || MISSING_STRING}</S.DisplayNameDiv>
                  )}
                  {size != null && !ignoreSize && <S.FormatBytes>{formatBytes(size)}</S.FormatBytes>}
                  <S.Interact>
                    {progressSnapshot == null ? (
                      <S.DeleteButton
                        variant="unstyled"
                        aria-label={translate('file-manager-file-list-delete')}
                        disabled={disabled}
                        onClick={disabled ? undefined : remove}
                      >
                        <Icon name="file-manager-delete" />
                      </S.DeleteButton>
                    ) : (
                      // TODO Animation when <~10%
                      <Progress presentation="circular" progress={progressSnapshot * 100} />
                    )}
                  </S.Interact>
                </S.Item>
              );
            })}
          </S.Table>
        )
      }
    </HeadlessFileList>
  );
});
