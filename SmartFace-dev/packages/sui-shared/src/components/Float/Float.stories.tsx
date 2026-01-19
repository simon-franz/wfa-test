import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

import { Float, type FloatPropsType } from './Float';

export default {
  title: 'Components/Utils/Float',
  component: Float,
} as Meta<typeof Float>;

const defaultContent = (
  <div
    style={{
      padding: '20px',
      height: '150px',
      backgroundColor: 'paleturquoise',
      whiteSpace: 'nowrap',
      display: 'flex',
      alignItems: 'center',
    }}
  >
    Content
  </div>
);

const arrows = {
  top: (
    <div
      style={{
        borderLeft: '5px solid transparent',
        borderRight: '5px solid transparent',
        borderTop: '7px solid paleturquoise',
      }}
    />
  ),
  bottom: (
    <div
      style={{
        borderLeft: '5px solid transparent',
        borderRight: '5px solid transparent',
        borderBottom: '7px solid paleturquoise',
      }}
    />
  ),
  left: (
    <div
      style={{
        borderTop: '5px solid transparent',
        borderBottom: '5px solid transparent',
        borderLeft: '7px solid paleturquoise',
      }}
    />
  ),
  right: (
    <div
      style={{
        borderTop: '5px solid transparent',
        borderBottom: '5px solid transparent',
        borderRight: '7px solid paleturquoise',
      }}
    />
  ),
};

const FLOAT_PROPS: Omit<FloatPropsType, 'children'> = {
  flip: false,
  placement: 'left',
  show: true,
};

function getChildrenFunction(text: string, content = defaultContent) {
  return ({ anchorRef, floatRef, getFloatStyles, arrowRef, getArrowStyles, placement }: any) => {
    const basePlacement = placement.split('-')[0] as keyof typeof arrows;

    return (
      <div style={{ position: 'relative' }}>
        <div
          ref={anchorRef}
          style={{
            width: '80%',
            height: '120px',
            padding: '10px',
            backgroundColor: 'lightyellow',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {text}
        </div>
        <div ref={floatRef} style={getFloatStyles()}>
          <div ref={arrowRef} style={getArrowStyles()}>
            {arrows[basePlacement]}
          </div>
          {content}
        </div>
      </div>
    );
  };
}

const ScrollTemplate: StoryFn<typeof Float> = (args: FloatPropsType) => (
  <>
    <style
      dangerouslySetInnerHTML={{
        __html:
          '#root { background-color: green; } body { display: flex !important; padding: 0 !important; height: 250vh; }',
      }}
    />
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        height: '100%',
        margin: '24px auto',
        backgroundColor: 'lightseagreen',
        flexGrow: 1,
      }}
    >
      <Float {...args} />
    </div>
  </>
);

const placements = [
  'top-start',
  'top',
  'top-end',
  'right-start',
  'right',
  'right-end',
  'bottom-end',
  'bottom',
  'bottom-start',
  'left-end',
  'left',
  'left-start',
];

const PlacementTemplate: StoryFn<typeof Float> = (args: any) => {
  const [placementCounter, setPlacementCounter] = useState<number>(0);
  const [, updateArgs] = useArgs();

  const onClick = () => {
    updateArgs({ placement: placements[placementCounter] });
    setPlacementCounter((placementCounter + 1) % placements.length);
  };

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore Storybook doesn't work anyway
    <ScrollTemplate {...args}>
      {({ anchorRef, floatRef, getFloatStyles, arrowRef, getArrowStyles, placement }) => {
        const basePlacement = placement.split('-')[0] as keyof typeof arrows;

        return (
          <div style={{ position: 'relative' }}>
            <button ref={anchorRef} style={{ width: '50vw', height: '40vh' }} onClick={onClick}>
              {args.placement}
            </button>
            <div ref={floatRef} style={getFloatStyles()}>
              <div ref={arrowRef} style={getArrowStyles()}>
                {arrows[basePlacement]}
              </div>
              {defaultContent}
            </div>
          </div>
        );
      }}
    </ScrollTemplate>
  );
};

const PlacementBreakpointsProps: FloatPropsType = {
  ...FLOAT_PROPS,
  children: getChildrenFunction(
    'Changes the placement of the content, based on the specified breakpoints. Resize this window to see the effect.',
  ),
  placement: { 1500: 'top', 1350: 'bottom', 1100: 'left', 900: 'right', 500: 'top-start', 0: 'top-end' },
};

const OffsetProps: FloatPropsType = {
  ...FLOAT_PROPS,
  children: getChildrenFunction(
    'Increase or decrease the offset, to change the distance between the content and the anchored element.',
  ),
  offset: 120,
};

const ArrowProps: FloatPropsType = {
  ...FLOAT_PROPS,

  children: getChildrenFunction('Dynamically positions an arrow element that is center-aware.'),
  shift: true,
  offset: 7,
  arrow: true,
  arrowOffset: 30,
};

const ShiftProps: FloatPropsType = {
  ...FLOAT_PROPS,
  children: getChildrenFunction('Moves the floating element along the axes in order to keep it in view.'),
  shift: true,
};

const ShiftOffsetProps: FloatPropsType = {
  ...FLOAT_PROPS,
  children: getChildrenFunction(
    'Limits how far the content can move out of the viewport. A positive number will start limiting earlier, while negative later.',
  ),
  shiftOffset: 70,
  shift: true,
};

const FlipProps: FloatPropsType = {
  ...FLOAT_PROPS,
  children: getChildrenFunction(
    'Changes the placement of the floating element to the opposite one by default in order to keep it in view.',
  ),
  flip: true,
  placement: 'bottom',
};

const FlipOffsetProps: FloatPropsType = {
  ...FLOAT_PROPS,
  children: getChildrenFunction(
    'Changes the offset, when the content should flip. A positive number will make it flip earlier, while negative later.',
  ),
  flipOffset: 100,
  flip: true,
  placement: 'bottom',
};

const PlacementsProps: Omit<FloatPropsType, 'children'> = {
  ...FLOAT_PROPS,
};

export const Placements = {
  render: PlacementTemplate,
  args: PlacementsProps,
};

export const PlacementBreakpoints = {
  render: ScrollTemplate,
  args: PlacementBreakpointsProps,
};

export const Offset = {
  render: ScrollTemplate,
  args: OffsetProps,
};

export const Arrow = {
  render: ScrollTemplate,
  args: ArrowProps,
};

export const Shift = {
  render: ScrollTemplate,
  args: ShiftProps,
};

export const ShiftOffset = {
  render: ScrollTemplate,
  args: ShiftOffsetProps,
};

export const Flip = {
  render: ScrollTemplate,
  args: FlipProps,
};

export const FlipOffset = {
  render: ScrollTemplate,
  args: FlipOffsetProps,
};

const ScrollProps: FloatPropsType = {
  ...FLOAT_PROPS,
  children: getChildrenFunction(
    'If the float content is to big the content of the Float can scroll',
    <ul
      style={{
        padding: '20px',
        backgroundColor: 'paleturquoise',
        overflow: 'auto',
      }}
    >
      {Array.from({ length: 2000 }).map((_, index) => (
        <li key={index}>{index + 1}. Item</li>
      ))}
    </ul>,
  ),
  flip: true,
  scroll: true,
  scrollOffset: 12,
  placement: 'top',
};

export const Scroll = {
  render: ScrollTemplate,
  args: ScrollProps,
};
