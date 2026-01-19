export type SmartFaceBackendComponent<Name extends string, Props extends Record<string, any>> = {
  sfComponent: Name;
  sfId: string;

  props?: Partial<Props>;
  dataGuideId?: string;
};

export type SmartFaceAdapterPropsType<
  TSmartFaceBackendComponent extends
    | SmartFaceBackendComponent<string, Record<string, any>>
    | SmartFaceBackendComponentPart<Record<string, any>>,
> = {
  id: string;
} & TSmartFaceBackendComponent['props'];

export type SmartFaceBackendComponentPart<
  Props extends Record<string, any>,
  Name extends string | undefined = undefined,
> = {
  sfId: string;
  props?: Partial<Props>;
  dataGuideId?: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
} & (Name extends string ? { sfComponentPart: Name } : {});
