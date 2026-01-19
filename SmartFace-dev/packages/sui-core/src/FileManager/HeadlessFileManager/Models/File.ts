import getId from '@hrworks/sui-shared/functions/getId';
import { makeAutoObservable, runInAction } from 'mobx';

export class FileModel {
  id = getId();

  baseFile: File;

  constructor(file: File) {
    makeAutoObservable(this);
    this.baseFile = file;
  }

  base64: string | null = null;

  readBase64 = async () => {
    return new Promise<void>((resolve) => {
      const reader = new FileReader();
      reader.addEventListener('load', (event) => {
        runInAction(() => (this.base64 = event.target?.result as string));
        resolve();
      });
      reader.readAsDataURL(this.baseFile);
    });
  };
}
