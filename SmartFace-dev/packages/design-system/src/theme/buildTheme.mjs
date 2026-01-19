import { fileURLToPath } from 'bun';
import fs from 'node:fs';
import path from 'node:path';

const PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const THEME_BASE_PATH = path.normalize('src/theme/');
const TOKENS_FOLDER_PATH = path.join(THEME_BASE_PATH, 'tokens');
const GENERATED_THEMES_FOLDER_PATH = path.join(THEME_BASE_PATH, 'generatedThemes');
const TOKEN_FILE_PATTERN = /^(.+)\.json$/;

// Configuration object for different token systems
const TOKEN_SYSTEM_CONFIG = {
  // Current SQW token system configuration
  sqw: {
    // Detection patterns for this token system
    detection: {
      patterns: ['sqwTier1', 'sqwTier2Typography', 'sqwTier2Color'],
      priority: 1,
    },

    // Path patterns for detecting specific token types
    pathPatterns: {
      fontSize: (path) => path.length >= 3 && path.at(-3) === 'typography' && path.at(-2) === 'fontSize',
      lineHeight: (path) => path.length >= 3 && path.at(-3) === 'typography' && path.at(-2) === 'lineHeight',
      tier2Typography: (path) => path.includes('sqwTier2Typography'),
      color: (path) => path.includes('color'),
    },

    // Value transformation rules
    transformations: {
      fontSize: {
        condition: (value) => typeof value === 'number',
        transform: (value, config) => {
          const baseSize = config.typography?.baseFontSize || 16;

          return `${(value / baseSize).toFixed(3).replace(/\.?0+$/, '')}rem`;
        },
      },
      lineHeight: {
        condition: (value) => typeof value === 'number',
        transform: (value, config) => {
          const baseSize = config.typography?.baseFontSize || 16;

          return Number((value / baseSize).toFixed(3));
        },
      },
      tier2LineHeight: {
        condition: (value, context) => {
          return context?.isInTier2Typography && context?.hasTypographyProps && context?.key === 'lineHeight';
        },
        transform: (value, config, context) => {
          const { resolveReference, tokens, obj } = context;

          // Resolve fontSize and lineHeight references
          const fontSizeValue = resolveReference(obj.fontSize, tokens);
          const lineHeightValue = resolveReference(value, tokens);

          let fontSize = null;
          let lineHeight = null;

          // Handle fontSize (could be rem string or number)
          if (typeof fontSizeValue === 'string' && fontSizeValue.endsWith('rem')) {
            fontSize = Number.parseFloat(fontSizeValue) * (config.typography?.baseFontSize || 16);
          } else if (typeof fontSizeValue === 'number') {
            fontSize = fontSizeValue;
          }

          // Handle lineHeight (scale factor from tier1 processing)
          if (typeof lineHeightValue === 'number') {
            lineHeight = lineHeightValue * (config.typography?.baseFontSize || 16);
          }

          if (fontSize && lineHeight) {
            return Number((lineHeight / fontSize).toFixed(3));
          }

          return value;
        },
      },
    },

    // Token reference patterns
    references: {
      pattern: /{([^}]+)}/,
      pathSeparator: '.',
    },

    // CSS generation settings
    css: {
      variablePrefix: '',
      excludeFromCSS: ['sqwTier2Color'],
      colorModesKey: 'sqwTier2Color',
      darkModeDetection: (key) => key.toLowerCase().includes('dark'),
      modeKeyTransformation: {
        hrwDarkMode: 'dark',
        hrwLightMode: 'light',
      },
    },

    // Typography-specific settings
    typography: {
      baseFontSize: 16,
      tier2Key: 'sqwTier2Typography',
    },
  },
};

// Auto-detect token system based on structure
const detectTokenSystem = (tokens) => {
  const systems = Object.entries(TOKEN_SYSTEM_CONFIG).sort(
    ([, a], [, b]) => (b.detection.priority || 0) - (a.detection.priority || 0),
  );

  for (const [systemName, config] of systems) {
    const hasPatterns = config.detection.patterns.some((pattern) =>
      typeof pattern === 'string' ? tokens[pattern] : pattern(tokens),
    );

    if (hasPatterns) {
      return systemName;
    }
  }

  return Object.keys(TOKEN_SYSTEM_CONFIG)[0];
};

