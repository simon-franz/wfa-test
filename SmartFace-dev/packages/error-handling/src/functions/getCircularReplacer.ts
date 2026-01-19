// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value
export function getCircularReplacer(): (this: unknown, key: string, value: unknown) => unknown {
  const ancestors: unknown[] = [];

  return function (_key: unknown, value: unknown): unknown {
    if (typeof value !== 'object' || value == null) {
      return value;
    }
    // `this` is the object that value is contained in, i.e., its direct parent.
    while (ancestors.length > 0 && ancestors.at(-1) !== this) {
      ancestors.pop();
    }
    if (ancestors.includes(value)) {
      return '[Circular]';
    }
    ancestors.push(value);

    return value;
  };
}
