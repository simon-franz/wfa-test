import type { Meta, StoryObj } from '@storybook/react';
import type { MouseEvent } from 'react';

import { Breadcrumb } from './Breadcrumb';
import type { BreadcrumbProps } from './Breadcrumb.types';
import { BreadcrumbItem } from './BreadcrumbItem/BreadcrumbItem';

const meta = {
  title: 'Components/Navigation/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof Breadcrumb>;

export default meta;

type Story = StoryObj<typeof meta>;

const link = '/';

const onBreadcrumbItemClick = (event: MouseEvent<HTMLAnchorElement>) => {
  event.preventDefault();
  console.log(event);
};

const BREADCRUMB_PROPS: BreadcrumbProps = {
  children: (
    <>
      <BreadcrumbItem>text Crumb</BreadcrumbItem>
      <BreadcrumbItem href={link} target="_blank">
        href Crumb
      </BreadcrumbItem>
      <BreadcrumbItem onClick={onBreadcrumbItemClick}>onClick Crumb</BreadcrumbItem>
      <BreadcrumbItem onClick={onBreadcrumbItemClick} href={link}>
        onClick & href Crumb
      </BreadcrumbItem>
    </>
  ),
};

const SingleProps: BreadcrumbProps = {
  children: (
    <BreadcrumbItem href={link} target="_blank">
      href Crumb
    </BreadcrumbItem>
  ),
};

const ManyProps: BreadcrumbProps = {
  children: (
    <>
      <BreadcrumbItem href={link} target="_blank">
        Alpha
      </BreadcrumbItem>
      <BreadcrumbItem href={link} target="_blank">
        Beta
      </BreadcrumbItem>
      <BreadcrumbItem href={link} target="_blank">
        Gamma
      </BreadcrumbItem>
      <BreadcrumbItem href={link} target="_blank">
        Delta
      </BreadcrumbItem>
      <BreadcrumbItem href={link} target="_blank">
        Epsilon
      </BreadcrumbItem>
      <BreadcrumbItem href={link} target="_blank">
        Zeta
      </BreadcrumbItem>
      <BreadcrumbItem href={link} target="_blank">
        Eta
      </BreadcrumbItem>
      <BreadcrumbItem href={link} target="_blank">
        Theta
      </BreadcrumbItem>
      <BreadcrumbItem href={link} target="_blank">
        Iota
      </BreadcrumbItem>
      <BreadcrumbItem href={link} target="_blank">
        Kappa
      </BreadcrumbItem>
      <BreadcrumbItem href={link} target="_blank">
        Lambda
      </BreadcrumbItem>
      <BreadcrumbItem href={link} target="_blank">
        Mu
      </BreadcrumbItem>
      <BreadcrumbItem href={link} target="_blank">
        Nu
      </BreadcrumbItem>
      <BreadcrumbItem href={link} target="_blank">
        Xi
      </BreadcrumbItem>
      <BreadcrumbItem href={link} target="_blank">
        Omicron
      </BreadcrumbItem>
      <BreadcrumbItem href={link} target="_blank">
        Pi
      </BreadcrumbItem>
      <BreadcrumbItem href={link} target="_blank">
        Rho
      </BreadcrumbItem>
      <BreadcrumbItem href={link} target="_blank">
        Sigma
      </BreadcrumbItem>
      <BreadcrumbItem href={link} target="_blank">
        Tau
      </BreadcrumbItem>
      <BreadcrumbItem href={link} target="_blank">
        Upsilon
      </BreadcrumbItem>
      <BreadcrumbItem href={link} target="_blank">
        Phi
      </BreadcrumbItem>
      <BreadcrumbItem href={link} target="_blank">
        Chi
      </BreadcrumbItem>
      <BreadcrumbItem href={link} target="_blank">
        Psi
      </BreadcrumbItem>
      <BreadcrumbItem href={link} target="_blank">
        Omega
      </BreadcrumbItem>
    </>
  ),
};

export const Default: Story = {
  args: BREADCRUMB_PROPS,
};

export const SingleCrumb: Story = {
  args: SingleProps,
};

export const ManyCrumb: Story = {
  args: ManyProps,
};

export const UnderlineCrumb: Story = {
  args: {
    children: (
      <>
        <BreadcrumbItem href={link} target="_blank" underline={true}>
          First Underlined Crumb
        </BreadcrumbItem>
        <BreadcrumbItem href={link} underline={true}>
          Second Underlined Crumb
        </BreadcrumbItem>
        <BreadcrumbItem onClick={onBreadcrumbItemClick} underline={true}>
          Third Underlined Crumb
        </BreadcrumbItem>
        <BreadcrumbItem underline={true}>Last Underlined Crumb</BreadcrumbItem>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb items with underline prop enabled.',
      },
    },
  },
};
