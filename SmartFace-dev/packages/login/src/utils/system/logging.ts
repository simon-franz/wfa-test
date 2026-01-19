import type { LogColor, LogColors, LogSectionOptions } from '../../types/logging.types';

// TODO: Move logging functionality into a utility package for other packages (like cypress) to use

const textColors: LogColors = {
  reset: '\u001B[0m',
  bright: '\u001B[1m',
  dim: '\u001B[2m',
  red: '\u001B[31m',
  green: '\u001B[32m',
  yellow: '\u001B[33m',
  blue: '\u001B[34m',
  magenta: '\u001B[35m',
  cyan: '\u001B[36m',
  white: '\u001B[37m',
  black: '\u001B[30m',
  orange: '\u001B[38;5;208m',
};

const bgColors: LogColors = {
  reset: '',
  bright: '',
  dim: '',
  red: '\u001B[41m',
  green: '\u001B[42m',
  yellow: '\u001B[43m',
  blue: '\u001B[44m',
  magenta: '\u001B[45m',
  cyan: '\u001B[46m',
  white: '\u001B[47m',
  black: '\u001B[40m',
  orange: '\u001B[48;5;208m',
};

export const colors = textColors;

export const createLogSection = (title: string, content?: string, options: LogSectionOptions = {}): void => {
  const { dividerChar = '=', dividerLength = 50, color = 'bright', bgColor } = options;

  const divider = dividerChar.repeat(dividerLength);
  const colorCode = colors[color] || '';
  const bgColorCode = bgColor ? bgColors[bgColor] : '';
  const resetCode = colors.reset;
  const paddedTitle = title.padEnd(dividerLength, ' ');

  const output = `
${colorCode}${bgColorCode}${divider}${resetCode}
${colorCode}${bgColorCode}${paddedTitle}${resetCode}
${colorCode}${bgColorCode}${divider}${resetCode}${content ? `\n${content}` : ''}`;

  console.log(output);
};

export const logDivider = (
  dividerChar = '=',
  dividerLength = 50,
  color: LogColor = 'bright',
  bgColor?: LogColor,
): void => {
  const divider = dividerChar.repeat(dividerLength);
  const colorCode = colors[color] || '';
  const bgColorCode = bgColor ? bgColors[bgColor] : '';
  const resetCode = colors.reset;

  console.log(`${colorCode}${bgColorCode}${divider}${resetCode}`);
};

const sanitizeLogData = (data: Record<string, unknown>): Record<string, unknown> => {
  if (!data || typeof data !== 'object') {
    return data;
  }

  const sanitized = { ...data };

  const sensitiveFields = ['code', 'storedCode', 'password', 'token', 'secret'];
  sensitiveFields.forEach((field) => {
    if (field in sanitized) {
      delete sanitized[field];
    }
  });

  if (process.env.NEXT_PUBLIC_REALM !== 'local' && sanitized.email && typeof sanitized.email === 'string') {
    const email = sanitized.email;
    const [local, domain] = email.split('@');
    sanitized.email = `${local.charAt(0)}***@${domain}`;
  }

  return sanitized;
};

export const logSecurely = (message: string, data?: Record<string, unknown>): void => {
  const timestamp = new Date().toISOString();

  if (process.env.NEXT_PUBLIC_REALM === 'local') {
    console.log(`[${timestamp}] ${message}`, data || '');
  } else {
    const sanitizedData = data ? sanitizeLogData(data) : undefined;
    console.log(`[${timestamp}] ${message}`, sanitizedData || '');
  }
};

export const logVerificationCode = (email: string, code: string, companyName?: string): void => {
  if (process.env.NEXT_PUBLIC_REALM !== 'local') {
    return;
  }

  const content = [
    `${colors.cyan}Email:${colors.reset} ${email}`,
    `${colors.yellow}Code:${colors.reset} ${code}`,
    `${colors.blue}Company:${colors.reset} ${companyName || 'Not specified'}`,
    `${colors.dim}Expires:${colors.reset} 10 minutes`,
  ].join('\n');

  createLogSection('2FA VERIFICATION CODE', content, {
    color: 'white',
    bgColor: 'green',
  });
  console.log('\n');
};

export const logError = (message: string, error: Error, context?: Record<string, unknown>): void => {
  const timestamp = new Date().toISOString();
  const sanitizedContext = context ? sanitizeLogData(context) : undefined;

  console.error(`[${timestamp}] ERROR: ${message}`, {
    error: error.message,
    stack: process.env.NEXT_PUBLIC_REALM === 'local' ? error.stack : undefined,
    context: sanitizedContext,
  });
};

export const logRateLimit = (type: 'generation' | 'verification', identifier: string, blocked: boolean): void => {
  const timestamp = new Date().toISOString();
  const sanitizedIdentifier =
    process.env.NEXT_PUBLIC_REALM === 'local' ? identifier.replace(/(.{2}).*(.{2})/, '$1***$2') : identifier;

  logSecurely(`Rate limit ${blocked ? 'BLOCKED' : 'checked'}`, {
    type,
    identifier: sanitizedIdentifier,
    blocked,
    timestamp,
  });
};

export const highlightCommand = (text: string): string => `${colors.yellow}${text}${colors.reset}`;
export const highlightURL = (text: string): string => `${colors.green}${text}${colors.reset}`;
