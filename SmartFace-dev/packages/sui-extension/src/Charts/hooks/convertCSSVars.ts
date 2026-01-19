export const convertThemeColor = (themeValue: string): string => {
  if (!themeValue || !themeValue.startsWith('var(')) {
    return themeValue;
  }

  const propertyName = themeValue.replace('var(', '').replace(')', '');
  const computedValue = getComputedStyle(document.documentElement).getPropertyValue(propertyName).trim();

  if (computedValue && computedValue.startsWith('var(')) {
    return convertThemeColor(computedValue);
  }

  return computedValue || themeValue;
};

const convertThemeValue = (themeValue: string | number): string | number => {
  if (typeof themeValue !== 'string' || !themeValue.startsWith('var(')) {
    return themeValue;
  }

  const propertyName = themeValue.replace('var(', '').replace(')', '');
  const computedValue = getComputedStyle(document.documentElement).getPropertyValue(propertyName).trim();

  if (computedValue && computedValue.startsWith('var(')) {
    return convertThemeValue(computedValue);
  }

  return computedValue || themeValue;
};

export const convertTypography = (typography: any) => {
  // TODO: Add better font-loading logic
  const resolved = {
    fontSize: `${convertThemeValue(typography.fontSize)}`,
    fontWeight: `${convertThemeValue(typography.fontWeight)}`,
    fontFamily: `${convertThemeValue(typography.fontFamily)}`,
    lineHeight: typography.lineHeight,
  };
  if (resolved.fontFamily === 'Inter') {
    resolved.fontFamily = 'Inter, system-ui, -apple-system';
  }

  return resolved;
};
