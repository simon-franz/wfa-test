// TODO Check if eslint rules can be enforced
// eslint-disable-next-line unicorn/prefer-string-replace-all, unicorn/better-regex
export const escapeRegex = (string: string) => string.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');
