import { createFileRoute, useLoaderData, useSearch } from '@tanstack/react-router';

import SmartFaceRenderer from '../components/SmartFaceRenderer';

export const Route = createFileRoute('/$componentName')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const componentName = params.componentName;

    return { componentName };
  },
});

function RouteComponent() {
  const { componentName } = useLoaderData({ from: '/$componentName' });
  const componentCase = Object.values(useSearch({ from: '/$componentName' }))[0]?.toString();

  return <SmartFaceRenderer componentName={componentName} componentCase={componentCase} />;
}
