import type { SyncSubprocess } from 'bun';

export type RunCommandOptions = {
  stdio?: 'inherit' | 'pipe';
  captureOutput?: boolean;
  [key: string]: unknown;
};

export type CommandResult = {
  code: number;
  stdout?: string;
  stderr?: string;
};

export type ProgressCleanupFunction = () => void;

export type CustomShutdownHandler = () => Promise<void>;

export type ProgressFrame = string;

export type ProgressFrames = readonly ProgressFrame[];

export type ActiveChildrenSet = Set<SyncSubprocess>;

export type ActiveProgressIndicatorsSet = Set<ProgressCleanupFunction>;

export type SignalHandler = (signal: NodeJS.Signals) => Promise<void>;
