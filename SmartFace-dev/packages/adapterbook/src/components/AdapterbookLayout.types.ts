import type { JsonData } from 'json-edit-react';
import type { Dispatch, HTMLAttributes, SetStateAction } from 'react';

export type AdapterbookLayoutProps = {
  title: string;
  jsonData: JsonData;
  setJsonData: Dispatch<SetStateAction<JsonData>>;
} & HTMLAttributes<HTMLDivElement>;
