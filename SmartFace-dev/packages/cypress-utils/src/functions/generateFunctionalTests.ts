type FunctionalTestsConfig<T> = {
  renderFn: (props: T) => void;
  singleTests?: {
    props: Partial<{ [K in keyof T]: T[K][] | T[K] }>;
    config?: {
      defaultProps?: Partial<T>;
      cb?: (testedPropValue: any) => void;
    };
  };
  combinationTests?: {
    defaultConfig?: {
      defaultProps?: Partial<T>;
      cb?: (props: Partial<T>) => void;
    };
    combinations: {
      props: Partial<{ [K in keyof T]: T[K][] | T[K] }>;
      config?: {
        defaultProps?: Partial<T>;
        cb?: (props: Partial<T>) => void;
      };
    }[];
  };
};

export const generateFunctionalTests = <T>(config: FunctionalTestsConfig<T>) => {
  const { renderFn, singleTests, combinationTests } = config;

  // --- SINGLE PROPS ---
  if (singleTests) {
    const { props, config: testConfig } = singleTests;
    const defaultProps = testConfig?.defaultProps || {};
    const cb = testConfig?.cb;

    Object.entries(props).forEach(([prop, values]) => {
      const propKey = prop as keyof T;

      describe(`${String(propKey)} options`, () => {
        (Array.isArray(values) ? values : [values]).forEach((value) => {
          it(`should correctly apply ${String(propKey)} (${String(value)})`, () => {
            renderFn({ ...defaultProps, [propKey]: value } as T);
            // Call the callback with the current value being tested
            cb?.(value);
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

      // Set callback fn
      const cb = combinationConfig?.cb || defaultConfig?.cb;

      // Generate combinations
      const generatePropCombinations = (
        currentProps: Partial<T>,
        remainingProps: [keyof T, T[keyof T][] | T[keyof T]][],
      ) => {
        if (remainingProps.length === 0) {
          const testName = Object.entries(currentProps)
            .map(([key, value]) => `${key}(${String(value)})`)
            .join(' & ');

          it(`should correctly apply ${testName}`, () => {
            const finalProps = { ...defaultProps, ...currentProps };
            renderFn(finalProps as T);
            cb?.(finalProps);
          });

          return;
        }

        const [[propName, propValues], ...restProps] = remainingProps;
        const valueArray = Array.isArray(propValues) ? propValues : [propValues];

        valueArray.forEach((value) => {
          generatePropCombinations({ ...currentProps, [propName]: value }, restProps);
        });
      };

      const propEntries = Object.entries(propValues) as [keyof T, T[keyof T][] | T[keyof T]][];

      describe(`tests ${Object.keys(propValues).join(' & ')}`, () => {
        generatePropCombinations({}, propEntries);
      });
    });
  }
};
