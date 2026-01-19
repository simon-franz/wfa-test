import Image from '@hrworks/sui-core/Image';
import type { Meta, StoryObj } from '@storybook/react';

import { Carousel } from './Carousel';
import { CarouselItem } from './CarouselItem/CarouselItem';

const images = [
  { id: 1, src: 'https://picsum.photos/1600/900?random=1', alt: 'Slide Image 1' },
  { id: 3, src: 'https://picsum.photos/800/400?random=3', alt: 'Slide Image 3' },
  { id: 4, src: 'https://picsum.photos/800/400?random=4', alt: 'Slide Image 4' },
  { id: 5, src: 'https://picsum.photos/800/400?random=5', alt: 'Slide Image 5' },
  { id: 6, src: 'https://picsum.photos/800/400?random=6', alt: 'Slide Image 6' },
  { id: 7, src: 'https://picsum.photos/800/400?random=7', alt: 'Slide Image 7' },
  { id: 8, src: 'https://picsum.photos/800/400?random=8', alt: 'Slide Image 8' },
];
const meta = {
  title: 'Components/Extension/Carousel',
  component: Carousel,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: {
    loop: true,
  },
} satisfies Meta<typeof Carousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        {images.map((image) => (
          <CarouselItem key={image.id}>
            <Image src={image.src} alt={image.alt} />
          </CarouselItem>
        ))}
      </>
    ),
  },
};
