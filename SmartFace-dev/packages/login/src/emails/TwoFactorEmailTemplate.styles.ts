import { sqwTheme } from '@hrworks/design-system/theme/generatedThemes/sqwTheme';

export const emailStyles = {
  main: {
    backgroundColor: sqwTheme.sqwTier1.color.balticSea['10'],
    fontFamily: `${sqwTheme.sqwTier1.typography.fontFamily.inter}, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif`,
  },

  container: {
    backgroundColor: sqwTheme.sqwTier1.color.white,
    margin: '0 auto',
    padding: '20px 0 48px',
    marginBottom: '64px',
  },

  logoContainer: {
    padding: '32px 20px',
    textAlign: 'center' as const,
    borderBottom: `1px solid ${sqwTheme.sqwTier1.color.balticSea['20']}`,
  },

  h1: {
    color: sqwTheme.sqwTier1.color.indigo['70'],
    fontSize: `${sqwTheme.sqwTier1.typography.fontSize['30']}px`,
    fontWeight: sqwTheme.sqwTier1.typography.fontWeight.medium,
    margin: '0',
    textAlign: 'center' as const,
  },

  section: {
    padding: '24px 20px',
  },

  h2: {
    color: sqwTheme.sqwTier1.color.balticSea['90'],
    fontSize: `${sqwTheme.sqwTier1.typography.fontSize['22']}px`,
    fontWeight: sqwTheme.sqwTier1.typography.fontWeight.medium,
    margin: '0 0 16px',
    textAlign: 'center' as const,
  },

  text: {
    color: sqwTheme.sqwTier1.color.balticSea['80'],
    fontSize: `${sqwTheme.sqwTier1.typography.fontSize['16']}px`,
    lineHeight: `${sqwTheme.sqwTier1.typography.lineHeight['24']}px`,
    margin: '0 0 16px',
    textAlign: 'center' as const,
  },

  codeContainer: {
    backgroundColor: sqwTheme.sqwTier1.color.indigo['10'],
    border: `2px solid ${sqwTheme.sqwTier1.color.indigo['70']}`,
    borderRadius: '8px',
    margin: '24px 0',
    padding: '24px',
    textAlign: 'center' as const,
  },

  code: {
    color: sqwTheme.sqwTier1.color.indigo['80'],
    fontSize: '32px',
    fontWeight: sqwTheme.sqwTier1.typography.fontWeight.semibold,
    letterSpacing: '4px',
    margin: '0',
    textAlign: 'center' as const,
    fontFamily: 'Monaco, "Lucida Console", monospace',
  },

  footer: {
    borderTop: `1px solid ${sqwTheme.sqwTier1.color.balticSea['20']}`,
    padding: '20px',
    textAlign: 'center' as const,
  },

  footerText: {
    color: sqwTheme.sqwTier1.color.balticSea['50'],
    fontSize: `${sqwTheme.sqwTier1.typography.fontSize['12']}px`,
    lineHeight: `${sqwTheme.sqwTier1.typography.lineHeight['16']}px`,
    margin: '0',
    textAlign: 'center' as const,
  },
} as const;
