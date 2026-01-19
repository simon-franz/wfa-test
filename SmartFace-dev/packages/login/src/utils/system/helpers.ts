import { spawnSync } from 'bun';

import type {
  ActiveChildrenSet,
  ActiveProgressIndicatorsSet,
  CommandResult,
  CustomShutdownHandler,
  ProgressCleanupFunction,
  ProgressFrames,
  RunCommandOptions,
  SignalHandler,
} from '../../types/helpers.types';

export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

let globalSignalHandlersSetup = false;
let isShuttingDown = false;
const activeChildren: ActiveChildrenSet = new Set();
const activeProgressIndicators: ActiveProgressIndicatorsSet = new Set();

const setupGlobalSignalHandlers = (customHandler?: CustomShutdownHandler) => {
  if (globalSignalHandlersSetup) return;

  globalSignalHandlersSetup = true;

  const handleSignal: SignalHandler = async () => {
    if (isShuttingDown) return;

    setShuttingDown(true);

    activeProgressIndicators.forEach((cleanup) => cleanup());
    activeProgressIndicators.clear();
    process.stdout.write('\r\u001B[2K');
    process.stdout.write('\r');

    let hasError = false;

    if (customHandler) {
      try {
        await customHandler();
      } catch (error) {
        console.error(`Shutdown handler failed: ${error}`);
        hasError = true;
      }
    }

    // Signal handlers in CLI apps, need to exit explicitly
    if (hasError) {
      process.exit(1); // eslint-disable-line unicorn/no-process-exit
    } else {
      process.exit(0); // eslint-disable-line unicorn/no-process-exit
    }
  };

  process.on('SIGINT', () => handleSignal('SIGINT'));
  process.on('SIGTERM', () => handleSignal('SIGTERM'));
};

export const setShuttingDown = (shutting: boolean): void => {
  isShuttingDown = shutting;
};

export const getIsShuttingDown = (): boolean => {
  return isShuttingDown;
};

export const runCommand = (
  command: string,
  args: string[] = [],
  options: RunCommandOptions = {},
): Promise<number | CommandResult> => {
  const { captureOutput = false, stdio = 'inherit', ...spawnOptions } = options;

  return new Promise((resolve, reject) => {
    let stdout = '';
    let stderr = '';
    let exitCode;
    let signalCode;

    try {
      const child = spawnSync([command, ...args], {
        stdout: captureOutput ? 'pipe' : stdio,
        stderr: captureOutput ? 'pipe' : stdio,
        ...spawnOptions,
      });
      setupGlobalSignalHandlers();
      activeChildren.add(child);

      if (captureOutput) {
        const responseStdOut = child.stdout?.toString();
        stdout += responseStdOut;

        const responseStdErr = child.stderr?.toString();
        stderr += responseStdErr;
      }

      exitCode = child.exitCode;
      signalCode = child.signalCode;

      activeChildren.delete(child);

      if (signalCode === 'SIGINT' || signalCode === 'SIGTERM') {
        const result = captureOutput ? { code: 0, stdout, stderr } : 0;
        resolve(result);

        return;
      }
    } catch (error) {
      reject(error);
    }

    if (exitCode === 0 || exitCode === null) {
      const result = captureOutput ? { code: exitCode || 0, stdout, stderr } : exitCode || 0;
      resolve(result);
    } else {
      reject(new Error(`Command failed with exit code ${exitCode}${captureOutput && stderr ? `: ${stderr}` : ''}`));
    }
  });
};

export const showProgress = (message: string, allowDuringShutdown = false): ProgressCleanupFunction => {
  const frames: ProgressFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  let i = 0;
  let isCleanedUp = false;

  const interval = setInterval(() => {
    if (!isCleanedUp && (allowDuringShutdown || !isShuttingDown)) {
      process.stdout.write(`\r${message} ${frames[i]}`);
      i = (i + 1) % frames.length;
    }
  }, 100);

  if (allowDuringShutdown || !isShuttingDown) {
    process.stdout.write(`${message} ${frames[0]}`);
  }

  const cleanup = () => {
    if (!isCleanedUp) {
      isCleanedUp = true;
      clearInterval(interval);
      process.stdout.write('\r\u001B[K');
      activeProgressIndicators.delete(cleanup);
    }
  };

  activeProgressIndicators.add(cleanup);

  return cleanup;
};

export const killProcessOnPort = async (port: number): Promise<void> => {
  const stopProgress = showProgress(`Cleaning up port ${port}`);
  try {
    await runCommand('fuser', ['-k', `${port}/tcp`], { stdio: 'pipe' });
  } catch {
    // Process silently if no cleanup needed
  } finally {
    stopProgress();
  }
};