const convertReferencesToCamelCase = (tokens) => {
  const kebabToCamelCase = (str) => {
    return str.replaceAll(/-([a-z])/g, (g) => g[1].toUpperCase());
  };

  const convertValue = (value) => {
    if (typeof value === 'string') {
      return value.replaceAll(/{([^}]+)}/g, (match, path) => {
        const camelCasePath = path
          .split('.')
          .map((element) => kebabToCamelCase(element))
          .join('.');

        return `{${camelCasePath}}`;
      });
    }

    return value;
  };

  const convertObject = (obj) => {
    const converted = {};
    for (const [key, value] of Object.entries(obj)) {
      const newKey = kebabToCamelCase(key);
      converted[newKey] = typeof value === 'object' && value !== null ? convertObject(value) : convertValue(value);
    }

    return converted;
  };

  return convertObject(tokens);
};

// Process hex colors to remove 'ff' suffix when it represents 100% opacity
const processHexColors = (tokens) => {
  const hexColorRegex = /^#([\dA-Fa-f]{6})([\dA-Fa-f]{2})$/;

  const processValue = (value) => {
    if (typeof value === 'string' && value.startsWith('#')) {
      const match = value.match(hexColorRegex);
      if (match && match[2].toLowerCase() === 'ff') {
        return `#${match[1]}`;
      }
    }

    return value;
  };

  const processObject = (obj) => {
    const processed = {};
    for (const [key, value] of Object.entries(obj)) {
      processed[key] = typeof value === 'object' && value !== null ? processObject(value) : processValue(value);
    }

    return processed;
  };

  return processObject(tokens);
};

const checkIfFileExists = (filePath) => {
  if (!fs.existsSync(filePath)) {
    console.error(`Token file not found: ${filePath}`);
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1);
  }
};

const readJsonFile = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf8'));

const writeFile = (filePath, content) => fs.writeFileSync(filePath, content);

const tryConvertToNumber = (value) => {
  const numericValue = Number(value);

  return Number.isNaN(numericValue) ? value : numericValue;
};

const transformJsonToJs = (tokens, parentPath = [], config) =>
  Object.fromEntries(
    Object.entries(tokens).map(([key, value]) => {
      const currentPath = [...parentPath, key];

      if (value.value === undefined) {
        return [key, transformJsonToJs(value, currentPath, config)];
      }

      const convertedValue = tryConvertToNumber(value.value);

      // Apply transformations based on configuration
      for (const [transformType, transformation] of Object.entries(config.transformations)) {
        const patternMatch = config.pathPatterns[transformType]?.(currentPath);
        const conditionMatch = transformation.condition(convertedValue);

        if (patternMatch && conditionMatch) {
          return [key, transformation.transform(convertedValue, config)];
        }
      }

      return [key, convertedValue];
    }),
  );

const convertReferencesToCSSVariables = (tokens) => {
  const convertTokenPathToCSSVariable = (path) => {
    // Convert path like "sqwTier1.color.chili.30" to "--sqw-tier1-color-chili-30"
    const kebabPath = path
      .split('.')
      .map((part) => part.replaceAll(/([A-Z])/g, '-$1').toLowerCase())
      .join('-');

    return `var(--${kebabPath})`;
  };

  const convertValue = (value) => {
    if (typeof value !== 'string' || !value.includes('{')) return value;

    return value.replaceAll(/{([^}]+)}/g, (match, path) => {
      return convertTokenPathToCSSVariable(path);
    });
  };

  const convertObject = (obj) =>
    Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        key,
        typeof value === 'object' && value !== null ? convertObject(value) : convertValue(value),
      ]),
    );

  return convertObject(tokens);
};

// The export plugin adds the mode as parent-key to the values but not to the path of the var
// before: tier2.typography.caption.fontFamily -> fixed: tier2.lightmode.typography.caption.fontFamily
const fixReferences = (tokens) => {
  // Function to find all modes in tier2
  const findModes = (obj) => {
    if (obj && typeof obj === 'object' && 'tier2' in obj) {
      return Object.keys(obj.tier2).filter((key) => typeof obj.tier2[key] === 'object');
    }

    return [];
  };

  const modes = findModes(tokens);

  const findCorrectPath = (path, currentMode) => {
    const parts = path.split('.');
    if (parts[0] === 'tier2' && !modes.includes(parts[1])) {
      parts.splice(1, 0, currentMode);
    }

    return parts.join('.');
  };

  const fixValue = (value, currentObject, currentMode) => {
    if (typeof value !== 'string' || !value.includes('{')) return value;

    return value.replaceAll(/{([^}]+)}/g, (match, path) => {
      const correctedPath = findCorrectPath(path, currentMode);

      return `{${correctedPath}}`;
    });
  };

  const fixObject = (obj, currentMode = null) => {
    const fixed = {};
    for (const [key, value] of Object.entries(obj)) {
      if (modes.includes(key)) {
        fixed[key] = fixObject(value, key);
      } else if (typeof value === 'object' && value !== null) {
        fixed[key] = fixObject(value, currentMode);
      } else {
        fixed[key] = fixValue(value, obj, currentMode);
      }
    }

    return fixed;
  };

  return fixObject(tokens);
};

