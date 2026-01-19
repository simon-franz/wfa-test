import Hero, { HeroTitle } from '@hrworks/sui-core/Hero/';
import { Content, HrworksUserWhatsNew, PreviousNews, Spotlight } from '@hrworks/sui-extension/HrworksUserWhatsNew';
import { observer } from 'mobx-react';

import { ComponentMapper, mapSmartFaceComponentsToAdapters } from '../../../../main/components/ComponentMapper';
import { mapSmartFaceComponentPartsToAdapter } from '../../../../main/components/ComponentMapper/mapSmartFaceComponentPartsToAdapters';
import type { HrworksUserWhatsNewAdapterProps } from './HrworksUserWhatsNewAdapter.types';
import { S } from './HrworksWhatsNewAdapter.styles';
import { PreviousNewsItemAdapter } from './PreviousNewsItemAdapter';

export const HrworksUserWhatsNewAdapter = observer(
  ({ content = {}, hero = {}, ...otherProps }: HrworksUserWhatsNewAdapterProps) => {
    const { spotlight = {}, previousNewsItems } = content;
    const { statusBadge, componentChildren, ...otherSpotlightProps } = spotlight;
    const { adminSwitch, src, title, ...otherHeroProps } = hero;

    const _statusBadge = statusBadge && <ComponentMapper smartFaceComponent={statusBadge} />;
    const heroChildren = adminSwitch && <ComponentMapper smartFaceComponent={adminSwitch} />;
    const spotlightChildren = mapSmartFaceComponentsToAdapters(componentChildren);
    const previousNewsChildren = mapSmartFaceComponentPartsToAdapter(PreviousNewsItemAdapter, previousNewsItems);

    return (
      <HrworksUserWhatsNew {...otherProps}>
        <Hero src={src} {...otherHeroProps}>
          <HeroTitle {...otherHeroProps}>{title}</HeroTitle>
          <S.ChildrenWrapper>{heroChildren}</S.ChildrenWrapper>
        </Hero>
        <Content>
          <Spotlight statusBadge={_statusBadge} children={spotlightChildren} {...otherSpotlightProps} />
          <PreviousNews children={previousNewsChildren} />
        </Content>
      </HrworksUserWhatsNew>
    );
  },
);
