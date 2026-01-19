import '@hrworks/design-system/styles/critical.css';

import { COMPONENT_MAP } from '@hrworks/smartface/adapters/componentMap';
import { SmartFaceContainer } from '@hrworks/smartface/main/components/SmartFaceContainer';
import UiHandler from '@hrworks/smartface/main/components/UiHandler';
import type { SmartFaceComponentsType } from '@hrworks/smartface/types/SmartFaceComponentsType';
import getId from '@hrworks/sui-shared/functions/getId';
import type { JsonData } from 'json-edit-react';
import { memo, useEffect, useMemo, useState } from 'react';

import { map } from '../components/ExampleComponentMapper';
import { AdapterbookLayout } from './AdapterbookLayout';
import { caseMap } from './ExampleComponentCaseMapper';
import type { SmartFaceRendererProps } from './SmartFaceRenderer.types';

const SmartFaceRenderer = memo(({ componentName, componentCase }: SmartFaceRendererProps) => {
  const matchedComponentName = componentName
    ? Object.keys(COMPONENT_MAP).find((key) => key.toLowerCase() === componentName.toString().toLowerCase())
    : undefined;

  const mergedProps = useMemo(() => {
    const baseProps = map[matchedComponentName as keyof typeof map] || {};
    const caseProps = caseMap[componentCase as keyof typeof caseMap];

    return caseProps ? { ...baseProps, ...caseProps } : baseProps;
  }, [matchedComponentName, componentCase]);

  const _sfId = mergedProps && 'sfId' in mergedProps ? mergedProps.sfId : getId();

  const initialJsonData = useMemo(
    () => ({
      sfComponent: 'Page',
      sfId: getId(),
      props: {
        componentChildren: [
          {
            sfComponent: 'BlankLayout',
            sfId: getId(),
            props: {
              borderless: true,
              componentChildren: [
                {
                  sfComponent: `${matchedComponentName}`,
                  sfId: _sfId,
                  props: mergedProps,
                },
              ],
            },
          },
        ],
      },
    }),
    [matchedComponentName, _sfId, mergedProps],
  );

  const [jsonData, setJsonData] = useState<JsonData>(initialJsonData);

  useEffect(() => {
    setJsonData(initialJsonData);
  }, [initialJsonData]);

  const [readyToRender, setReadyToRender] = useState(false);
  //Three developers tried to find a better solution without finding one. This is the best solution at the moment.
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setReadyToRender(true);
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  if (!matchedComponentName) {
    return <div>Test: {componentName}</div>;
  }

  return (
    readyToRender && (
      <UiHandler>
        <AdapterbookLayout title={matchedComponentName} jsonData={jsonData} setJsonData={setJsonData}>
          <SmartFaceContainer adapterBook smartFaceComponents={[jsonData as SmartFaceComponentsType]} />
        </AdapterbookLayout>
      </UiHandler>
    )
  );
});

export default SmartFaceRenderer;
