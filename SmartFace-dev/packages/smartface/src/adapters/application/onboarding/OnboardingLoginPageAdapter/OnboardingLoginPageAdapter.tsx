import { OnboardingLoginPage } from '@hrworks/sui-extension/OnboardingLoginPage';
import { observer } from 'mobx-react';

import { mapSmartFaceComponentsToAdapters } from '../../../../main/components/ComponentMapper';
import type { OnboardingLoginPageAdapterProps } from './OnboardingLoginPageAdapter.types';

export const OnboardingLoginPageAdapter = observer(
  ({ componentChildren, ...otherProps }: OnboardingLoginPageAdapterProps) => {
    const children = mapSmartFaceComponentsToAdapters(componentChildren);

    return <OnboardingLoginPage children={children} {...otherProps} />;
  },
);