// Convert typography values: fontSize to rem and lineHeight to scale factor
const convertTypographyUnits = (tokens, config) => {
  // Helper to resolve token references using config
  const resolveTokenReference = (value, tokens) => {
    if (typeof value !== 'string' || !config.references.pattern.test(value)) {
      return value;
    }

    // Extract the token path using the configured pattern
    const match = value.match(config.references.pattern);
    if (!match) return value;

    const tokenPath = match[1];
    const pathParts = tokenPath.split(config.references.pathSeparator);

    // Navigate through the tokens object to find the actual value
    let current = tokens;
    for (const part of pathParts) {
      if (current && typeof current === 'object' && part in current) {
        current = current[part];
      } else {
        return value; // Return original if we can't resolve
      }
    }

    return current;
  };

  const processObject = (obj, tokens, currentPath = []) => {
    const result = {};

    for (const [key, value] of Object.entries(obj)) {
      const newPath = [...currentPath, key];

      if (typeof value === 'object' && value !== null) {
        result[key] = processObject(value, tokens, newPath);
      } else {
        // Check if we should apply tier2 typography transformation
        const isInTier2Typography = config.pathPatterns.tier2Typography?.(currentPath);
        const hasTypographyProps = 'fontSize' in obj && 'lineHeight' in obj;

        // Create context for transformation
        const context = {
          isInTier2Typography,
          hasTypographyProps,
          key,
          resolveReference: resolveTokenReference,
          tokens,
          obj,
        };

        // Check if tier2LineHeight transformation should be applied
        const tier2Transform = config.transformations.tier2LineHeight;
        result[key] =
          tier2Transform && tier2Transform.condition(value, context)
            ? tier2Transform.transform(value, config, context)
            : value;
      }
    }

    return result;
  };

  return processObject(tokens, tokens);
};

const ensureDirectoryExists = (dirPath) => {
  const fullPath = path.join(PROJECT_ROOT, dirPath);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`Created directory: ${fullPath}`);
  }
};

// Convert camelCase to kebab-case for CSS
const camelToKebab = (str) => {
  return str.replaceAll(/([A-Z])/g, '-$1').toLowerCase();
};

// Flatten object hierarchy to CSS variable declarations
const flattenObjectToCSSVariables = (obj, prefix = '', currentPath = []) => {
  const variables = [];

  Object.entries(obj).forEach(([key, value]) => {
    const newPath = [...currentPath, camelToKebab(key)];

    if (typeof value === 'object' && value !== null) {
      variables.push(...flattenObjectToCSSVariables(value, prefix, newPath));
    } else {
      const cssVarName = `--${prefix}${newPath.join('-')}`;
      variables.push({ name: cssVarName, value });
    }
  });

  return variables;
};

// Generate CSS content for theme modes

const generateModeCSS = (modeKey, modeObject, prefix = '', isDarkMode = false, config) => {
  const variables = flattenObjectToCSSVariables(modeObject, prefix);

  // Transform mode key if mapping exists
  const transformedModeKey = config?.css?.modeKeyTransformation?.[modeKey] || modeKey;

  let css = '';

  // Regular class selector

  css += `[data-theme="${transformedModeKey}"] {\n`;
  if (isDarkMode) {
    css += '  color-scheme: dark;\n';
  }
  variables.forEach(({ name, value }) => {
    css += `  ${name}: ${value};\n`;
  });
  css += '}\n\n';

  // Add media query for dark mode
  if (isDarkMode) {
    css += '@media (prefers-color-scheme: dark) {\n';
    css += '  [data-theme="system"] {\n';
    css += '    color-scheme: dark;\n';
    variables.forEach(({ name, value }) => {
      css += `    ${name}: ${value};\n`;
    });
    css += '  }\n';
    css += '}\n\n';
  }

  return css;
};

