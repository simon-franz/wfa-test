import type { Meta, StoryObj } from '@storybook/react';
import { Observer, observer } from 'mobx-react';
import { useEffect } from 'react';
import type { IterableElement } from 'type-fest';

import { DropzoneManager } from '../../Dropzone';
import { HeadlessFileList } from './HeadlessFileList/HeadlessFileList';
import { HeadlessFileManager } from './HeadlessFileManager';
import type { HeadlessFileManagerContext } from './HeadlessFileManagerContext';
import { HeadlessFileUpload } from './HeadlessFileUpload/HeadlessFileUpload';
import { FileModel } from './Models/File';

const meta = {
  title: 'Components/Utils/HeadlessFileManager',
  component: HeadlessFileManager,
  tags: ['autodocs'],
  render: function Component(args) {
    return (
      <DropzoneManager>
        <HeadlessFileManager {...args}>
          {({ errorMessage = 'testi testo' }) => (
            <>
              <HeadlessFileUpload>
                {({ onChange, value, accept, multiple }) => (
                  <>
                    <input type="file" value={value} onChange={onChange} multiple={multiple} accept={accept} />
                    {errorMessage && <p key={errorMessage}>{errorMessage}</p>}
                  </>
                )}
              </HeadlessFileUpload>
              <HeadlessFileList>
                {({ fileList }) => (
                  <Observer>
                    {() => (
                      <>
                        {fileList.map((file) => (
                          <FileListEntry key={file.id} file={file} />
                        ))}
                      </>
                    )}
                  </Observer>
                )}
              </HeadlessFileList>
            </>
          )}
        </HeadlessFileManager>
      </DropzoneManager>
    );
  },
} satisfies Meta<typeof HeadlessFileManager>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'Some File',
    mode: 'growing',
    value: [],
    onValueChange: (value: any) => console.log(value),
    validations: {
      allowedFileTypes: { value: ['image/png'], errorMessage: 'You tried to upload invalid file types' },
      // sizeOfSingleFile: { value: 21000, errorMessage: 'File too big' },
      sizeOfAllFiles: { value: 9_000_000_000, errorMessage: 'Sum of all file sizes is too big' },
      maxFileAmount: { value: 3, errorMessage: 'Too may files' },
    },
  } as any,
};

const FileListEntry = observer(({ file }: { file: IterableElement<HeadlessFileManagerContext['fileList']> }) => {
  useEffect(() => {
    if (file instanceof FileModel) {
      file.readBase64();
    }
  }, [file]);

  return file instanceof FileModel && file.base64 ? (
    <>
      <button type="button" onClick={file.remove}>
        Delete
      </button>
      <img alt="img" src={file.base64} />
    </>
  ) : null;
});
