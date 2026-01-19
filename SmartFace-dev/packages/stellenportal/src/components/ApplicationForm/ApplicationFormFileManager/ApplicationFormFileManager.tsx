'use client';

import Button from '@hrworks/sui-core/Button';
import { DropzoneManager } from '@hrworks/sui-core/Dropzone';
import { FileManager } from '@hrworks/sui-core/FileManager';
import FontAwesomeIcon from '@hrworks/sui-core/FontAwesomeIcon';
import Grid from '@hrworks/sui-core/Grid';
import GridItem from '@hrworks/sui-core/GridItem';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import type { FileManagerValue } from '@hrworks/sui-core/FileManager/FileManager.types';

export const ApplicationFormFileManager = () => {
  const t = useTranslations('FormFields.files');
  const [value, setValue] = useState<FileManagerValue[]>([]);

  const onValueChange = (newValue: FileManagerValue[]) => {
    setValue(newValue);
  };

  return (
    <DropzoneManager>
      <GridItem>
        <Grid gap="extraLarge">
          <GridItem>
            <FileManager
              value={value}
              name="files"
              mode="growing"
              helpText={t('helptext')}
              validations={{
                allowedFileTypes: {
                  value: ['application/pdf', 'image/jpeg', 'image/png'],
                  errorMessage: t('errors.allowedFileTypes'),
                  extensions: ['.pdf', '.jpg', '.jpeg', '.png'],
                },
                sizeOfAllFiles: {
                  value: 20 * 1024 * 1024,
                  errorMessage: t('errors.sizeOfAllFiles'),
                },
              }}
              onValueChange={onValueChange}
              trigger={
                <Button>
                  {t('label')}
                  <FontAwesomeIcon name="plus" />
                </Button>
              }
            />
          </GridItem>
        </Grid>
      </GridItem>
    </DropzoneManager>
  );
};
