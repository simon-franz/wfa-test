export const replacePlaceholder = (str: string, placeholder: Record<string, string | number>) => {
  const regex = new RegExp(Object.keys(placeholder).join('|'), 'gi');

  return str.replace(regex, (match) => '' + placeholder[match] || 'N/A');
};