// Flatten sqwTier2Color structure and replace with CSS variable names
const flattenSqwTier2Color = (sqwTier2ColorObject, fileNameWithoutExt) => {
  // Take the first mode as the structure template (usually light mode)
  const modes = Object.keys(sqwTier2ColorObject);
  if (modes.length === 0) return {};

  const firstMode = sqwTier2ColorObject[modes[0]];

  // Recursively build the structure maintaining hierarchy but replacing leaf values with CSS variables
  const buildStructureWithCSSVars = (obj, currentPath = []) => {
    const result = {};

    Object.entries(obj).forEach(([key, value]) => {
      const kebabKey = camelToKebab(key);
      const newPath = [...currentPath, kebabKey];

      if (typeof value === 'object' && value !== null) {
        // Recursively handle nested objects - keep the original camelCase key
        result[key] = buildStructureWithCSSVars(value, newPath);
      } else {
        // Create the CSS variable name for this leaf value
        const cssVarName = `--${fileNameWithoutExt}-tier2-color-${newPath.join('-')}`;
        // Wrap in var() for proper CSS variable usage
        result[key] = `var(${cssVarName})`;
      }
    });

    return result;
  };

  return buildStructureWithCSSVars(firstMode);
};

// Extract root variables (tier1, typography, etc.) that should be CSS variables
const extractRootCSSVariables = (themeObject, config) => {
  const rootVariables = [];

  Object.entries(themeObject).forEach(([key, value]) => {
    // Skip configured exclusions (e.g., color modes)
    if (config.css.excludeFromCSS.includes(key)) return;

    // Include everything else as CSS variables
    if (typeof value === 'object' && value !== null) {
      const variables = flattenObjectToCSSVariables(value, config.css.variablePrefix, [camelToKebab(key)]);
      rootVariables.push(...variables);
    }
  });

  return rootVariables;
};

// Generate CSS file from theme object
const generateCSSFromTheme = (themeFilePath, fileNameWithoutExt, config) => {
  // Import the generated theme file
  const themeContent = fs.readFileSync(themeFilePath, 'utf8');

  // Extract the theme object (simple regex approach)
  const themeMatch = themeContent.match(/export const \w+Theme = ({[\S\s]*});?$/);
  if (!themeMatch) {
    console.warn(`Could not parse theme object from ${themeFilePath}`);

    return null;
  }

  let themeObject;
  try {
    // Use eval to parse the theme object (in build context, this is acceptable)
    themeObject = eval(`(${themeMatch[1]})`);
  } catch (error) {
    console.warn(`Could not evaluate theme object from ${themeFilePath}:`, error.message);

    return null;
  }

  // Check if color modes exist using config
  const colorModesKey = config.css.colorModesKey;
  if (!themeObject[colorModesKey] || typeof themeObject[colorModesKey] !== 'object') {
    console.warn(`No ${colorModesKey} found in theme object`);

    return null;
  }

  // Extract root CSS variables (tier1, typography, etc.)
  const rootVariables = extractRootCSSVariables(themeObject, config);

  // Find light and dark modes
  const modes = Object.keys(themeObject[colorModesKey]);
  const lightMode = modes.find((mode) => !config.css.darkModeDetection(mode));
  const darkModes = modes.filter((mode) => config.css.darkModeDetection(mode));

  let combinedCSS = '';

  // Start with root variables including light mode colors as defaults
  combinedCSS += ':root {\n';

  // Add tier1, typography, etc. variables
  rootVariables.forEach(({ name, value }) => {
    combinedCSS += `  ${name}: ${value};\n`;
  });

  // Add light mode color variables as defaults in :root
  if (lightMode) {
    const lightModeVariables = flattenObjectToCSSVariables(
      themeObject[colorModesKey][lightMode],
      `${fileNameWithoutExt}-tier2-color-`,
    );
    lightModeVariables.forEach(({ name, value }) => {
      combinedCSS += `  ${name}: ${value};\n`;
    });
  }

  combinedCSS += '}\n\n';

  // Generate CSS for dark modes
  darkModes.forEach((modeKey) => {
    const modeObject = themeObject[colorModesKey][modeKey];
    if (typeof modeObject === 'object' && modeObject !== null) {
      const modeCSS = generateModeCSS(modeKey, modeObject, `${fileNameWithoutExt}-tier2-color-`, true, config);
      combinedCSS += modeCSS;
    }
  });

  // Write CSS file
  const cssFileName = `${fileNameWithoutExt}Variables.css`;
  const cssFilePath = path.join(PROJECT_ROOT, GENERATED_THEMES_FOLDER_PATH, cssFileName);

  writeFile(cssFilePath, combinedCSS.trim());
  console.log(`Done creating CSS modes file: ${cssFileName}`);

  // Return the flattened color modes for theme modification
  return flattenSqwTier2Color(themeObject[colorModesKey], fileNameWithoutExt);
};

