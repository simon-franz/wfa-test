export type WriteUpdate = {
  targetSfId: string;
  operation: 'write';
  path: string | null;
  value: any;
};

export type DeleteUpdateType = {
  targetSfId: string;
  operation: 'delete';
  path: string | null;
};

type PrependUpdateType = {
  targetSfId: string;
  operation: 'prepend';
  path: string;
  value: any;
};

type AppendUpdateType = {
  targetSfId: string;
  operation: 'append';
  path: string;
  value: any;
};

type InsertUpdateType = {
  targetSfId: string;
  operation: 'insert';
  path: string;
  index: number;
  value: any;
};

export type Update = WriteUpdate | DeleteUpdateType | PrependUpdateType | AppendUpdateType | InsertUpdateType;
