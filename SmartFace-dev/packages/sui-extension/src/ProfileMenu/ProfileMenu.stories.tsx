import type { ProfileMenuUiPropsType } from '@hrworks/smartface/types/extension/ProfileMenuType';
import Image from '@hrworks/sui-core/Image';
import type { Meta, StoryObj } from '@storybook/react';

import { ProfileMenu } from './ProfileMenu';

const meta = {
  title: 'Components/Navigation/ProfileMenu',
  component: ProfileMenu,
  tags: ['autodocs'],
  render: function Component(args: ProfileMenuUiPropsType) {
    return (
      <div style={{ width: '100%', height: '100vh', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
        <ProfileMenu {...args} />
      </div>
    );
  },
} satisfies Meta<typeof ProfileMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

const PROFILE_MENU_PROPS: ProfileMenuUiPropsType = {
  title: 'Alexander Kiefer',
  subtitle: 'alexander.kiefer@hrworks.de',
  trigger: <Image src="https://placedog.net/200/200" id="test" alt="Decoration" corner="circular" />,
  portrait: <Image src="https://placedog.net/200/200" id="test" alt="Decoration" corner="circular" />,
  children: 'Body Children',
  headerChildren: '',
  placement: 'bottom-end',
};

export const Default: Story = {
  args: PROFILE_MENU_PROPS,
};