const generateThemeForFile = (tokenFilePath) => {
  const fileName = path.basename(tokenFilePath);
  const fileNameWithoutExt = path.basename(fileName, '.json');
  const outputFileName = `${fileNameWithoutExt}Theme.ts`;
  const outputFilePath = path.join(PROJECT_ROOT, GENERATED_THEMES_FOLDER_PATH, outputFileName);

  const themeName = `${fileNameWithoutExt}Theme`;

  checkIfFileExists(tokenFilePath);

  const rawTokens = readJsonFile(tokenFilePath);

  // Detect token system and get configuration
  const tokenSystemType = detectTokenSystem(rawTokens);
  const config = TOKEN_SYSTEM_CONFIG[tokenSystemType];

  console.log(`Processing ${fileNameWithoutExt} using ${tokenSystemType} token system`);

  const jsTokens = transformJsonToJs(rawTokens, [], config);
  const camelCaseTokens = convertReferencesToCamelCase(jsTokens);
  const fixedReferences = fixReferences(camelCaseTokens);
  // Apply typography unit conversions BEFORE CSS variable conversion
  const typographyProcessed = convertTypographyUnits(fixedReferences, config);
  const resolvedTheme = convertReferencesToCSSVariables(typographyProcessed);
  const processedColors = processHexColors(resolvedTheme);
  const accessibleTheme = processedColors;

  // Convert the theme object to a string representation with proper formatting
  let themeString = JSON.stringify(accessibleTheme, null, 2);

  // Restore hyphens in keys that look like numeric ranges (e.g. "7030" -> "70-30")
  themeString = themeString.replaceAll(/"(\d{2,})(\d{2})":/g, '"$1-$2":');

  const themeFileContent = `export const ${themeName} = ${themeString}`;

  writeFile(outputFilePath, themeFileContent);
  console.log(`Done creating theme: ${outputFileName}`);

  // Generate CSS file from the created theme and get flattened structure
  const flattenedSqwTier2Color = generateCSSFromTheme(outputFilePath, fileNameWithoutExt, config);

  if (flattenedSqwTier2Color) {
    // Update the theme with flattened sqwTier2Color
    const updatedTheme = {
      ...accessibleTheme,
      sqwTier2Color: flattenedSqwTier2Color,
    };

    // Convert the updated theme object to string
    let updatedThemeString = JSON.stringify(updatedTheme, null, 2);
    updatedThemeString = updatedThemeString.replaceAll(/"(\d{2,})(\d{2})":/g, '"$1-$2":');

    const updatedThemeFileContent = `export const ${themeName} = ${updatedThemeString}`;

    // Overwrite the theme file with flattened structure
    writeFile(outputFilePath, updatedThemeFileContent);
    console.log(`Updated theme with flattened sqwTier2Color: ${outputFileName}`);
  }
};

const buildTheme = () => {
  // Ensure the required directories exist
  ensureDirectoryExists(TOKENS_FOLDER_PATH);
  ensureDirectoryExists(GENERATED_THEMES_FOLDER_PATH);

  const tokensDir = path.join(PROJECT_ROOT, TOKENS_FOLDER_PATH);

  // Check if tokens directory exists
  if (!fs.existsSync(tokensDir)) {
    console.error(`Tokens directory not found: ${tokensDir}`);
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1);
  }

  // Read all files in the tokens directory
  const files = fs.readdirSync(tokensDir);

  // Filter json files that match the pattern
  const tokenFiles = files.filter((file) => TOKEN_FILE_PATTERN.test(file) && file.endsWith('.json'));

  if (tokenFiles.length === 0) {
    console.error('No JSON files found in tokens directory!');

    return;
  }

  // Process each token file
  for (const tokenFile of tokenFiles) {
    const tokenFilePath = path.join(tokensDir, tokenFile);
    generateThemeForFile(tokenFilePath);
  }

  console.log(`Done creating ${tokenFiles.length} themes!`);
};

buildTheme();
