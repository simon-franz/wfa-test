type Transparency =
  | `${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}%`
  | `${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}%`;

export const withOpacity = (color: string, transparency: Transparency) =>
  `color-mix(in srgb, ${color} ${transparency}, transparent)`;
