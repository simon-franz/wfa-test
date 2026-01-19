import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';

import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Inputs/Textarea',
  component: Textarea,
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    label: 'Default Textarea',
    placeholder: 'Never Gonna Give You Up',
  },
};

export const Controlled: Story = {
  args: {
    label: 'Controlled Textarea',
    value: 'Controlled value',
    onValueChange: (value) => console.log(value),
  },
};

export const Uncontrolled = () => {
  const ref = useRef<HTMLTextAreaElement | null>(null);
  const [displayValue, setDisplayValue] = useState('');

  const handleSubmit = () => {
    const currentValue = ref.current?.value || '';
    setDisplayValue(currentValue);
  };

  return (
    <>
      <Textarea ref={ref} name="textarea" placeholder="This should be uncontrolled" label="Uncontrolled Textarea" />
      <button onClick={handleSubmit}>Submit</button>
      {displayValue && (
        <div>
          <strong>Submitted Value:</strong> {displayValue}
        </div>
      )}
    </>
  );
};

export const GrowsWithContent: Story = {
  args: {
    label: 'Textarea that grows with the content',
    placeholder: 'Type a lot to see it grow.',
    growsWithContent: true,
  },
};

export const HelpText: Story = {
  args: {
    label: 'Textarea with Help Text',
    helpText: 'This is some helpful information',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Textarea',
    disabled: true,
    value: 'This textarea is disabled',
  },
};

export const ReadOnly: Story = {
  args: {
    label: 'Read-only Textarea',
    readOnly: true,
    value: 'This textarea is read-only',
  },
};

export const ValidationState: Story = {
  args: {
    label: 'Textarea with Validation',
    validationState: 'danger',
    validationMessage: 'This field is required',
  },
};

export const CustomSize: Story = {
  args: {
    label: 'Custom Size Textarea',
    size: 'large',
  },
};

export const ResizableTextarea: Story = {
  args: {
    label: 'Resizable Textarea',
    resize: 'both',
    placeholder: 'This textarea can be resized in both directions ↕️⬅️➡️',
  },
};

export const CustomRows: Story = {
  args: {
    label: 'Textarea with Custom Rows',
    rows: 10,
    placeholder: 'This textarea has 10 rows',
  },
};

export const SpellCheck: Story = {
  args: {
    label: 'Textarea with Spell Check',
    spellCheck: true,
    placeholder: 'Spell checking is enabled for this textarea',
  },
};
