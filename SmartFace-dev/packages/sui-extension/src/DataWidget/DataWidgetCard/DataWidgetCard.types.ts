import type { DataWidgetProps } from '../DataWidget.types';

export type DataWidgetCardProps = {
  initialRender: boolean;
  onToggleValue: () => void;
} & Omit<DataWidgetProps, 'value'>;
