type ArrayOrSingle<T> = T | T[] | readonly T[];

type SingleTestConfig<T> = {
  props: Partial<{ [K in keyof T]: ArrayOrSingle<T[K]> }>;
  config?: {
    defaultProps?: Partial<T>;
    customScreenshotNames?: Partial<{ [K in keyof T]: string[] }>;
    screenshotDelay?: number;
    cb?: () => void;
  };
};

type CombinationTest<T> = {
  props: Partial<{ [K in keyof T]: ArrayOrSingle<T[K]> }>;
  config?: {
    defaultProps?: Partial<T>;
    customScreenshotNames?: Partial<{ [K in keyof T]: string[] }>;
    screenshotDelay?: number;
    cb?: () => void;
  };
};

type CombinationTestsConfig<T> = {
  defaultConfig?: {
    defaultProps?: Partial<T>;
    screenshotDelay?: number;
    cb?: () => void;
  };
  combinations: CombinationTest<T>[];
};

type VisualTestsConfig<T> = {
  renderFn: (props: T) => void;
  singleTests?: SingleTestConfig<T>;
  combinationTests?: CombinationTestsConfig<T>;
};

const truncateString = (str: string) => (str.length <= 20 ? str : str.slice(0, 20) + '...');

const sanitizeFilename = (str: string): string => {
  const sanitized = str.replaceAll(/<\/?([^>]+)>/g, (_match, fullTag) => {
    const sanitizedHtmlTag = fullTag
      .trim()
      .replaceAll(/[^\w-]/g, '_')
      .replaceAll(/_+/g, '_')
      .replaceAll(/^_+|_+$/g, '');

    return '_' + sanitizedHtmlTag + '_';
  });

  return (
    sanitized
      .replaceAll(/[\t\n\r]/g, ' ')
      .replaceAll(/["#()*/:<>?[\\\]{|}]/g, '_')
      .replaceAll(/\s+/g, ' ')
      .replaceAll(' ', '_')
      .replaceAll(/_+/g, '_')
      .replaceAll(/^_+|_+$/g, '') || 'empty'
  );
};

export const generateVisualTests = <T>(config: VisualTestsConfig<T>) => {
  const { renderFn, singleTests, combinationTests } = config;

  const generateScreenshotName = (
    prop: keyof T,
    value: T[keyof T],
    index: number,
    customScreenshotNames?: Partial<{ [K in keyof T]: string[] }>,
  ) => {
    const customName = customScreenshotNames?.[prop]?.[index];
    if (customName) return customName;
    if (Array.isArray(value) || (typeof value === 'object' && value !== null)) return index + 1;

    return sanitizeFilename(`${value}`);
  };

  // --- SINGLE PROPS ---
  if (singleTests) {
    const { props, config } = singleTests;
    const defaultProps = config?.defaultProps || {};
    const customScreenshotNames = config?.customScreenshotNames;
    const screenshotDelay = config?.screenshotDelay;
    const cb = config?.cb;

    const combinationProps = new Set<keyof T>();

    Object.entries(props).forEach(([prop, values]) => {
      const propKey = prop as keyof T;

      if (combinationProps.has(propKey)) return;

      describe(prop, () => {
        (Array.isArray(values) ? values : [values]).forEach((value, index) => {
          const screenshotName = generateScreenshotName(propKey, value, index, customScreenshotNames);
          it(`renders ${String(propKey)} (${screenshotName})`, () => {
            renderFn({ ...defaultProps, [propKey]: value } as T);
            cb?.();
            if (screenshotDelay) cy.wait(screenshotDelay);
            cy.matchImageSnapshotAndUpload(`${String(propKey)} (${truncateString(`${screenshotName}`)})`);
          });
        });
      });
    });
  }

  // --- COMBINATION PROPS ---
  if (combinationTests) {
    const { defaultConfig, combinations } = combinationTests;

    combinations.forEach((combination) => {
      const { props: propValues, config: combinationConfig = {} } = combination;

      // Merge configs
      const defaultProps = {
        ...defaultConfig?.defaultProps,
        ...combinationConfig?.defaultProps,
      };

      // Set delay
      const screenshotDelay =
        combinationConfig?.screenshotDelay === undefined
          ? defaultConfig?.screenshotDelay
          : combinationConfig.screenshotDelay || 0;

      // Set callback fn
      const cb = combinationConfig?.cb || defaultConfig?.cb;

      // Generate combinations
      const generatePropCombinations = (
        currentProps: Partial<T>,
        remainingProps: [keyof T, ArrayOrSingle<T[keyof T]>][],
        indices: Record<keyof T, number>,
        customScreenshotNames?: Partial<{ [K in keyof T]: string[] }>,
      ) => {
        if (remainingProps.length === 0) {
          const screenshotName = Object.entries(currentProps)
            .map(([key, value]) => {
              const typedKey = key as keyof T;
              const typedValue = value as T[typeof typedKey];

              return `${key}(${truncateString(
                generateScreenshotName(typedKey, typedValue, indices[typedKey], customScreenshotNames) + '',
              )})`;
            })
            .join(' & ');

          it(`renders ${screenshotName}`, () => {
            renderFn({ ...defaultProps, ...currentProps } as T);
            cb?.();
            if (screenshotDelay) cy.wait(screenshotDelay);
            cy.matchImageSnapshotAndUpload(screenshotName);
          });

          return;
        }

        const [[propName, propValues], ...restProps] = remainingProps;
        const valueArray = Array.isArray(propValues) ? propValues : [propValues];

        valueArray.forEach((value, idx) => {
          generatePropCombinations(
            { ...currentProps, [propName]: value },
            restProps,
            { ...indices, [propName]: idx },
            customScreenshotNames,
          );
        });
      };

      const propEntries = Object.entries(propValues) as [keyof T, ArrayOrSingle<T[keyof T]>][];
      // Convert propValues for recursion from obj to arr of arr
      // If propValues is:
      // {
      //   closeable: [true, false],
      //   color: ['primary', 'secondary', 'info']
      // }
      // propEntries becomes:
      // [
      //   ['closeable', [true, false]],
      //   ['color', ['primary', 'secondary', 'info']]
      // ]

      describe(`renders ${Object.keys(propValues).join(' & ')}`, () => {
        generatePropCombinations(
          {},
          propEntries,
          {} as Record<keyof T, number>,
          combinationConfig?.customScreenshotNames,
        );
      });
    });
  }
};
