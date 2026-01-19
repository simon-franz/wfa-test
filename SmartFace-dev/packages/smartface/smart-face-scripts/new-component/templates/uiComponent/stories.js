export default ({ componentName, applicationName }) =>
  `import ${componentName} from '@hrworks/sui-${applicationName.normalizedSubpath}/${componentName}';
  import type { Meta, StoryObj } from '@storybook/react';


const meta: Meta<typeof ${componentName}> = {
  title: '${componentName}',
  component: ${componentName},
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    // Write default props here
  },
};

export default meta;

type Story = StoryObj<typeof ${componentName}>;

export const Default: Story = {};

export const Custom: Story = {
  args: {
    // Write custom props here
  },
};
`;
