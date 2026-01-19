import { S } from './ProgressCircular.styles';
import type { ProgressCircularProps } from './ProgressCircular.types';

const viewHeight = 100;
const viewBox = `0 0 ${viewHeight} ${viewHeight}`;
const strokeWidth = 0.1 * viewHeight;
const radius = viewHeight / 2;
const normalizedRadius = radius - strokeWidth / 2;
const circumference = normalizedRadius * 2 * Math.PI;

export const ProgressCircular = ({ progress = 100, color = 'primary', ...otherProps }: ProgressCircularProps) => {
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <S.Container color={color} viewBox={viewBox} {...otherProps}>
      <S.Track
        style={{ strokeDashoffset }}
        strokeWidth={strokeWidth}
        strokeDasharray="0"
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <S.Fill
        $color={color}
        style={{ strokeDashoffset }}
        strokeWidth={strokeWidth}
        strokeDasharray={`${circumference} ${circumference}`}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemax={100}
      />
    </S.Container>
  );
};
