export type HomeProps = {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
  params: Promise<{ customerCompanyNumber: string }>;
};
