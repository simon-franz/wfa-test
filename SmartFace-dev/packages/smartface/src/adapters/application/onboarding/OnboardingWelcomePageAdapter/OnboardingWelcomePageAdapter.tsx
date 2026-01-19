import { OnboardingWelcomePage } from '@hrworks/sui-extension/OnboardingWelcomePage';
import { observer } from 'mobx-react';

import { mapSmartFaceComponentsToAdapters } from '../../../../main/components/ComponentMapper';
import type { OnboardingWelcomePageAdapterProps } from './OnboardingWelcomePageAdapter.types';

export const OnboardingWelcomePageAdapter = observer(
  ({ footerChildren, bodyChildren, ...otherProps }: OnboardingWelcomePageAdapterProps) => {
    const _footerChildren = mapSmartFaceComponentsToAdapters(footerChildren);
    const children = mapSmartFaceComponentsToAdapters(bodyChildren);

    return <OnboardingWelcomePage footerChildren={_footerChildren} children={children} {...otherProps} />;
  },
);
