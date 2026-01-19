export type PageWithParams<T extends string> = {
  params: Promise<{ [K in T]: string }>;
};
