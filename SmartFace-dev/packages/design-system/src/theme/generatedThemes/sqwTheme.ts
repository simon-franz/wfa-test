export const sqwTheme = {
  sqwTier2Typography: {
    headingLg: {
      fontWeight: 'var(--sqw-tier1-typography-font-weight-regular)',
      fontSize: 'var(--sqw-tier1-typography-font-size-22)',
      fontFamily: 'var(--sqw-tier1-typography-font-family-inter)',
      lineHeight: 1.273,
    },
    bodySm: {
      lineHeight: 1.333,
      fontFamily: 'var(--sqw-tier1-typography-font-family-inter)',
      fontWeight: 'var(--sqw-tier1-typography-font-weight-regular)',
      fontSize: 'var(--sqw-tier1-typography-font-size-12)',
    },
    bodyMd: {
      lineHeight: 1.429,
      fontSize: 'var(--sqw-tier1-typography-font-size-14)',
      fontWeight: 'var(--sqw-tier1-typography-font-weight-regular)',
      fontFamily: 'var(--sqw-tier1-typography-font-family-inter)',
    },
    labelSmSemibold: {
      fontWeight: 'var(--sqw-tier1-typography-font-weight-semibold)',
      lineHeight: 1.333,
      fontFamily: 'var(--sqw-tier1-typography-font-family-inter)',
      fontSize: 'var(--sqw-tier1-typography-font-size-12)',
    },
    labelMdSemibold: {
      fontFamily: 'var(--sqw-tier1-typography-font-family-inter)',
      fontWeight: 'var(--sqw-tier1-typography-font-weight-semibold)',
      fontSize: 'var(--sqw-tier1-typography-font-size-14)',
      lineHeight: 1.429,
    },
    title: {
      fontSize: 'var(--sqw-tier1-typography-font-size-30)',
      lineHeight: 1.333,
      fontWeight: 'var(--sqw-tier1-typography-font-weight-medium)',
      fontFamily: 'var(--sqw-tier1-typography-font-family-inter)',
    },
    labelMd: {
      lineHeight: 1.429,
      fontWeight: 'var(--sqw-tier1-typography-font-weight-medium)',
      fontFamily: 'var(--sqw-tier1-typography-font-family-inter)',
      fontSize: 'var(--sqw-tier1-typography-font-size-14)',
    },
    headingMdSemibold: {
      lineHeight: 1.5,
      fontFamily: 'var(--sqw-tier1-typography-font-family-inter)',
      fontWeight: 'var(--sqw-tier1-typography-font-weight-semibold)',
      fontSize: 'var(--sqw-tier1-typography-font-size-16)',
    },
    headingMd: {
      fontFamily: 'var(--sqw-tier1-typography-font-family-inter)',
      fontSize: 'var(--sqw-tier1-typography-font-size-16)',
      fontWeight: 'var(--sqw-tier1-typography-font-weight-medium)',
      lineHeight: 1.5,
    },
    navHeader: {
      fontFamily: 'var(--sqw-tier1-typography-font-family-inter)',
      fontWeight: 'var(--sqw-tier1-typography-font-weight-medium)',
      fontSize: 'var(--sqw-tier1-typography-font-size-12)',
      lineHeight: 1.333,
    },
    link: {
      fontFamily: 'var(--sqw-tier1-typography-font-family-inter)',
      fontWeight: 'var(--sqw-tier1-typography-font-weight-regular)',
      fontSize: 'var(--sqw-tier1-typography-font-size-14)',
      lineHeight: 1.429,
    },
    display: {
      fontFamily: 'var(--sqw-tier1-typography-font-family-inter)',
      fontWeight: 'var(--sqw-tier1-typography-font-weight-medium)',
      fontSize: 'var(--sqw-tier1-typography-font-size-44)',
      lineHeight: 1.227,
    },
  },
  sqwTier1: {
    color: {
      focusBlue: {
        '10': '#3890e9',
        '20': '#0071e3',
      },
      infoBlue: {
        '10': '#dfe1ff',
        '20': '#c1c5f8',
        '30': '#5e64af',
        '40': '#292673',
        '50': '#20195a',
      },
      seaweed: {
        '10': '#d3e5d3',
        '20': '#7fb483',
        '30': '#198337',
        '40': '#005a11',
        '50': '#003300',
      },
      mango: {
        '10': '#ffe1ba',
        '20': '#ffc476',
        '30': '#ffa829',
        '40': '#b06700',
        '50': '#692b00',
      },
      chili: {
        '10': '#ffceca',
        '20': '#f8877e',
        '30': '#d92020',
        '40': '#a70000',
        '50': '#701010',
      },
      transparency: {
        '0': '#ffffff00',
        balticSea: {
          '70-30': '#59595f4d',
          '80-50': '#3d3c4280',
          '100-50': '#1e1d2180',
        },
      },
      indigo: {
        '10': '#eff0ff',
        '20': '#dfe1ff',
        '30': '#c1c5f8',
        '40': '#9ba1e1',
        '50': '#7c82c8',
        '60': '#5e64af',
        '70': '#424798',
        '80': '#292673',
        '90': '#20195a',
        '100': '#160e3f',
      },
      balticSea: {
        '10': '#f5f6f8',
        '20': '#ecedf2',
        '30': '#cfd0d5',
        '40': '#acadb2',
        '50': '#8b8c91',
        '60': '#717278',
        '70': '#59595f',
        '80': '#3d3c42',
        '90': '#2c2b31',
        '100': '#1e1d21',
      },
      black: '#000000',
      white: '#ffffff',
    },
    typography: {
      fontSize: {
        '12': '0.75rem',
        '14': '0.875rem',
        '16': '1rem',
        '22': '1.375rem',
        '30': '1.875rem',
        '44': '2.75rem',
      },
      fontWeight: {
        semibold: 600,
        regular: 400,
        medium: 500,
      },
      lineHeight: {
        '16': 1,
        '20': 1.25,
        '24': 1.5,
        '28': 1.75,
        '40': 2.5,
        '54': 3.375,
      },
      fontFamily: {
        inter: 'Inter',
      },
    },
  },
  sqwTier2Color: {
    background: {
      nav: {
        default: 'var(--sqw-tier2-color-background-nav-default)',
        selected: 'var(--sqw-tier2-color-background-nav-selected)',
        hovered: 'var(--sqw-tier2-color-background-nav-hovered)',
      },
      error: {
        bold: {
          pressed: 'var(--sqw-tier2-color-background-error-bold-pressed)',
          default: 'var(--sqw-tier2-color-background-error-bold-default)',
          hovered: 'var(--sqw-tier2-color-background-error-bold-hovered)',
        },
        subtle: 'var(--sqw-tier2-color-background-error-subtle)',
      },
      input: 'var(--sqw-tier2-color-background-input)',
      neutral: {
        subtlest: {
          default: 'var(--sqw-tier2-color-background-neutral-subtlest-default)',
          hovered: 'var(--sqw-tier2-color-background-neutral-subtlest-hovered)',
          selected: 'var(--sqw-tier2-color-background-neutral-subtlest-selected)',
        },
        subtle: {
          hovered: 'var(--sqw-tier2-color-background-neutral-subtle-hovered)',
          default: 'var(--sqw-tier2-color-background-neutral-subtle-default)',
          selected: 'var(--sqw-tier2-color-background-neutral-subtle-selected)',
        },
        bold: 'var(--sqw-tier2-color-background-neutral-bold)',
      },
      success: {
        bold: {
          default: 'var(--sqw-tier2-color-background-success-bold-default)',
          hovered: 'var(--sqw-tier2-color-background-success-bold-hovered)',
          pressed: 'var(--sqw-tier2-color-background-success-bold-pressed)',
        },
        subtle: 'var(--sqw-tier2-color-background-success-subtle)',
      },
      disabled: {
        default: 'var(--sqw-tier2-color-background-disabled-default)',
        subtle: 'var(--sqw-tier2-color-background-disabled-subtle)',
      },
      brand: {
        bold: {
          default: 'var(--sqw-tier2-color-background-brand-bold-default)',
          hovered: 'var(--sqw-tier2-color-background-brand-bold-hovered)',
          pressed: 'var(--sqw-tier2-color-background-brand-bold-pressed)',
        },
        subtle: {
          default: 'var(--sqw-tier2-color-background-brand-subtle-default)',
          pressed: 'var(--sqw-tier2-color-background-brand-subtle-pressed)',
          hovered: 'var(--sqw-tier2-color-background-brand-subtle-hovered)',
        },
      },
      info: {
        bold: {
          default: 'var(--sqw-tier2-color-background-info-bold-default)',
          hovered: 'var(--sqw-tier2-color-background-info-bold-hovered)',
          pressed: 'var(--sqw-tier2-color-background-info-bold-pressed)',
        },
        subtle: 'var(--sqw-tier2-color-background-info-subtle)',
      },
      warning: {
        subtle: 'var(--sqw-tier2-color-background-warning-subtle)',
        bold: {
          default: 'var(--sqw-tier2-color-background-warning-bold-default)',
          hovered: 'var(--sqw-tier2-color-background-warning-bold-hovered)',
          pressed: 'var(--sqw-tier2-color-background-warning-bold-pressed)',
        },
      },
    },
    text: {
      brand: {
        default: 'var(--sqw-tier2-color-text-brand-default)',
        visited: 'var(--sqw-tier2-color-text-brand-visited)',
        hovered: 'var(--sqw-tier2-color-text-brand-hovered)',
        pressed: 'var(--sqw-tier2-color-text-brand-pressed)',
      },
      selected: 'var(--sqw-tier2-color-text-selected)',
      inverse: 'var(--sqw-tier2-color-text-inverse)',
      warningInverse: 'var(--sqw-tier2-color-text-warning-inverse)',
      info: {
        onSubtle: 'var(--sqw-tier2-color-text-info-on-subtle)',
        default: 'var(--sqw-tier2-color-text-info-default)',
      },
      subtle: 'var(--sqw-tier2-color-text-subtle)',
      disabled: 'var(--sqw-tier2-color-text-disabled)',
      warning: {
        onSubtle: 'var(--sqw-tier2-color-text-warning-on-subtle)',
        default: 'var(--sqw-tier2-color-text-warning-default)',
      },
      subtlest: 'var(--sqw-tier2-color-text-subtlest)',
      error: {
        onSubtle: 'var(--sqw-tier2-color-text-error-on-subtle)',
        default: 'var(--sqw-tier2-color-text-error-default)',
      },
      success: {
        default: 'var(--sqw-tier2-color-text-success-default)',
        onSubtle: 'var(--sqw-tier2-color-text-success-on-subtle)',
      },
      default: 'var(--sqw-tier2-color-text-default)',
    },
    surface: {
      sunken: 'var(--sqw-tier2-color-surface-sunken)',
      elevation: {
        shadow: 'var(--sqw-tier2-color-surface-elevation-shadow)',
        blanket: 'var(--sqw-tier2-color-surface-elevation-blanket)',
      },
      raised: 'var(--sqw-tier2-color-surface-raised)',
      structure: 'var(--sqw-tier2-color-surface-structure)',
    },
    border: {
      brand: {
        hovered: 'var(--sqw-tier2-color-border-brand-hovered)',
        default: 'var(--sqw-tier2-color-border-brand-default)',
        pressed: 'var(--sqw-tier2-color-border-brand-pressed)',
      },
      disabled: 'var(--sqw-tier2-color-border-disabled)',
      warning: 'var(--sqw-tier2-color-border-warning)',
      bold: 'var(--sqw-tier2-color-border-bold)',
      subtle: 'var(--sqw-tier2-color-border-subtle)',
      input: 'var(--sqw-tier2-color-border-input)',
      error: 'var(--sqw-tier2-color-border-error)',
      info: 'var(--sqw-tier2-color-border-info)',
      focus: 'var(--sqw-tier2-color-border-focus)',
      selected: 'var(--sqw-tier2-color-border-selected)',
      success: 'var(--sqw-tier2-color-border-success)',
      nav: {
        bold: 'var(--sqw-tier2-color-border-nav-bold)',
        subtle: 'var(--sqw-tier2-color-border-nav-subtle)',
      },
    },
    skeleton: {
      shimmer: 'var(--sqw-tier2-color-skeleton-shimmer)',
      default: 'var(--sqw-tier2-color-skeleton-default)',
    },
    icon: {
      default: 'var(--sqw-tier2-color-icon-default)',
      subtle: 'var(--sqw-tier2-color-icon-subtle)',
      subtlest: 'var(--sqw-tier2-color-icon-subtlest)',
      inverse: 'var(--sqw-tier2-color-icon-inverse)',
      warningInverse: 'var(--sqw-tier2-color-icon-warning-inverse)',
      selected: 'var(--sqw-tier2-color-icon-selected)',
      brand: {
        default: 'var(--sqw-tier2-color-icon-brand-default)',
        hovered: 'var(--sqw-tier2-color-icon-brand-hovered)',
        pressed: 'var(--sqw-tier2-color-icon-brand-pressed)',
        visited: 'var(--sqw-tier2-color-icon-brand-visited)',
      },
      disabled: 'var(--sqw-tier2-color-icon-disabled)',
      error: {
        default: 'var(--sqw-tier2-color-icon-error-default)',
        onSubtle: 'var(--sqw-tier2-color-icon-error-on-subtle)',
      },
      warning: {
        default: 'var(--sqw-tier2-color-icon-warning-default)',
        onSubtle: 'var(--sqw-tier2-color-icon-warning-on-subtle)',
      },
      success: {
        default: 'var(--sqw-tier2-color-icon-success-default)',
        onSubtle: 'var(--sqw-tier2-color-icon-success-on-subtle)',
      },
      info: {
        default: 'var(--sqw-tier2-color-icon-info-default)',
        onSubtle: 'var(--sqw-tier2-color-icon-info-on-subtle)',
      },
    },
  },
};
