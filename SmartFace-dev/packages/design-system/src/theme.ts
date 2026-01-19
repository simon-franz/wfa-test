import { deprecated_colorPalette } from './deprecated_colorPalette';
import { sqwTheme } from './theme/generatedThemes/sqwTheme';

export const defaultTheme = {
  ...sqwTheme,
  marko: {
    colors: {
      focus: deprecated_colorPalette.primary[7],
      hover: deprecated_colorPalette.info[1],
      active: deprecated_colorPalette.info[2],
      text: deprecated_colorPalette.primary[8],
      textSecondary: deprecated_colorPalette.neutral[6],
      icon: deprecated_colorPalette.neutral[5],
      variant: {
        primary: {
          color: deprecated_colorPalette.primary[7],
          hover: deprecated_colorPalette.primary[6],
          active: deprecated_colorPalette.primary[8],
          text: deprecated_colorPalette.neutral[1],
        },
        secondary: {
          color: deprecated_colorPalette.neutral[2],
          hover: deprecated_colorPalette.neutral[3],
          active: deprecated_colorPalette.neutral[4],
          text: deprecated_colorPalette.primary[8],
        },
        success: {
          color: deprecated_colorPalette.success[7],
          hover: deprecated_colorPalette.success[6],
          active: deprecated_colorPalette.success[8],
          text: deprecated_colorPalette.neutral[1],
        },
        info: {
          color: deprecated_colorPalette.info[7],
          hover: deprecated_colorPalette.info[6],
          active: deprecated_colorPalette.info[8],
          text: deprecated_colorPalette.neutral[1],
        },
        warning: {
          color: deprecated_colorPalette.warning[7],
          hover: deprecated_colorPalette.warning[6],
          active: deprecated_colorPalette.warning[8],
          text: deprecated_colorPalette.neutral[1],
        },
        danger: {
          color: deprecated_colorPalette.danger[7],
          hover: deprecated_colorPalette.danger[6],
          active: deprecated_colorPalette.danger[8],
          text: deprecated_colorPalette.neutral[1],
        },
      },
      indexes: {
        normal: 7,
        hover: 6,
        active: 8,
      },
      palette: {
        ...deprecated_colorPalette,
      },
    },
    typography: {
      fontFamilyText: 'Open Sans, Arial, sans-serif',
      fontFamilyTitle: 'Roboto, Arial, sans-serif',
      fontWeights: {
        textLight: 300,
        text: 400,
        title: 500,
      },
      sqwFontSizes: {
        extraSmall: '0.766rem',
        small: '0.8125rem',
        medium: sqwTheme.sqwTier2Typography.labelMdSemibold.fontSize,
        large: '1rem',
        extraLarge: '1.1rem',
      },
      fontSizes: {
        extraSmall: '0.75rem',
        small: '0.875rem',
        medium: '1rem',
        large: '1.125rem',
        extraLarge: '1.25rem',
      },
      multiplier: {
        title: 1.3,
        subtitle: 0.85,
        // maybe in future for e.g. helptext? if not used, remove in future
        subtext: 0.8,
      },
    },
    variables: {
      animationDuration: {
        normal: '0.15s',
        long: '0.3s',
        extraLong: '1s',
      },
      borderRadius: {
        extraSmall: 4,
        small: 8,
        medium: 12,
        large: 16,
        extraLarge: 20,
      },
      breakpoints: {
        xs: 0,
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
      },
      opacity: {
        disabled: 0.5,
        low: 0.25,
        medium: 0.5,
        high: 0.75,
        hex: {
          100: '',
          75: 'bf',
          50: '80',
          25: '40',
          0: '00',
          disabled: '80',
        },
      },
      spacing: {
        formGap: {
          extraSmall: '6px',
          small: '8px',
          medium: '10px',
          large: '12px',
          extraLarge: '14px',
        },
        distance: {
          extraSmall: 4,
          small: 8,
          medium: 12,
          large: 16,
          extraLarge: 20,
        },
      },
      zIndex: {
        header: 1000,
        sidebar: 1010,
        modal: 1020,
        popover: 1030,
        notifications: 1040,
        blockUi: 1050,
      },
    },
    presets: {
      border: { default: `1px solid ${deprecated_colorPalette.neutral[3]}` },
      boxShadow: {
        default: `0 0 7px  ${deprecated_colorPalette.neutral[10] + 40}`,
        light: `0 0 3px  ${deprecated_colorPalette.neutral[10] + 28}`,
      },
    },
    hrworksUser: {
      colors: {
        brand: '#eff2ff',
        brandActive: '#e0e7fd',
        hover: '#cedaff',
        active: '#b6c7fe',
        text: '#292673',
        textSecondary: '#888888',
        textHover: '#0e3e68',
        brandInfo: '#1e70b8',
        brandRest: '#403e82',
      },
      typography: { fontFamily: 'Nunito' },
      presets: {
        boxShadow: { default: '0 1px 4px rgba(55,56,60,.25)' },
      },
    },
  },
} as const;
